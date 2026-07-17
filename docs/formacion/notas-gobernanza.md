# Notas de sesiones de gobernanza y reuniones de negocio

## Sesiones de gobernanza (diciembre 2025)
Marco común de gobierno en Vocento con 4 pilares: **metadatos y catalogación**, **seguridad y
privacidad**, **calidad del dato**, **gestión de la demanda**. Roles base: equipo central de
gobierno, Data Owner, Data Steward y Data Consumer.

### Clasificados
- Prioridad: documentar y gobernar activos en **Dataplex**; debate sobre automatizar la
  propagación desde BigQuery/Dataform.
- Distinción entre **catálogo de datos** (campos/tablas/activos) y **glosario de KPIs** (métricas
  de negocio en dashboards).
- Organización por dominios: inventario, performance, comercial, financiero.
- Preocupación por la sensibilidad de tablas con emails/teléfonos/segmentos de usuario y por
  trazar legitimación/contrato de cada dato; flujo futuro de gestión de la demanda (owner/steward,
  sensibilidad, normativa, calidad antes de entrar en catálogo/glosario).

### Publicidad
- Vertical estructurada en 3 subdominios: operación comercial/campañas, marketing y financiero.
- Acuerdo: el enriquecimiento debe hacerse preferentemente sobre la **capa Silver**, no Bronze, y
  después conectar Gold/KPIs.
- Sesión legal/gobernanza posterior: necesidad de trazar soporte legal (versión de política de
  cookies/privacidad, checkbox, consentimiento/legitimación), contratos de datos o atributos
  equivalentes, clasificación de sensibilidad (agregado vs desagregado, interno de negocio vs
  interno grupo Vocento), retirada de consentimiento/bloqueo/borrado mediante tablas maestras de
  permisos/bloqueados.

Conclusión transversal: el roadmap de gobierno debe ir acompasado con la construcción técnica de
la plataforma y aterrizarse en casos reales.

## Reuniones de negocio

### Publicidad Digital (07/04/2026)
Validación de cuadros de mando Looker y calidad de datos: cross filtering, más filtros de
dimensión, reubicación de filtros secundarios, carga de histórico, cabeceras activas, filtrado de
tráfico IP extranjera, reclasificación de AMP, revisión de Ad Unit 2, revisión de cálculo de
revenue/CPD/CPM, sustituto de *measurable impressions* deprecadas. Dashboards a validar:
**Publicidad Digital Diario** y **Adobe**.

### Suscripciones — Captación B2C (08/04/2026)
Migración a plataforma centralizada de reporting para captación, evitando duplicidades con Adobe.
Necesidades: cuadro maestro diario de altas/bajas, seguimiento objetivo/forecast/presupuesto,
visión casi en tiempo real (~1h), campañas paid, funnel de conversión, paywall dinámico, previsión
de suscripciones/ingresos, eliminación del copiado manual en Excel. Se piden accesos a Adobe
Analytics y Salesforce.

### Suscripciones — Clientes B2C (09/04/2026)
Cuadro de mando unificado de cartera con KPIs (altas, bajas, cartera, ingresos, ARPU, lifetime
value). Filtros: B2B/B2C, medio, tier, tipo de baja, periodicidad, método de pago, tipo de
cancelación, RFV. Requisitos: movimientos entre tiers, clasificación de ofertas (bienvenida,
mejora, retención, reactivación), renovaciones por cohortes/cosechas, proyección de cancelaciones,
vigilancia de churn, cruce con Adobe Analytics, uso de datos de Evolok y Stripe.

!!! note
    No se localizó documento de texto acompañante para la sesión del 28/05/2026 (Gago, Ana
    González, Iñigo, Víctor); solo existe la grabación (no procesada).

