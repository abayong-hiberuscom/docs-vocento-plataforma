# Resumen ejecutivo

## Qué es el proyecto
El proyecto consiste en el desarrollo de un **Espacio de Datos (EEDD)** propio — un ecosistema federado y
descentralizado para compartir datos con terceros de forma segura y gobernada, manteniendo la
soberanía del dato en origen — apoyado en una **plataforma analítica corporativa en GCP**
(arquitectura medallón Bronze/Silver/Gold sobre BigQuery, Dataform y Dataplex). El proyecto está
cofinanciado y sujeto a justificación **CRED/PRTR** ante el Ministerio, con hitos MVP y una
Memoria Técnica de 23 entregables (ver [Entregables E1-E23](entregables.md)).

## Los cuatro casos de uso de negocio
| Dominio | Producto de datos gobernado (EEDD) | Estado (jul. 2026) |
|---|---|---|
| [Publicidad](../publicidad/resumen.md) | `cu_publicidad_digital` — audiencias anónimas por 13 segmentos IAB (ventanas 1/7/15/30 días) | Maduro: datamarts, CdM y validaciones E2E avanzadas |
| [Clasificados](../clasificados/resumen.md) | `cu_clasificados_intereses_agregados_por_horizonte` — leads/intereses agregados de automoción (15/30/60/90 días) | Maduro: primer consumidor real (Renault) |
| [Suscripciones](../suscripciones/resumen.md) | `cu_eedd_suscripciones_secciones_clusterizadas` — interés editorial clusterizado (K-Means) | En curso: definiciones de negocio y reporting aún abiertas |
| [Propuestas Comerciales](../otros-dominios/propuestas-comerciales.md) | `cu_eedd_propuestas_comerciales_egm_gfk` — cruce EGM+GFK | Incipiente: alcance funcional incompleto |

## Arquitectura y gobierno en una frase
Datos que entran por capas **Bronze → Silver → Gold** en BigQuery, orquestados con Cloud
Composer/Dataform, gobernados con **Dataplex** (catálogo, calidad, linaje) y expuestos de forma
controlada a través de un **conector EDC** (Eclipse Dataspace Connector) con Keycloak, contratos y
políticas de acceso — ver [Espacio de Datos](../espacio-datos/modelo-operativo.md) y
[Gobierno del Dato](../gobierno-dato/modelo-gobierno.md).

## Estado global del programa (julio 2026)
- Estado global cercano al **90%**; 18 de 23 entregables finalizados/aprobados a 12/06/2026.
- Modelo operativo del EEDD entregado y validado (mayo 2026); primer consumidor real activo.
- Decisión de negocio de incluir el botón **"Rechazar todo"** en la primera capa del formulario de
  consentimiento (ver [Consentimientos](../espacio-datos/consentimientos.md)).
- Persisten trabajos abiertos en Suscripciones e Inteligencia de Negocio, y cierre económico/
  administrativo de la justificación final.

Ver detalle cronológico completo en [Seguimiento del programa](seguimiento-programa.md).

