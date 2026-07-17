# Modelo de datos — Clasificados

La arquitectura de datos de **Clasificados** en BigQuery procesa la información procedente de los portales de motor (**Autocasión** y **AutoScout24**) y CRM corporativo (**Salesforce**). Se divide en dos esquemas de datos analíticos analizados bajo el proyecto `prj-dataplatform-prod-vocento` para facilitar la gestión comercial, auditoría de leads y perfilado de intenciones de compra.

A continuación, se detallan los diagramas entidad-relación (ER) actualizados según las tablas físicas reales que residen en BigQuery.

---

## 1. Analítica de Anunciantes, Permisos y Facturación (`dm_clasificados`)

Este datamart consolida los anuncios de vehículos unificados con los anunciantes de Salesforce. Adicionalmente, incluye el control de acceso comercial para los analistas de negocio y los snapshots mensuales de rentabilidad y CPL.

!!! tip "🔍 Modelo interactivo"
    Haz clic sobre el diagrama para abrirlo en pantalla completa en una nueva pestaña. Podrás hacer zoom con la rueda del ratón y arrastrar para moverte.

```mermaid
erDiagram
    dim_advertiser_salesforce {
        int64 advertiser_id PK
        int64 advertiser_sf_id FK
    }
    dim_advertiser {
        int64 advertiser_sf_id PK
        int64 advertiser_id FK
        string id_as24
        string customer_as24id
        string advertiser_name
        string advertiser_province
        string sector_anunciante
        bool is_ballena
        bool is_delivery
    }
    dim_car {
        int64 product_id PK
        string car_version
        string brand_name
        string fuel_name
        string modelo
    }
    dim_ad {
        int64 ad_id PK
        int64 advertiser_sf_id FK
        int64 product_id FK
        datetime fecha_publicacion
        int64 price
        int64 status
        string brand_name
        string fuel_name
    }
    dim_comercial {
        string comercial_sf_id PK
        string comercial_username
        string comercial_email
        string comercial_des
    }
    access_list_pricing {
        string comercial_email FK
        int64 advertiser_sf_id FK
        bool is_super_user
    }
    access_list_commercial {
        string comercial_email FK
        int64 advertiser_sf_id FK
        bool is_super_user
    }
    access_list_zoom {
        string comercial_email FK
        int64 advertiser_sf_id FK
        bool is_super_user
    }
    fact_monthly_snapshot_advertiser {
        int64 advertiser_sf_id FK
        int64 period_int PK
        string comercial_sf_id FK
        int64 monthly_published_ads
        int64 monthly_total_leads
        int64 monthly_visits
        float64 monthly_total_invoice_isc
        float64 monthly_total_invoice
        float64 monthly_cpl
    }

    dim_advertiser_salesforce ||--o{ dim_ad : "mapea_leads (advertiser_sf_id)"
    dim_advertiser ||--o{ dim_ad : "publica (advertiser_id)"
    dim_car ||--o{ dim_ad : "caracteriza (product_id)"
    dim_advertiser_salesforce ||--o{ fact_monthly_snapshot_advertiser : "audita (advertiser_sf_id)"
    dim_comercial ||--o{ fact_monthly_snapshot_advertiser : "atiende (comercial_sf_id)"
    
    dim_advertiser_salesforce ||--o{ access_list_pricing : "regula (advertiser_sf_id)"
    dim_advertiser_salesforce ||--o{ access_list_commercial : "regula (advertiser_sf_id)"
    dim_advertiser_salesforce ||--o{ access_list_zoom : "regula (advertiser_sf_id)"
    
    dim_comercial ||--o{ access_list_pricing : "accede (comercial_email)"
    dim_comercial ||--o{ access_list_commercial : "accede (comercial_email)"
    dim_comercial ||--o{ access_list_zoom : "accede (comercial_email)"
```

---

## 2. Segmentos e Intereses - Espacio de Datos (`dm_eedd_clasificados`)

Es el esquema analítico encargado de perfilar las intenciones de compra (interés en marcas, combustibles y tipos de carrocería) de los usuarios navegantes. Permite calcular el volumen de leads y búsquedas agregadas por horizontes temporales.

!!! tip "🔍 Modelo interactivo"
    Haz clic sobre el diagrama para abrirlo en pantalla completa en una nueva pestaña. Podrás hacer zoom con la rueda del ratón y arrastrar para moverte.

```mermaid
erDiagram
    ref_cu_eedd_clasificados_marcas {
        string marca_id PK
        string display_name
        bool is_active
    }
    ref_cu_eedd_clasificados_segmentos_carroceria {
        string segmento_id PK
        string display_name
        bool is_active
    }
    ref_cu_eedd_clasificados_combustibles {
        string combustible_id PK
        string display_name
        bool is_active
    }
    cu_eedd_clasificados_cookies {
        string id PK
        date date
        string v_marca
        string v_segmento
        string v_combustible
        bool v_es_lead
    }
    cu_eedd_clasificados_intereses_agregados_por_horizonte {
        string Marca FK
        string Segmento FK
        string Combustible FK
        bool Es_Lead
        int64 total_15d
        int64 total_30d
        int64 total_60d
        int64 total_90d
        date load_date
    }

    cu_eedd_clasificados_cookies ||--o{ cu_eedd_clasificados_intereses_agregados_por_horizonte : "consolida (id)"
    ref_cu_eedd_clasificados_marcas ||--o{ cu_eedd_clasificados_intereses_agregados_por_horizonte : "cataloga (marca_id -> Marca)"
    ref_cu_eedd_clasificados_segmentos_carroceria ||--o{ cu_eedd_clasificados_intereses_agregados_por_horizonte : "cataloga (segmento_id -> Segmento)"
    ref_cu_eedd_clasificados_combustibles ||--o{ cu_eedd_clasificados_intereses_agregados_por_horizonte : "cataloga (combustible_id -> Combustible)"
```

---

## Orígenes de Datos y Linaje de Clasificados

El linaje de datos de clasificados sigue una segmentación en tres capas de refino:

1. **Pasarelas de Motor & CRM (Capa Bronce)**:
   * Los inventarios físicos de Autocasión y AutoScout24 se cargan diariamente en la capa `bronce_clasificados_raw`.
   * Los maestros de clientes y las carteras de gestores comerciales se ingestan desde Salesforce.
2. **Normalización Silver (`silver_clasificados_refined`)**:
   * Homogeneiza las taxonomías de vehículos (marcas, modelos y combustibles) que difieren entre portales.
   * Realiza la unificación de los identificadores de anunciantes lógicos frente a las cuentas de Salesforce.
3. **Modelado Analítico Gold (`dm_*`)**:
   * **`dm_clasificados`**: Diseña el modelo estrella de anunciantes, campañas y snapshots financieros agregados por mes fiscal para alimentar los paneles directivos.
   * **`dm_eedd_clasificados`**: Agrupa y anonimiza las cookies de comportamiento navegante por horizontes (15, 30, 60 y 90 días) para activar audiencias de motor.

