# Reporting y objetivos — Suscripciones

## Arquitectura técnica
Stack base repetido en casi toda la documentación: **GCP + BigQuery + Dataform + Dataplex + Looker
+ Cloud Composer/Airflow**, en arquitectura **medallion**:

- **Bronze** en GCS para ingesta cruda.
- **Silver** en GCS/BigQuery externo para limpieza, normalización y particionado Hive.
- **Gold** en BigQuery para datamarts y productos de datos.

Flujos técnicos documentados:

- **Stripe**: ingesta API → Bronze JSON → Silver Parquet → Gold `sta_suscripciones`
  (`stripe_balance_transaction_acum`, `stripe_customer_acum`, `stripe_dispute_acum`,
  `stripe_payment_intent_acum`, `stripe_refund_acum`).
- **Evolok Gratuitas**: ingesta API → unificación de colectivos (empleados/periodistas) → Gold
  BigQuery vía Dataform.
- **MDM**: copia de ficheros maestros desde boundary → Silver Parquet → Gold vía Dataform.

Ecosistema de fuentes (actual y objetivo): **Evolok, Stripe, Salesforce CRM, Salesforce Marketing
Cloud, Adobe RTCDP, Adobe Analytics/CJA, Mulesoft ESB, MDM, KYM, gestor B2B, SAP, Google Sheets,
Mongo y otras BBDD**, con salida hacia Looker y dashboards.

### Caso de uso EEDD — 4 etapas técnicas (Memoria E17)
1. **Mapeado de secciones temáticas** (`map_secciones_tematicas`).
2. **Captura de tiempos de visita** sobre `navegaweb_acum` y `navegaapp_acum` → `secciones_tiempos_2`.
3. **Captura de alcance/ratio de consumo** por sección → `secciones_people_pageviews`.
4. **Unificación y clusterización** con **BigQuery ML / K-Means** → Gold
   `cu_eedd_suscripciones_secciones_clusterizadas` + resumen de clusters.

Gobierno y operación: **Dataplex** (catálogo, linaje, metadatos, policy tags), **DataScan**
(calidad y perfilado), **OpenLineage** en varios DAG. Proceso batch diario, con visión TO-BE hacia
**near real time** (Pub/Sub + Dataflow + Composer cada 15 min) vía Mulesoft.

## Objetivos 2026 y dependencias de datos
El workbook de objetivos 2026 fija metas mensuales por cabecera y por B2C/B2B para: **cartera
total, altas, bajas, churn, ARPU**.

Datamarts/tablas clave: `DM_suscripciones`, `DM_registrados`, `detalle_clientes`,
`servicios_cliente`, `pedidos`, `rfv`, `ltv`, `DM_envios`, `DM_Produccion_editorial`.

Definiciones operativas de cálculo (validaciones/mockups):

- **G3**: usa `suscripciones_avanzado` para altas/bajas y `suscripciones_historico` para la hoja
  tipo "excel altas y bajas".
- **C1**: combina `suscripciones`, `suscripciones_historico`, `identity_registrados` y
  `sd_detalle_clientes`.
- **Perfil de usuario / objetivos**: consume `rfv_navegacion`, `secciones_rfv`,
  `perfil_suscriptor`, `perfil_exsuscriptor`, `top_secciones_segmentos`, `altas_bajas_activas`,
  `usuarios_nl`, `usuarios_registro`.

## Diagramas existentes
- `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Vocento - Suscripciones.drawio`
- `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Evolok.drawio`
- `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Exports diagramas\*.png` (visión
  genérica, AS-IS/TO-BE, ecosistema con Mulesoft)

!!! info "Fuentes"
    - `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Definición Reporting\CDM Suscripciones - Definición negocio.xlsx`
    - `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Definición Reporting\Objetivos\Objetivos 2026 *.xlsx`
    - `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Definición Reporting\Mockup\*` (mockups D1/D2, G3, C1)
    - `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Definición Reporting\Mockup\Validaciones\*`

