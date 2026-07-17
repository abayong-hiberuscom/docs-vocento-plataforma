# Modelo de datos — Suscripciones

La arquitectura de datos de **Suscripciones y Clientes** en BigQuery unifica la información transaccional de la pasarela de pago de identidad (**Evolok**) con los modelos analíticos agregados del **Espacio de Datos (EEDD)**. Esta integración permite analizar el comportamiento de navegación de los suscriptores y clusterizar las secciones editoriales según el valor aportado.

A continuación, se detallan los diagramas entidad-relación (ER) actualizados según los esquemas físicos reales que se ejecutan en BigQuery.

---

## 1. Espacio de Datos: Métricas de Consumo y Clústeres (`dm_eedd_suscripciones`)

Este datamart procesa de forma agregada el tiempo medio de permanencia, las páginas vistas y la frecuencia de consumo para agrupar las secciones de los diarios en clústeres temáticos de comportamiento.

!!! tip "🔍 Modelo interactivo"
    Haz clic sobre el diagrama para abrirlo en pantalla completa en una nueva pestaña. Podrás hacer zoom con la rueda del ratón y arrastrar para moverte.

```mermaid
erDiagram
    cu_eedd_suscripciones_ref_secciones {
        string post_channel PK
        string seccion
        bool is_active
    }
    cu_eedd_suscripciones_secciones_tiempos {
        string anio_mes PK
        string seccion PK
        float64 avg_tiempo_por_pagina_seg
        date load_date
    }
    cu_eedd_suscripciones_secciones_people_pageviews {
        string anio_mes PK
        string seccion PK
        float64 alcance_seccion_pct
        float64 ratio_consumo_pct
        date load_date
    }
    cu_eedd_suscripciones_secciones_clusterizadas {
        string anio_mes PK
        string seccion PK
        float64 avg_tiempo_por_pagina_seg
        float64 alcance_seccion_pct
        float64 ratio_consumo_pct
        int64 cluster_asignado FK
        date load_date
    }
    cu_eedd_suscripciones_resumen_clusters {
        int64 cluster_asignado PK
        int64 total_secciones
        float64 avg_tiempo_seg
        float64 avg_alcance_pct
        float64 avg_consumo_pct
        string secciones_incluidas
        date load_date
    }

    cu_eedd_suscripciones_ref_secciones ||--o{ cu_eedd_suscripciones_secciones_tiempos : "clasifica (post_channel -> seccion)"
    cu_eedd_suscripciones_ref_secciones ||--o{ cu_eedd_suscripciones_secciones_people_pageviews : "clasifica (post_channel -> seccion)"
    cu_eedd_suscripciones_secciones_tiempos ||--o{ cu_eedd_suscripciones_secciones_clusterizadas : "alimenta (seccion)"
    cu_eedd_suscripciones_secciones_people_pageviews ||--o{ cu_eedd_suscripciones_secciones_clusterizadas : "alimenta (seccion)"
    cu_eedd_suscripciones_secciones_clusterizadas ||--o{ cu_eedd_suscripciones_resumen_clusters : "agrupa (cluster_asignado)"
```

---

## 2. Ingesta Transaccional de Paywall e Identidad (`silver_suscripciones_refined` / `Evolok`)

Este modelo representa el flujo de datos transaccional en tiempo real ingestado a través de Pub/Sub desde la pasarela **Evolok**. Contiene la creación de clientes, gestión de suscripciones activas, pasarela de productos y auditoría de pedidos.

!!! tip "🔍 Modelo interactivo"
    Haz clic sobre el diagrama para abrirlo en pantalla completa en una nueva pestaña. Podrás hacer zoom con la rueda del ratón y arrastrar para moverte.

```mermaid
erDiagram
    evolok_online_clientes_pubsub {
        string id_usuario PK
        string name
        string email
        string origen
        string provincia
    }
    evolok_online_products_pubsub {
        string id_producto PK
        string nombre_producto
        float64 precio
        string periodicidad
    }
    evolok_online_subscriptions_pubsub {
        string id_suscripcion PK
        string id_usuario FK
        string id_producto FK
        date fecha_inicio
        date fecha_fin
        string estado
    }
    evolok_online_orders_pubsub {
        string id_pedido PK
        string id_suscripcion FK
        float64 monto
        timestamp fecha_pago
    }

    evolok_online_clientes_pubsub ||--o{ evolok_online_subscriptions_pubsub : "adquiere (id_usuario)"
    evolok_online_products_pubsub ||--o{ evolok_online_subscriptions_pubsub : "ofrece (id_producto)"
    evolok_online_subscriptions_pubsub ||--o{ evolok_online_orders_pubsub : "genera (id_suscripcion)"
```

---

## Orígenes de Datos y Linaje de Suscriptores

El ciclo de vida del dato de suscripciones se divide en los siguientes flujos de procesamiento:

1. **Pasarela Evolok (Capa Bronce & Silver)**:
   * Los eventos de suscripción, productos y usuarios se capturan en tiempo real a través de Google Cloud Pub/Sub, volcándose de manera estructurada en las tablas `evolok_online_*_pubsub` de la capa **Silver** (`silver_suscripciones_refined`).
   * Adicionalmente, se mantiene una réplica relacional histórica importada desde el motor original en la capa **PostgreSQL Evolok** (`postgresql_evolok`), que expone tablas maestros como `detalle_clientes` y `suscripciones`.
2. **Segmentación Web & App (Capa Gold)**:
   * Los flujos de navegación unificados de Adobe Analytics alimentan de manera agregada las métricas de consumo de secciones editoriales.
   * Tras aplicar los pesos del clasificador temático de secciones, el orquestador (Dataform) ejecuta los algoritmos de clústeres analíticos salvando los resultados finales en el datamart del Espacio de Datos: `dm_eedd_suscripciones`.

