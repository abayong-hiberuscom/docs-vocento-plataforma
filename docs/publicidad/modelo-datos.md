# Modelo de datos — Publicidad

La arquitectura de datos de **Publicidad** en BigQuery se organiza en tres datamarts o esquemas de datos analíticos diferenciados, alojados bajo el proyecto corporativo `prj-dataplatform-prod-vocento`. Cada datamart cumple un propósito funcional específico: la entrega de impresiones publicitarias, el seguimiento de la facturación comercial, y el análisis de audiencias segmentadas.

A continuación, se detallan los diagramas entidad-relación (ER) actualizados de los esquemas reales en BigQuery.

---

## 1. Entrega y Ad Server (`dm_ad_delivery`)

Este datamart procesa las métricas de impresiones y clics diarios procedentes de **Google Ad Manager (GAM)** para cuantificar y auditar la entrega de campañas en los distintos soportes, inventarios y formatos del grupo.

!!! tip "🔍 Modelo interactivo"
    Haz clic sobre el diagrama para abrirlo en pantalla completa en una nueva pestaña. Podrás hacer zoom con la rueda del ratón y arrastrar para moverte.

```mermaid
erDiagram
    dim_company {
        int64 id PK
        string name
        string type
        string credit_status
        string applied_team_ids
        bool Extranjero
        datetime last_modified_date_time
    }
    dim_user {
        int64 id PK
        string name
        string email
        string roleName
        string isActive
    }
    dim_order {
        int64 id PK
        string name
        string advertiserId FK
        string creatorId FK
        string traffickerId FK
        string status
        string totalBudget
        datetime last_modified_date_time
    }
    dim_ad_unit {
        int64 id PK
        string adUnitcode
        string status
        string Ad_unit_1
        string Ad_unit_2
        string Ad_unit_3
    }
    dim_device_category {
        int64 id PK
        string device_category
        datetime created
    }
    dim_creative_size {
        int64 id PK
        string creative_size
        datetime created
    }
    dim_product {
        int64 id PK
        string product
        datetime created
    }
    dim_publication {
        int64 id PK
        string Publicacion
        string Cabecera
        string Medio
        string device
    }
    fact_daily {
        date impressiondate PK
        int64 order_id FK
        int64 adunit_id FK
        int64 device_category_id FK
        int64 creative_size_id FK
        int64 product_id FK
        int64 publication_id FK
        int64 line_item_id
        int64 advertiser_id FK
    }

    dim_company ||--o{ dim_order : "anunciante_de (id -> advertiserId)"
    dim_user ||--o{ dim_order : "gestionada_por (id -> traffickerId/creatorId)"
    dim_order ||--o{ fact_daily : "planifica (id -> order_id)"
    dim_ad_unit ||--o{ fact_daily : "imputa_a (id -> adunit_id)"
    dim_device_category ||--o{ fact_daily : "consumida_en (id -> device_category_id)"
    dim_creative_size ||--o{ fact_daily : "resolucion_de (id -> creative_size_id)"
    dim_product ||--o{ fact_daily : "clasificada_por (id -> product_id)"
    dim_publication ||--o{ fact_daily : "publicada_en (id -> publication_id)"
```

---

## 2. Gestión Comercial y Facturación (`dm_gestion_comercial`)

Es el esquema analítico responsable del seguimiento de contratos, facturas e imputación de ingresos de publicidad procedentes del ERP comercial **AdPoint**. Cruza anunciantes directos y agencias de medios con las líneas de pedido y su devengo financiero.

!!! tip "🔍 Modelo interactivo"
    Haz clic sobre el diagrama para abrirlo en pantalla completa en una nueva pestaña. Podrás hacer zoom con la rueda del ratón y arrastrar para moverte.

