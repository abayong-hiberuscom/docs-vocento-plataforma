# Gobierno y accesos del Espacio de Datos

## Módulo de Control
Componente centralizado de gobierno operativo del EEDD, reservado a perfiles administradores:

- Alta/rechazo de participantes
- Revisión de solicitudes a casos de uso
- Asignación de conectores
- Supervisión del estado de salud de conectores
- Administración de kits/casos de uso
- Consulta de telemetría y trazas

Ninguna organización entra sin **onboarding supervisado**.

## Servicio de Monitorización
Recopila logs y eventos de conectores y middlewares. Permite:

- Trazabilidad end-to-end de negociaciones y transferencias
- Auditoría del cumplimiento de políticas contractuales
- Observabilidad casi en tiempo real
- Registro de actividades de tratamiento con foco RGPD

Filtros disponibles para administradores: conector, fecha, identificador de negociación,
proveedor, activo y palabras clave. La telemetría para administradores de conector/proveedor está
descrita como **capacidad en desarrollo**. Se identifica también la necesidad de **advertir el
coste de refresco de assets BigQuery** para evitar impactos de facturación.

## Gestión de accesos (onboarding y roles)
- El acceso arranca con **onboarding de entidad**: formulario → revisión por administrador →
  aceptación/rechazo → comunicación por correo.
- Tras la aceptación, la entidad recibe **BPN/identificador**, credenciales e instrucciones; el
  **Administrador del Conector** gestiona usuarios y clientes en **Keycloak** (`connector-realm`).

Roles: **Administrador del Espacio de Datos** (adhesiones y monitorización), **Usuario no
autenticado** (solo onboarding), **Administrador del Conector** (identidades/autenticación),
**Proveedor** (publica assets y políticas), **Consumidor** (descubre/solicita/descarga),
**Usuario de gobierno** (participantes, conexiones, edición del Rulebook).

Secuencia funcional: solicitud de adhesión → validación administrativa/legal → alta de conector y
usuarios → autenticación → publicación/descubrimiento de assets → solicitud de acceso → aplicación
de políticas y descarga.

## Marco de gobierno del dato (niveles)
- **Macro**: regulación europea/nacional (Data Governance Act, Data Act, RGPD, eIDAS, AI Act).
- **Meso**: gobierno del espacio / federación / AGED (Autoridad de Gobierno del Espacio de Datos).
- **Micro**: gobierno interno del dato de cada participante.

Principio repetido: **no basta la tecnología; la gobernanza debe precederla**. El marco separa:

- **Plano de control**: autenticación/autorización, negociación de políticas y contratos, ciclo de
  vida del contrato.
- **Plano de datos**: transferencia efectiva, cifrado en tránsito, monitorización y trazabilidad.

Vocento conecta dos planos de gobierno:

- **Gobierno de la plataforma**: Dataplex, glosario, metadatos, reglas de calidad, IAM, Jira;
  roles: equipo central, Data Owner, Data Steward, Data Consumer, soporte IT/Seguridad/DPO.
- **Gobierno del espacio de datos**: autoridad de gobierno, comité estratégico, DGO
  (Data Governance Officer/Lead), operador, proveedor, consumidor, intermediario, proveedor de
  servicios; artefactos: Rulebook, acuerdos de adhesión, contratos, políticas de uso, conector, logs.

La **puerta de publicación** de un activo sigue esta lógica: demanda → validación de
negocio/finalidad → implementación en BigQuery → catalogación en Dataplex → definición de producto
publicable → certificación de controles → política + contrato → publicación y habilitación del
consumo.

Niveles de madurez del espacio: **bilateral → comunidad gestionada → espacio operativo → espacio
certificado → espacio federado**. Marcos de referencia citados: DSSC Blueprint, IDS-RAM, GAIA-X
Trust Framework, Eclipse EDC, SIMPL, UNE 0077, UNE 0085 y UNE 0087.

## Modelos contractuales (Rulebook y adhesión)
El **Rulebook** posiciona a Vocento Gestión de Medios y Servicios como promotora, operadora y
autoridad principal del EEDD; define participantes, proveedor, consumidor, intermediario,
operador, autoridad, catálogo federado, gestión de accesos y registro de transacciones.

Obligaciones funcionales clave del Rulebook:

- Acceso restringido a personas jurídicas admitidas.
- Adhesión bajo reglas comunes, roles y controles de seguridad.
- El proveedor responde de titularidad/licencia, exactitud, actualización y legalidad del dato.
- Prohibición de compartir datos personales sin anonimización o base jurídica válida.
- El consumidor debe respetar políticas de uso, licencias, seguridad y notificar brechas (24h).
- Revisión/versionado formal del Rulebook con trazabilidad de cambios.

### Contrato de participante (freemium / full)
- Acuerdo de adhesión entre la autoridad del espacio y el participante; regula el rol de
  **consumidor** y, si aplica, de **proveedor**.
- Modificaciones con **90 días** de preaviso y **no retroactividad** para datos ya recibidos.
- Uso solo para el **propósito específico aprobado**; **no redistribución** salvo autorización.
- Modelo **freemium** (acceso limitado, conector monousuario) vs **full** (tarifa fija, conector
  multiusuario, gestión de usuarios).
- Exige Data Security Officer, notificación inmediata de brechas, certificaciones de seguridad,
  confidencialidad y destrucción de datos al final del contrato.
- Anexos: tarifas fijas, penalidades (incumplimiento de propósito, redistribución no autorizada,
  incumplimiento RGPD, manipulación de trazabilidad), certificaciones requeridas/recomendadas.

