# Reglas de calidad de datos


### Marco común de calidad

La estandarización revisada fija las dimensiones **Integridad, Validez, Unicidad, Exactitud, Coherencia, Actualidad y Volumen**. La implementación técnica se materializa en dos mecanismos: **assertions de Dataform/BigQuery** y **DataScans YAML de Dataplex**.

### Dataform assertions (Sumauto / stg-int-mrt)

- **Totales**: 84 `not_null`, 68 `unique_pk`, 5 `accepted_values`, 4 `custom` (**161 assertions**).
- **Por capa**:
  - `prod__stg`: 46 `not_null`, 37 `unique_pk`, 4 `accepted_values`.
  - `prod__int`: 20 `not_null`, 16 `unique_pk`, 1 `accepted_values`, 2 `custom`.
  - `prod__mrt`: 18 `not_null`, 15 `unique_pk`.
  - `landing_json_incrementals`: 2 `custom` sobre completitud mensual de `zoom_as24` y `zoom_vn_vo`.

**Ejemplos detectados**
- `int_accounts.comercial_sf_id` y `int_accounts.advertiser_sf_id`: `not_null`.
- `dim_advertiser.advertiser_sf_id`, `dim_ad.ad_id`, `fct_monthly_snapshot_ad(ad_id, period_int)`: `unique_pk` / PK lógica.
- `stg_sf__accounts.sumauto_status`: catálogo cerrado (`Cliente`, `Antiguo cliente`, `Cliente asociado`, `Cliente potencial`, `Cliente prospect`, `No interesado`).
- `stg_sf__advertiser__withdrawals.withdrawal_type`: `TOTAL`, `PARCIAL`; `withdrawal_status` con estados controlados.
- `int_zoom__advertisers__daily.distinct_package_count`: `accepted_values = 1`.

### Dataplex YAML / DataScans

| Paquete ZIP | Conteo de reglas | Observación |
|---|---|---|
| dq_gold_final.zip | not_null: 80, unique_pk: 47, accepted_values: 24, custom: 76 | Gold Publicidad: `dm_ad_delivery` + `dm_gestion_comercial`. |
| dq_silver_publicidad.zip | not_null: 181, unique_pk: 28, accepted_values: 175, custom: 143 | Silver Publicidad (AdPoint, Ad Manager y tablas refined). |
| dq_silver_stripe_suscripciones.zip | custom: 84 | Variante Stripe ubicada en carpeta Publicidad pero funcionalmente de Suscripciones. |
| dq_silver_gfk.zip | custom: 32 | Suscripciones / GFK. |
| dq_silver_salesforce.zip | not_null: 101, accepted_values: 55, custom: 97, unique_pk: 17 | Suscripciones / Salesforce Marketing Cloud. |
| dq_silver_stripe.zip | custom: 99 | Suscripciones / Stripe. |
| dm_eedd_clasificados.zip | not_null: 8, custom: 4 | Caso EEDD Clasificados. |
| dm_eedd_propuestas_comerciales.zip | not_null: 7, custom: 2 | Caso EEDD Propuestas comerciales. |
| dm_eedd_publicidad.zip | not_null: 5, custom: 1 | Caso EEDD Publicidad. |
| dm_eedd_suscripciones.zip | not_null: 7, custom: 3 | Caso EEDD Suscripciones. |

**Patrones de validación observados**
- `dq_gold_final.zip`: `dim_ad_unit.id` y `dim_company.id` con completitud y unicidad; `dim_company.type` / `credit_status` con catálogos cerrados; `dim_content.postalCode` con regla custom de rango.
- `dq_silver_publicidad.zip`: fuerte uso de `setExpectation` para catálogos de AdPoint / GAM.
- `dq_silver_salesforce.zip`: fechas con regex, catálogos de campañas/estados y controles no negativos sobre métricas de envío.
- `dq_silver_stripe*.zip` y `dq_silver_gfk.zip`: predominan reglas `custom` (regex de IDs, rangos y consistencia).
- `dm_eedd_publicidad.zip`: `cu_eedd_publicidad_digital` incorpora umbral de privacidad y no negatividad.
- `dm_eedd_clasificados.zip`: `cu_eedd_clasificados_intereses_agregados_por_horizonte` exige completitud de `Marca`, `Segmento` y `Combustible`.


!!! info "Fuentes documentales"
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Propuesta Modelo de Gobierno del Dato (Draft).docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Propuesta de gestión de la demada.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Estandarización reglas de calidad.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Glosario de negocio\Dataplex_CargaMasiva_GlosarioNegocio.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Glosario de negocio\Plantilla_Glosario_Terminos_VF.xlsx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Análisis y reglas de calidad\Dataplex_CargaMasiva_ReglasCalidad.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Carga masiva Aspect-types\Dataplex_CargaMasiva_AspectType.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\Modelado DW.xlsx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\dataform-consum-dlk\definitions\01_source\declare_source.js`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\dataform-consum-dlk\definitions\02_staging\load_staging.js`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\dataform-consum-dlk\definitions\03_intermediate\*.sqlx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\dataform-consum-dlk\definitions\04_data_mart\*.sqlx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\bq_queries_20260210\prod__stg\*.sql`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\bq_queries_20260210\prod__mrt\*.sql`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\bq_queries_assertions_20251020\**\*.sql`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Carga masiva Aspect-types\**\*.xlsx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Análisis y reglas de calidad\**\*.zip`
    `5. Documentación Espacio Datos\2. Casos de uso\Código Dataplex\Análisis y reglas de calidad\*.zip`
    `5. Documentación Espacio Datos\2. Casos de uso\Código Dataplex\Carga masiva Aspect-types\*.zip`
    `5. Documentación Espacio Datos\2. Casos de uso\Código BigQuery\Queries\*.zip`
