# Resumen funcional — Publicidad

El dominio de **Publicidad** combina dos líneas:

1. La migración del reporting operativo desde **Qlik** hacia **GCP/BigQuery** para publicidad
   digital y gestión comercial/facturación.
2. Un caso de uso de **Espacio de Datos** para exponer **audiencias anónimas** a anunciantes,
   agencias y plataformas programáticas.

En plataforma tecnológica, los entregables describen un modelo Gold con al menos dos datamarts
principales:

- **`dm_ad_delivery`** — entrega/rendimiento digital a partir de GAM + DataTransfer.
- **`dm_gestion_comercial`** — pedidos, campañas, clientes, ingresos y actividad comercial desde
  AdPoint y maestros.

En Espacio de Datos, el producto final documentado es **`cu_publicidad_digital`**, tabla Gold
diaria con volúmenes de visitantes únicos por **13 segmentos** alineados con IAB y ventanas
**1/7/15/30 días**.

El objetivo de negocio recurrente es disponer de una "fuente única de la verdad" para reporting,
activación y gobierno del dato, reduciendo silos, mejorando granularidad y aplicando reglas
explícitas de privacidad/DPO.

## Casos de uso

### 1. Publicidad digital / ad delivery
Reporting de impresiones, clicks, revenue, code serves, fill rate, render rate, viewability, eCPM
y otras métricas sobre inventario GAM/DataTransfer. Análisis por ad unit, posición, formato,
dispositivo, line item, order, anunciante/agencia y publicación. Clasificación del inventario
mediante maestros (`maestro de publicaciones`, `MaestroPosiciones`).

### 2. Gestión comercial
Reposición funcional del CdM/Qlik de KPIs, detalle de órdenes, cierre, actividad comercial,
mercado (ARCE), inversión/desinversión, tarifas, producción y cartera. Seguimiento de clientes,
campañas, oportunidades, productos/publicaciones, oficinas, unidades de gestión y revenue
reconocido.

### 3. Caso de uso EEDD Publicidad
Exposición de **audiencias anónimas** para anunciantes/agencias. Segmentación por intereses
derivados de navegación WEB/APP; 13 segmentos tipo `VM_*` alineados con IAB. Resultado gobernado:
consultas de volumen por segmento y ventana temporal; se prevé reutilización de definiciones de
segmento en **CDP**. El dato es agregado/anónimo y no identifica personas; varias decisiones
siguen pendientes de validación DPO/negocio.

## Validación y calidad de datos aplicadas a negocio
- **Reunión de negocio (Publicidad Digital, 07/04/2026)**: validación de cuadros de mando Looker
  — cross filtering, cabeceras activas, filtrado de tráfico IP extranjera, reclasificación de AMP,
  revisión de Ad Unit 2 y del cálculo de revenue/CPD/CPM, sustituto para *measurable impressions*
  deprecadas. Dashboards validados: **Publicidad Digital Diario** y **Adobe**.
- **Formaciones de negocio**: *Gestión Comercial* (Analizador con selector cartera/cierre/
  producción/facturación/acumulado, +120 filtros) y *Producción Publicidad Digital* (dashboards
  Diario/Mensual en Looker, hojas Tendencia/Comparativos/Tops/Analizador).

!!! info "Fuentes"
    - `4. Documentación Plataforma Tecnológica\3 - Publicidad\Vocento - Documentación técnica - Publicidad.docx`
    - `4. Documentación Plataforma Tecnológica\3 - Publicidad\CdM gestion comercial\CdM_Gestion_Comercial.pptx`
    - `5. Documentación Espacio Datos\2. Casos de uso\CdU Publicidad\E16 Memoria Caso de Uso Publicidad (Original).docx`
    - `2. Grabaciones de sesiones\Reuniones con negocio\Publicidad digital\07042026_CdM Publicidad Digital - negocio.docx`
    - `3. Formaciones\Gestión Comercial.pptx`, `3. Formaciones\Prod.Pub.Digital.pptx`

