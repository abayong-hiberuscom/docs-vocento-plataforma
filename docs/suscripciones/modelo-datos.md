# Modelo de datos — Suscripciones

> El diagrama mezcla tablas físicas (documentadas en validaciones/migración) y entidades lógicas
> intermedias del caso EEDD. Varias relaciones son **inferidas** a partir de comentarios de
> mockups/validaciones, no de un DDL completo — no se ha localizado un diccionario PK/FK completo
> del vertical.

```mermaid
erDiagram
    MAP_SECCIONES_TEMATICAS {
        string post_channel PK
        string seccion
    }
    NAVEGAWEB_ACUM {
        string ecid
        string visit_id
        string post_channel
        datetime date_time
    }
    NAVEGAAPP_ACUM {
        string ecid
        string visit_id
        string post_channel
        datetime date_time
    }
    SECCIONES_TIEMPOS_2 {
        string anio_mes
        string seccion
        float avg_tiempo_por_pagina_seg
    }
    SECCIONES_PEOPLE_PAGEVIEWS {
        string anio_mes
        string seccion
        int usuarios_unicos
        float ratio_consumo
    }
    CU_EEDD_SUSCRIPCIONES_SECCIONES_CLUSTERIZADAS {
        string anio_mes
        string seccion
        float alcance_pct
        float ratio_consumo
        int cluster_asignado
    }
    CU_EEDD_SUSCRIPCIONES_RESUMEN_CLUSTERS {
        int cluster_asignado
        int total_secciones
        string listado_secciones
    }
    SUSCRIPCIONES_AVANZADO {
        string id_suscripcion PK
        date fecha_inicio
        date fecha_fin
        string estado_suscripcion
        string tier
    }
    SUSCRIPCIONES_HISTORICO {
        date fecha PK
        string tienda PK
        int activas
        int altas
        int bajas
    }
    SD_DETALLE_CLIENTES {
        string id_medio PK
        string cod_local PK
        string origen
        string provincia
    }
    RFV_USUARIO {
        string usuario_id PK
        string segmento_rfv
    }
    NAVEGACION_AGREGADA_USUARIO_SECCION {
        string usuario_id PK
        string seccion PK
        int pageviews
    }
    PERFIL_SUSCRIPTOR {
        string usuario_id PK
        string tier
        string periodicidad
    }
    ALTAS_BAJAS_ACTIVAS {
        date fecha PK
        string tienda PK
        int altas
        int bajas
        int activas
    }

    MAP_SECCIONES_TEMATICAS ||--o{ NAVEGAWEB_ACUM : clasifica
    MAP_SECCIONES_TEMATICAS ||--o{ NAVEGAAPP_ACUM : clasifica
    NAVEGAWEB_ACUM ||--o{ SECCIONES_TIEMPOS_2 : agrega
    NAVEGAAPP_ACUM ||--o{ SECCIONES_TIEMPOS_2 : agrega
    NAVEGAWEB_ACUM ||--o{ SECCIONES_PEOPLE_PAGEVIEWS : agrega
    NAVEGAAPP_ACUM ||--o{ SECCIONES_PEOPLE_PAGEVIEWS : agrega
    SECCIONES_TIEMPOS_2 ||--o{ CU_EEDD_SUSCRIPCIONES_SECCIONES_CLUSTERIZADAS : unifica
    SECCIONES_PEOPLE_PAGEVIEWS ||--o{ CU_EEDD_SUSCRIPCIONES_SECCIONES_CLUSTERIZADAS : unifica
    CU_EEDD_SUSCRIPCIONES_SECCIONES_CLUSTERIZADAS ||--o{ CU_EEDD_SUSCRIPCIONES_RESUMEN_CLUSTERS : resume
    SUSCRIPCIONES_AVANZADO ||--o{ SUSCRIPCIONES_HISTORICO : alimenta
    SUSCRIPCIONES_HISTORICO ||--o{ ALTAS_BAJAS_ACTIVAS : deriva
    SD_DETALLE_CLIENTES ||--o{ PERFIL_SUSCRIPTOR : enriquece
    RFV_USUARIO ||--o{ NAVEGACION_AGREGADA_USUARIO_SECCION : cruza
    RFV_USUARIO ||--o{ PERFIL_SUSCRIPTOR : segmenta
```

!!! info "Fuentes"
    - `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Definición Reporting\Mockup\Validaciones\validaciones_navegacion_suscriptor.docx`
    - `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Definición Reporting\Mockup\Validaciones\analisis_discrepancia_sd_detalle_clientes.docx`
    - `5. Documentación Espacio Datos\2. Casos de uso\CdU Suscripciones\ENTREGABLE E17 ...docx`

