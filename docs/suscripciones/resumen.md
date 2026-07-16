# Resumen funcional — Suscripciones

El dominio mezcla dos frentes documentales:

1. **Migración/normalización del reporting de suscripciones** hacia Looker/BigQuery, con un
   catálogo de **14 Cuadros de Mando (CdM)** para Dirección, Growth, Cartera, Redacción, CRM, B2B
   y Financiero.
2. **Caso de uso EEDD de Suscripciones**, orientado a exponer datos agregados y anonimizados sobre
   consumo editorial de suscriptores.

La visión objetivo del vertical es un **sistema único de reporting**, no cuadros aislados,
conectando el recorrido: canal → paywall/funnel → pedido → cartera/ingresos → churn/cancelación →
engagement/contenido → CRM/journeys.

Los CdM priorizados en fase 1: **D1 Executive Reader Revenue**, **D2 Objetivos vs Real**,
**G3 Altas/Bajas Diario Operativo** y **C1 Portfolio & Lifecycle**; el resto se distribuye en
fases 2-4.

El caso EEDD de Suscripciones persigue ofrecer un asset gobernado con métricas de interés de
usuarios suscriptores sobre secciones temáticas, útil para **fidelización, analítica y
monetización**, sin exponer PII ni trazas individuales.

KPIs recurrentes en reporting de negocio: cartera total/B2C/B2B, altas, bajas, churn, ARPU,
ingresos, LTV, objetivos por cabecera y RFV.

## Objetivos por área de reporting
- **Dirección**: visión ejecutiva en 60 segundos — activos, net adds, ingresos, ARPU, churn.
- **Growth**: funnel, paywall, altas/bajas, campañas y forecast.
- **Cartera**: portfolio, lifecycle, renovaciones, churn, movimientos de cartera y riesgo.
- **Contenido/Redacción**: qué contenido impulsa registros, suscripciones y retención.
- **CRM**: newsletters, onboarding, journeys y carrito abandonado.
- **B2B**: portfolio, billing, colectivos gratuitos y uso.
- **Financiero**: conciliación entre suscripciones, ingresos, cobros/incobros, devoluciones y
  desistimientos.

Objetivos EEDD: aumentar el valor del dato de suscripciones; facilitar información de primera mano
sobre intereses/usos reales de los suscriptores; apoyar conversión, fidelización y activación con
información agregada y anonimizada; garantizar privacidad por diseño, validación DPO y soberanía
del dato.

!!! warning "Pendientes/incertidumbres"
    - La documentación mezcla al menos tres capas (reporting negocio, migración AWS→GCP, caso
      EEDD) con solapamientos terminológicos.
    - Varias definiciones funcionales siguen abiertas: tipo/nombre de oferta,
      `importe_prox_renovacion` (no fiable al 100%), cortes de método de pago, promociones,
      renovaciones y B2B.
    - `historico_rfv` está deprecada y será sustituida por `rfv_agrupado`; persisten discrepancias
      estructurales con el cliente (`tipo_login`, `bizkaia`, `segmento 0`, `valor_referencia`,
      `ultima-hora`, `tienda-suscripciones`).

!!! info "Fuentes"
    - `4. Documentación Plataforma Tecnológica\5 - Suscripciones\Otros documentos Suscripciones\Vocento - Documentación técnica - Suscripciones.docx`
    - `5. Documentación Espacio Datos\2. Casos de uso\CdU Suscripciones\ENTREGABLE E17 Solución y resultados de los Casos de uso ...docx`

