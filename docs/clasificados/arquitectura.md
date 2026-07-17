# Arquitectura y fuentes de datos — Clasificados

## Fuentes de datos identificadas
- **Salesforce**: cuentas, propuestas/oportunidades, productos, prospects, bajas, total anuncios,
  usuarios, record types.
- **Sumauto MySQL**: `ad`, `advertiser`, `autobiz_prices`, `autotel_record`, `brand`, `campaign`,
  `client`, `family`, `fuel`, `product`, `zoom_as24`, `zoom_vn_vo`.
- **MongoDB**: `AdReport` y `AdvertiserReport` (actividad y performance por anuncio/anunciante).
- **Nexus**: `abonos`, `facturacion_clientes`, `articulos`/tarifas.
- **Premium Leads MySQL**: tablas Lander/Webphone/Rentingcoches (`mtl_data_form`,
  `mtl_telephone`, `wph_cdr`, `wph_obj_forms`, leads y catálogos asociados).
- **Premium Leads MongoDB / Vekkto**: navegación, sesiones y llamadas perdidas.
- **Google Sheets (seeds)**: comerciales, clusters, acuerdos, exclusiones, superusuarios,
  provincias, estados, etc.
- **Joreca SFTP**: `crawlers_cochesnet`, `crawlers_wallapop`, `market_db`.
- **DGT Open Data**: matriculaciones y transferencias, más tablas de referencia.
- **Marketsight** y **Pipedrive**: apoyo a marketing/comercial.
- **Eurotax**: enriquecimiento/categorización técnica citado en CdU y diagramas.
- **Adobe / navegación clasificados** y **Rentingcoches**: fuentes del caso de uso EEDD para
  interés/lead qualification.

## Arquitectura / pipeline técnico
Arquitectura **Bronze → Silver → Gold** sobre **GCS + BigQuery**:

- **Bronze**: dumps NDJSON, CSV, XLSX, TXT, SFTP y APIs.
- **Silver**: normalización a Parquet y tablas externas/refined (`silver_clasificados_refined`,
  `silver_sumauto_salesforce`, `silver_sumauto_nexus`, `silver_sumauto_joreca_sftp`,
  `silver_pl_mysql`, etc.).
- **Gold/serving**:
    - **`sta_clasificados`** — acumulados/históricos/intermedios.
    - **`dm_clasificados`** — dimensiones, snapshots, pricing y access lists.
    - **`dm_sumauto_dgt`** — DGT.
    - **`dm_eedd_clasificados` / `cu_clasificados_*`** — CdU EEDD.
- **Orquestación**: Cloud Composer/Airflow con DAGs por fuente (`DAG_SUMAUTO_SALESFORCE`,
  `DAG_SUMAUTO_MYSQL`, `DAG_SUMAUTO_MONGODB`, `DAG_SUMAUTO_GOOGLE_SHEETS`,
  `DAG_SUMAUTO_SFTP_JORECA`, `DAG_SUMAUTO_NEXUS`).
- **Procesado especializado**: Dataflow (sincronización incremental MongoDB Atlas), Dataform
  (tags `sumauto`, `sumauto_pricing`, `sumauto_prospects`), tareas ML `advertiser_to_cluster` y
  `prospects_pricing`.
- **Gobierno/consumo**: Dataplex, Looker y exposición EEDD bajo Rulebook.

## Reglas de calidad de datos
- **Access lists**: PK `advertiser_sf_id + comercial_email`; sin duplicados; paridad casi completa
  con el modelo legacy.
- **`dm_clasificados.dim_ad`**: PK `ad_id`; 0% nulos en `ad_id`/`advertiser_sf_id`; duplicidad
  heredada mitigada en Gold.
- **`dim_advertiser_salesforce`**: PK `advertiser_id`; se preserva relación N:1 heredada.
- **`dim_advertiser`, `dim_car`, `dim_comercial`, `dim_contact`**: 0 duplicados/0 nulos en PK.
- **`dim_prospects`**: sin duplicados; volumetría fluctúa por frescura de fuentes y modelo ML de
  pricing.
- **`fact_monthly_snapshot_advertiser`**: PK `advertiser_sf_id + period_int`; accuracy 100% en
  KPIs clave (leads, leads únicos, invoice ISC, ROI medio).
- **Reglas del caso de uso EEDD**: aserción bloqueante `assert_umbral_privacidad` (sin recuentos
  entre 1 y 14; mínimo publicado 15); catálogos dinámicos de marca/segmento/combustible que
  requieren >**2.000 visitantes únicos**/mes (resto pasa a `otros`; agregados CUBE usan
  `indiferente`); DQ-1 a DQ-10 documentadas (no nulos, no negativos, pertenencia a catálogo,
  cardinalidad, progresión monótona `total_15d <= total_30d <= total_60d <= total_90d`); filtro de
  ruido para combinaciones totalmente "otros".

## Diagramas existentes
- `4. Documentación Plataforma Tecnológica\4 - Clasificados\Clasificados - Medallas & Modelo datos.drawio`
- `4. Documentación Plataforma Tecnológica\4 - Clasificados\Avance reunión 2026-02-02\Clasificados_Fuentes_General.drawio`
- `4. Documentación Plataforma Tecnológica\4 - Clasificados\Diagramas\Clasificados AS_IS-TO_BE 20260115.png`
- `4. Documentación Plataforma Tecnológica\4 - Clasificados\Diagramas\Vocento - Clasificados AS-IS + TO-BE v2 20260709.png`

