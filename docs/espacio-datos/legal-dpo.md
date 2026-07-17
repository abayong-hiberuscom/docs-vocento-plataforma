# Aspectos legales y DPO

## EIPD / PIA (Evaluación de Impacto)
- Se usa como marco de **Privacy by Design** por caso de uso: finalidad, datasets, flujo
  end-to-end, terceros, accesos, conservación, seguridad y escenarios de riesgo antes de operar.
- El informe RGPD de 28/01/2026 concluye que los casos **Publicidad** y **Leads/Clasificados** son
  tratamientos de **alto riesgo condicionados al diseño** (perfilado, segmentación, combinación de
  datasets, activación con terceros, multiactor) → exige EIPD previa, bases jurídicas por
  finalidad, transparencia reforzada, reparto de roles (responsable/corresponsable/encargado) y
  contratos/DPA.
- El informe de 25/03/2026 adopta un criterio conservador: muchos campos "técnicos" de adtech,
  navegación, localización, dispositivo, login, suscripción y autores/comerciales deben tratarse
  como **datos personales** cuando permiten identificación o perfilado.

Patrón común en los cuestionarios de casos de uso:

- **Analítica agregada**: dashboards/KPIs internos sobre datamarts `dm_*`, salida agregada, sin
  acceso externo previsto.
- **Leads cualificados / enriquecimiento**: combinación de leads y navegación first-party para
  segmentación comercial; salida al EEDD agregada o segmentada, no el dato bruto.
- **Contenido personalizado / lookalikes / publicidad personalizada / retargeting**: los casos más
  intensivos en consentimiento y perfilado.

Hallazgos repetidos: acceso delegado en **IAM** y mínimo privilegio; cifrado GCP por defecto en
tránsito y reposo; el EEDD **no debe exponer buckets/raw**, solo datamarts/capa gold. Quedan
**pendientes** en varios casos: retención definitiva, condiciones de borrado, clasificación final
de sensibilidad, parte del modelado legal y, a veces, el nombre final del dataset. En varios
cuestionarios consta que **desarrollo/pruebas usan datos reales** y que **no hay plan activo de
respuesta a incidentes** (brecha de control).

## Gestión de opt-ins / opt-outs
- El documento de legitimación consolida necesidades técnicas/legales para gestionar
  consentimiento, oposición y no tratamiento en todo el proyecto, como base de la EIPD.
- Govertis **no recomienda** un modelo binario puro de *pay or consent*; recuerda que su validez
  sigue sometida a evolución regulatoria/EDPB. El modelo "Pay or Consent" se define por capas:
    1. Elección clara entre acceso por consentimiento vs. pago/suscripción.
    2. Centro de preferencias por finalidades, sin premarcados, con rechazo tan accesible como
       la aceptación.
    3. Gestión de socios publicitarios / TCF.
- Obligaciones funcionales: registrar preferencia por finalidad, fecha, versión de texto/panel y
  señal TCF; verificar consentimiento en recogida, perfilado, segmentación, activación y
  compartición; soportar retirada, bloqueo operativo y supresión posterior; mantener políticas de
  retención revisables.
- La matriz AS-IS distingue tratamientos por negocio/canal/usuario: cookies/publicidad
  personalizada dependen de consentimiento; varias cesiones/comunicaciones requieren opt-in
  específico; algunos usos comerciales se plantean como opt-out; hay zonas marcadas como riesgo.
- A junio-julio 2026: flujo general de opt-ins/outs **aprobado**; arquitectura contractual y
  Rulebook/Código de Conducta aprobados; pendiente cerrar textos finales; la decisión de
  **"Rechazar todo"** aparece aceptada por negocio (primera capa) en julio — ver también
  [Consentimientos](consentimientos.md).

## Modelos contractuales y gobernanza
Ver el detalle de Rulebook, roles de gobierno y contrato de participante en
[Gobierno y accesos](gobierno-accesos.md#modelos-contractuales-rulebook-y-adhesion).