```mermaid
erDiagram
    dim_customer {
        int64 Cust_ID PK
        string Anunciante
        string CP_Fiscal
        string Activa
    }
    dim_user {
        int64 ID_Usuario PK
        string Nombre_Completo
        string Email
        string Rol
        bool Activo
    }
    dim_order {
        int64 Order_ID PK
        string Name
        string ref_num
        int64 Contract_ID
        int64 User_ID FK
        int64 Cust_ID FK
    }
    dim_orderitem {
        int64 OrderItem_ID PK
        int64 Order_ID FK
        string Nombre_Anuncio
        string ItemNumber
        int64 Ad_Pattern
        bool Es_Ingreso
        bool Es_Produccion
    }
    dim_publication {
        int64 ID PK
        int64 Publ_ID FK
        string Soporte_Nombre
        string Medio
        string ExternalProduct
        string TipoPublicacion_N1
        string Cabecera_N2
        string Publicacion_N3
        string Agrupador_Publicaciones
    }
    dim_product {
        int64 product_id PK
        string Producto
        string Tipo
        string Tipo_ingr
        string Codigo_Contable
        string Active
    }
    dim_date {
        date fecha PK
        int64 Ano
        int64 Mes
        string Mes_Nombre
        int64 Trimestre
        string Ano_Mes
    }
    fact_revenue {
        int64 RevenueRecognition_ID PK
        int64 Order_ID FK
        int64 OrderItem_ID FK
        int64 Cust_ID FK
        int64 repPubl_ID FK
        int64 basic_id FK
        date Fecha FK
        float64 Importe_Neto
        float64 Porcentaje_Reparto_Mes
    }

    dim_customer ||--o{ dim_order : "compra (Cust_ID -> Cust_ID)"
    dim_user ||--o{ dim_order : "creada_por (ID_Usuario -> User_ID)"
    dim_order ||--o{ dim_orderitem : "contiene (Order_ID -> Order_ID)"
    dim_order ||--o{ fact_revenue : "imputada_a (Order_ID -> Order_ID)"
    dim_orderitem ||--o{ fact_revenue : "desglosada_en (OrderItem_ID -> OrderItem_ID)"
    dim_publication ||--o{ fact_revenue : "soporte_de (Publ_ID -> repPubl_ID)"
    dim_customer ||--o{ fact_revenue : "facturada_a (Cust_ID -> Cust_ID)"
    dim_product ||--o{ fact_revenue : "comercializado_como (product_id -> basic_id)"
    dim_date ||--o{ fact_revenue : "reconocido_en (fecha -> Fecha)"
```

---

## 3. Segmentos de Audiencia - Espacio de Datos (`dm_eedd_publicidad`)

Este esquema expone las categorías y taxonomías IAB en base a los datos de audiencia consolidados del Espacio de Datos (EEDD). Facilita el perfilado de usuarios para la activación de campañas de publicidad digital de alta precisión.

!!! tip "🔍 Modelo interactivo"
    Haz clic sobre el diagrama para abrirlo en pantalla completa en una nueva pestaña. Podrás hacer zoom con la rueda del ratón y arrastrar para moverte.

```mermaid
erDiagram
    ref_cu_eedd_publicidad_segmentos_iab {
        string segment_id PK
        string display_name
        string iab_category
        bool is_active
    }
    cu_eedd_publicidad_digital {
        string segmento FK
        int64 last_1
        int64 last_7
        int64 last_15
        int64 last_30
    }

    ref_cu_eedd_publicidad_segmentos_iab ||--o{ cu_eedd_publicidad_digital : "clasifica_a (segment_id -> segmento)"
```

---

## Orígenes de Datos y Linaje (Pipeline de Negocio)

La consolidación y refinamiento de estos esquemas se orquesta en BigQuery siguiendo tres capas de almacenamiento y transformación:

1. **Capa Bronce (`bronce_publicidad_raw`)**: Contiene la ingesta en bruto (raw replicas) de las APIs diarias de Google Ad Manager y las tablas relacionales procedentes del servidor del ERP comercial AdPoint.
2. **Capa Silver (`silver_publicidad_refined`)**: 
   * Aplica tipados rigurosos, conversiones de zona horaria y limpieza de caracteres especiales de origen.
   * Incorpora un **maestro de publicaciones unificado** (`ficheros_auxiliares_maestro_de_publicaciones_xlsx_hoja1`), que mapea las ad_units físicas del Ad Server con las publicaciones lógicas editoriales del grupo.
3. **Capa Gold (Datamarts `dm_*`)**: Capa semántica de negocio estructurada en modelos estrella (Dimensionales y Hechos) analizados anteriormente, optimizada para su explotación ágil desde **Looker**.

