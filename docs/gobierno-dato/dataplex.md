# Dataplex: Aspect-types y metadatos


Los aspect-types revisados se dividen en **nivel tabla** y **nivel columna**. Se documentan owner, steward, sensibilidad, capa, dominio y uso principal; y a nivel columna se clasifica la sensibilidad campo a campo.

| Grupo | Dataset / paquete | Capa | Tablas | Columnas tipificadas | Owner(s) | Steward(s) | Sensibilidad por columna |
|---|---|---|---:|---:|---|---|---|
| Clasificados | dm_clasificados | Gold | 23 | 619 | Sergio Velasco Hernández (s.velasco@sumauto.com) | Javier Herráez Albarrán (j.herraez@sumauto.com) | Personal: 139, Público: 449, Interno: 28, Sensible: 3 |
| Clasificados | silver_clasificados_refined | Silver | 91 | 2028 | Sergio Velasco Hernández (s.velasco@sumauto.com) | Javier Herráez Albarrán (j.herraez@sumauto.com) | Interno: 1538, Personal: 204, Sensible: 8, Público: 278 |
| Common | Common | Silver | 6 | 460 | Francisco Coria | Equipo Analítica Digital | Interno: 436, Personal: 24 |
| EEDD | dm_eedd_clasificados | Gold | 5 | 28 | Sergio Velasco Hernández (s.velasco@sumauto.com) | Javier Herráez Albarrán (j.herraez@sumauto.com) | Interno: 28 |
| EEDD | dm_eedd_propuestas_comerciales | Gold | 3 | 19 | Alejandro Haddad | pnceballos@vocento.com | Interno: 19 |
| EEDD | dm_eedd_publicidad | Gold | 2 | 9 | Lydia Torralbo Ruigomez (ltorralbo@vocentomedios.com) | Paloma Nuñez Ceballos (pnceballos@vocento.com) | Interno: 9 |
| EEDD | dm_eedd_suscripciones | Gold | 7 | 43 | Paloma Nuñez Ceballos (pnceballos@vocento.com) | Paloma Nuñez Ceballos (pnceballos@vocento.com) | Interno: 43 |
| Publicidad | dm_ad_delivery | Gold | 22 | 265 | Lydia Torralbo Ruigomez (ltorralbo@vocentomedios.com) | Paloma Nuñez Ceballos (pnceballos@vocento.com) | Público: 38, Interno: 194, Personal: 19, Sensible: 14 |
| Publicidad | dm_gestion_comercial | Gold | 41 | 984 | Manuela Tribaldos Candel (mtribaldos@vocento.com) Alfonso Garai Aldekoa (agarai@elcorreo.com) | Paloma Nuñez Ceballos (pnceballos@vocento.com) | Interno: 655, Personal: 86, Sensible: 172, Público: 71 |
| Publicidad | silver_publicidad_refined | Silver | 59 | 1576 | Lydia Torralbo Ruigomez (ltorralbo@vocentomedios.com); Manuela Tribaldos Candel (mtribaldos@vocento.com) Alfonso Garai Aldekoa (agarai@elcorreo.com) | Paloma Nuñez Ceballos (pnceballos@vocento.com) | Interno: 1387, Personal: 165, Sensible: 24 |

**Hallazgos relevantes**
- `silver_clasificados_refined`: 91 tablas / 2.028 columnas.
- `dm_clasificados`: 23 tablas / 619 columnas; concentra `dim_ad`, `dim_advertiser`, `pricing_advertiser` y snapshots.
- `silver_publicidad_refined`: 59 tablas / 1.576 columnas.
- `dm_gestion_comercial`: 41 tablas / 984 columnas; es el Gold con más carga `Sensible` dentro de Publicidad.
- `Common`: 6 tablas / 460 columnas; dataset transversal de navegación (`navegaapp_acum`, `navegaweb_acum`, `clasificados_acum`).


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
