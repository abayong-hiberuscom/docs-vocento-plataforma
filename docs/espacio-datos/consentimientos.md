# Consentimientos y Gestión de Privacidad — Vocento

## Resumen funcional
Iniciativa transversal de gestión de consentimientos de usuario (cookies/formulario de privacidad)
que impacta a los cuatro negocios de datos del proyecto (Publicidad, Suscripciones, Clasificados,
Eventos). Analiza si añadir un botón "Rechazar todo" con la misma prevalencia visual que "Aceptar
todo", según exige la Guía de Cookies 2023 de la AEPD.

## El dilema (nota de negocio)
- **Situación actual:** el formulario ofrece "Aceptar todo y continuar" y "Configurar", sin un
  "Rechazar todo" al mismo nivel.
- **Riesgo si NO se incluye:** la AEPD podría considerar inválido el consentimiento y, por tanto,
  ilegales los tratamientos de datos. Probabilidad baja, impacto alto (de miles a varios cientos de
  miles de €; sanción de referencia comparable: Camerdata, 200.000€; no se espera superar 1M€).
  Riesgo añadido: "contaminación" del histórico de datos si se declara infracción.
  Riesgo añadido: si se declara la infracción, no se podría usar el histórico de datos afectado.
- **Riesgo si SÍ se incluye:** caída del volumen de consentimientos → menos dato accionable para
  negocio en cada palanca (leads, registros, CPM, conversión de venta cruzada, etc.).
- **Próximo hito:** 26/06/2026 — confirmación final sobre inclusión del botón, condicionado a no
  impactar la validación de la app en los markets.
- Referencia histórica: valoración Áudea 2021 sobre soluciones de captura de consentimiento en un
  grupo de medios comparable.

## Casos de uso de negocio por tipo de consentimiento (`Casos de uso - consentimientos vocento.xlsx`)
Matriz "Consentimiento → Permitido / No Permitido" con casos de uso bloqueados por área si el
consentimiento "Cruzar datos con empresas del grupo Vocento" no se otorga:
- **Negocio general (bloqueado):** venta cruzada entre cabeceras, enriquecimiento de perfiles
  centralizado, audiencias publicitarias compartidas, comunicaciones comerciales de "Grupo".
- **Publicidad (bloqueado):** campañas display cross-selling entre cabeceras, audiencias lookalike
  compartidas (Meta/Google), retargeting unificado, segmentos publicitarios multi-marca.
- **Suscripciones (bloqueado):** packs multi-cabecera (p.ej. ABC + El Correo), migración de
  suscriptores entre marcas, suscripción única de grupo, promociones cruzadas.
- **Clasificados (bloqueado):** compartir leads entre portales (Idealista + Coches.net), base de
  anunciantes unificada, perfil de vendedor multi-categoría, promociones cruzadas entre verticales.
- **Eventos (bloqueado):** promoción cruzada de eventos, base de asistentes unificada, venta de
  entradas multi-marca, CRM de eventos compartido.
- Permitido siempre (con o sin ese consentimiento): fines administrativos internos, comunicaciones
  de marca original, SSO, publicidad display basada en cookies.

## Marco de impacto v2 (`Marco_impacto_Boton_Rechazar_todo_Vocento_v2.xlsx`)
- Hoja **"Matriz negocio x consent."**: para cada negocio y cada tipo de consentimiento, indica qué
  caso de uso se permite/no según el usuario marque/desmarque la casilla. Fuente: "Textos
  Opt-in_out v.0.1". Advertencia del propio documento: en **OPT-IN** habilita *marcar*; en
  **OPT-OUT** habilita *dejar sin marcar* (lógica invertida entre ambos tipos).
- Hoja **"Consentimientos (leyenda)"**: catálogo de consentimientos con columnas Código, Tipo,
  Consentimiento, Finalidad, qué significa marcar la casilla, y qué estado habilita a negocio.
- Hoja **"Glosario y supuestos"**: conceptos y definiciones/supuestos usados en el análisis.

## Análisis de sensibilidad (`Sensibilidad_Rechazar_todo_Vocento.xlsx`)
Modelo lineal que estima el impacto de negocio si un % de usuarios (10%, 20%, 40%, 80%, 100%)
rechaza todo: cada usuario que rechaza se pierde por completo en cada "palanca" de negocio. Solo
requiere rellenar la "Base a consentimiento pleno" por palanca; el resto se calcula automáticamente.

## Proceso solicitado a las áreas de negocio
1. Completar la columna de su área en la Excel del marco de impacto, indicando volumen/valor en
   juego por escenario (órdenes de magnitud, no precisión contable).
2. Aportar la base para el análisis de sensibilidad (valor de la palanca a consentimiento pleno).
3. Negocio y Dirección comparan el coste de cada opción para decidir sobre el botón.

## Fuentes documentales
- `7. Consentimientos\Nota_negocio_Boton_Rechazar_todo_Vocento.docx`
- `7. Consentimientos\Casos de uso - consentimientos vocento.xlsx`
- `7. Consentimientos\Marco_impacto_Boton_Rechazar_todo_Vocento_v2.xlsx`
- `7. Consentimientos\Marco_impacto_Boton_Rechazar_todo_Vocento.xlsx` (versión previa de la v2)
- `7. Consentimientos\Sensibilidad_Rechazar_todo_Vocento.xlsx`

## Pendientes/incertidumbres
- No se ha resuelto (a fecha de los documentos) si se incluirá el botón "Rechazar todo"; decisión
  prevista para el 26/06/2026.
- El detalle exacto por celda de las matrices de consentimiento (códigos concretos, filas 4-83 de
  la matriz v2) no se ha transcrito íntegro; se referencia la estructura y propósito de cada hoja.
