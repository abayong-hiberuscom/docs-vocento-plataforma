# Arquitectura y fuentes de datos — Publicidad

## Fuentes de datos identificadas
- **Google Ad Manager (GAM)**: AdUnit, Company, Placement, Order, LineItem, CustomTargeting,
  Creative, User, Team, AudienceSegment.
- **GAM DataTransfer**: `NetworkRequests`, `NetworkCodeServes`, `NetworkImpressions` y variantes
  backfill; métricas de impresiones, code serves, fill rate, viewability, CTR, eCPM.
- **AdPoint**: base transaccional comercial con ~70 tablas `dbo_*` (customers, orders,
  orderitems, opportunities, campaigns, promotions, onlinesites, publications, offices, users...).
- **Adobe Experience Platform / Navegaweb / Navegaapp**: navegación anónima para clasificar
  intereses y construir audiencias del CdU de Espacio de Datos.
- **Ficheros maestros/parametrización**: `maestro de publicaciones`, `MaestroPosiciones`,
  `ClasCampanas`, `PortadasVocento_DFP_AdUnit`, `Param_Tipo_Pag`, `LocalNacional_CMVocento`,
  presupuestos, rappels y otros mappings comerciales.
- **Tablas SAP**: `AUFK`, `COEP`, `CSKS`, `CSKT`, `ZWCTA805`, `ZWCTA808`, `ZWCTA809`, `ZWCTA810` —
  diccionario estructural/contable; la ingesta SAP productiva queda como paso pendiente.
- **Qlik/QVD/QVW**: estado AS-IS y benchmark funcional para reconciliación.

## Arquitectura / pipeline técnico
Patrón dominante **Bronze → Silver → Gold** sobre **GCS + BigQuery**:

- **Bronze**: JSON/CSV/ficheros horarios o diarios desde APIs, buckets y extracciones
  transaccionales.
- **Silver**: normalización a Parquet, tablas externas BigQuery (`silver_ad_manager`,
  `silver_datatransfer`, `silver_publicidad_refined`).
- **Gold**: transformaciones con **Dataform** hacia `dm_ad_delivery`, `dm_gestion_comercial` y
  activos EEDD (`dm_eedd_publicidad` / `cu_publicidad_digital`).
- **Orquestación**: Cloud Composer/Airflow con DAGs `DAG_AD_MANAGER`, `DAG_DATATRANSFER`,
  `DAG_ADPOINT`, `DAG_PUBLICIDAD`, `DAG_GESTION_COMERCIAL` y flujos Adobe.
- **Procesado pesado**: Dataproc/Spark para DataTransfer por volumetría.
- **Gobierno/consumo**: Dataplex, Looker, catálogo de metadatos y exposición regulada en el EEDD
  bajo Rulebook/UNE 0087:2025.

## Reglas de calidad de datos
- **`dm_gestion_comercial.fact_revenue`**: validación Source-to-Target con Qlik/Analizador; clave
  de grano sobre `RevenueRecognition_ID` + identificadores de site/order-item; **0 huérfanos**
  frente a `dim_customer`/`dim_order`/`dim_orderitem`; **0 nulos** en revenue/customer/order; match
  total en neto; discrepancias en impuestos/tarifas explicadas por lógica mejorada.
- **`dm_ad_delivery.fact_daily`**: comparación con Qlik a nivel KPI (no fila a fila, por mayor
  granularidad); **0 huérfanos** frente a `dim_product`; diferencias de KPI dentro de tolerancias;
  la PK propuesta no basta para replicar el grano de Qlik (faltan dimensiones adicionales).
- **Reglas del caso de uso EEDD**: umbral de privacidad — no se exponen recuentos entre **1 y 14**
  visitantes (mínimo operativo **15**); catálogo cerrado de **13 segmentos IAB**; alerta propuesta
  de variación diaria >**±40%** frente al día anterior; `COUNT(DISTINCT id)` sobre ventanas
  1/7/15/30 días con clasificación `REGEXP` sobre `topics`, `url`, `post_channel` y `titular`.

## Diagramas existentes
- `4. Documentación Plataforma Tecnológica\3 - Publicidad\Publicidad - Medallas & Modelo datos.drawio`
- `4. Documentación Plataforma Tecnológica\3 - Publicidad\Diagramas\Publicidad - Visión genérica 20260113.png`
- `4. Documentación Plataforma Tecnológica\3 - Publicidad\Diagramas\Publicidad AS_IS-TO_BE 20260109.png`
- `4. Documentación Plataforma Tecnológica\3 - Publicidad\Diagramas\Vocento - Publicidad_ AS-IS + TO-BE 20260709 v4.png`
- `4. Documentación Plataforma Tecnológica\3 - Publicidad\Diagramas\Vocento - Publicidad AS-IS Negocio.png`
- `4. Documentación Plataforma Tecnológica\3 - Publicidad\Diagramas\Vocento - Fuentes externas negocio v2.png`
- `4. Documentación Plataforma Tecnológica\3 - Publicidad\Diagramas\Common - Adobe lógica_evar51.drawio`

