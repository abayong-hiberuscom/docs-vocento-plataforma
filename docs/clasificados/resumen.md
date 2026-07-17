# Resumen funcional — Clasificados

El dominio de **Clasificados** documenta tanto la migración del ecosistema analítico de
**Sumauto / AutoOcasión / Renting / Premium Leads** hacia GCP como un CdU de **Espacio de Datos**
orientado a **leads cualificados y audiencias agregadas** de automoción.

En plataforma tecnológica, la documentación describe un datamart Gold alrededor de
**`dm_clasificados`** y datasets auxiliares (`sta_clasificados`, `dm_sumauto_dgt`, tablas
pricing/snapshots/accesos), integrando ventas, stock, anuncios, leads, competidores y catálogos
externos.

En Espacio de Datos, el producto Gold final es
**`cu_clasificados_intereses_agregados_por_horizonte`**, precedido por la tabla intermedia
**`cu_clasificados_cookies`**. El objetivo es exponer volúmenes agregados por marca, segmento,
combustible, interés y condición de lead en ventanas **15/30/60/90 días**.

El caso de uso pone fuerte énfasis en gobierno, anonimización, interoperabilidad y exposición
soberana en EEDD; la documentación final limita la salida gobernada a información agregada.

## Casos de uso

### 1. Analítica comercial y de inventario
Datamarts/dimensiones para anuncios, anunciantes, vehículos, comerciales, pricing, leads y
snapshots mensuales. Seguimiento de stock, performance, ROI comercial, volumen de anuncios,
facturación, zoom/pricing y control de accesos. Cruce de fuentes internas (MySQL, Salesforce,
MongoDB, Nexus) con mercado/competencia (Joreca, DGT, Eurotax, Marketsight).

### 2. Pricing y control de accesos
Tablas `access_list__pricing`, `access_list_commercial`, `access_list_zoom`. Tablas Gold para
dashboards: `pricing_advertiser`, `pricing_cluster`, `fact_monthly_snapshot_advertiser*`.
Segmentación comercial y asignación de carteras apoyada en Salesforce y Google Sheets.

### 3. Caso de uso EEDD Clasificados
Objetivo final: ofrecer **leads cualificados / intereses agregados** del vertical automoción en un
entorno soberano. La propuesta inicial contemplaba varios outputs (incluyendo hashed emails), pero
la memoria final deja como salida gobernada principal **audiencias agregadas** con control DPO. La
tabla intermedia `cu_clasificados_cookies` unifica dos ramas: **AutoOcasión/ocasión** y
**Rentingcoches/renting**. La tabla final agrega por marca, segmento, combustible, interés, lead y
horizontes 15/30/60/90 días.

