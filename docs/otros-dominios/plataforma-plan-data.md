# Plataforma Tecnológica y Plan Data

## Resumen funcional
La plataforma se concibe como una **plataforma analítica de datos corporativa en GCP**, gobernada,
escalable y multivertical. Se separan: proyectos GCP de plataforma (no-prod y PROD), proyectos de
IA conectados, y entornos DEV/PRE/PROD con reglas estrictas de promoción.

El plan de trabajo (`Proyecto DATA - Vocento.xlsx`) agrupa iniciativas de **Publicidad,
Clasificados, Suscripciones, Editorial y Financiero**, además de habilitadores como **EEDD
Publicidad, EEDD Clasificados, EEDD Suscripciones, EEDD Comercial, Asistente IA y Recomendador IA**.

## Arquitectura técnica
- **Cloud Storage** con esquema medallion; **BigQuery** para modelado (tablas externas,
  particionadas, clusterizadas, snapshots); **Cloud Composer/Airflow** para DAGs padre/hijo
  (bronze/silver/gold); **Dataform** para Gold; **Dataplex** para gobierno/calidad/linaje/catálogo;
  **Cloud Build + Bitbucket** para CI/CD; **IAM/grupos/service accounts/Secret Manager** para
  accesos; **Logging + Monitoring + sinks a BigQuery + Looker Studio** para operación.
- Convención de entornos: no-producción integra DEV+PRE en un mismo proyecto (coste/complejidad);
  producción en proyecto específico.
- **Inventario DEV** (`prj-dataplatform-dev-vocento`): 1 Composer, 28 datasets BQ, 3 lakes
  Dataplex, 10 zones, 18 assets, 10+ buckets, múltiples SAs y sinks.
- **Despliegue PROD** (`prj-dataplatform-prod-vocento`): Terraform al **100%** a 25/03/2026 — 3
  lakes, 10 zones, 23 datasets BQ, Cloud Composer 2, triggers Cloud Build, vistas de
  monitorización. Pendiente operativo residual: subir los DAGs al bucket de Composer PROD.
- **IAM**: acceso por grupos (no usuarios individuales); onboarding/offboarding centralizado vía
  IdP/SSO; separación entre usuarios IAM, service accounts y grupos.
- **IA aplicada a la plataforma**: generación de DAGs, migración Python→Airflow/Dataform,
  documentación automática, validación de datos, ayuda en LookML, automatización de
  metadatos/reglas de calidad.

## Objetivos del Plan Data por vertical
- **Publicidad**: gestión comercial, performance de campañas, informes en tiempo real, previsión
  de ingresos, segmentaciones por intención.
- **Clasificados**: Proyecto Compass, dashboards de KPIs, seguimiento comercial, pricing/churn
  prediction, control de leads fraudulentos.
- **Suscripciones**: EEDD Suscripciones y CdM de negocio.
- **Comercial**: EEDD Comercial / propuestas y oportunidades comerciales.
- **IA**: agentes para presentaciones, clipping, asistente y recomendador.

!!! warning "Pendientes/incertidumbres"
    - El Plan Data es más portafolio/roadmap que especificación técnica; muchas iniciativas no
      bajan a tablas, KPIs o contratos de datos concretos.
    - No existe un modelo relacional clásico de la infraestructura GCP.
    - Aunque el despliegue PROD figura al 100%, queda pendiente cargar los DAGs en Composer PROD.

!!! info "Fuentes"
    - `4. Documentación Plataforma Tecnológica\1 - Plataforma Tecnológica\Despliegue PROD\Guia_Despliegue_PROD_DataPlatform_v1.docx`
    - `4. Documentación Plataforma Tecnológica\1 - Plataforma Tecnológica\Despliegue PROD\Inventario_DEV_20260318.xlsx`
    - `4. Documentación Plataforma Tecnológica\1 - Plataforma Tecnológica\Despliegue PROD\Estado_Despliegue_PROD_20260323.xlsx`
    - `4. Documentación Plataforma Tecnológica\6 - Plan Data\Proyecto DATA - Vocento.xlsx`
    - `4. Documentación Plataforma Tecnológica\6 - Plan Data\Roadmap Data Sumauto 2026.xlsx`

