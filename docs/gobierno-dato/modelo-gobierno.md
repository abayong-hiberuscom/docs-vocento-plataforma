# Modelo de gobierno del dato


El modelo revisado para Vocento es **mínimo viable, centralizado, apoyado en Dataplex/GCP y escalable por dominios**. La documentación lo organiza alrededor de **metadatos/catalogación**, **seguridad y privacidad**, **calidad del dato** y **gestión de la demanda**.

### Roles

| Rol | Responsabilidad principal | Evidencia documental |
|---|---|---|
| Equipo central de Gobierno del Dato | Define políticas mínimas, administra Dataplex, homogeneiza permisos, supervisa metadatos y calidad. | Dos personas de gobierno; coordinación con IT; soporte operativo y métricas. |
| Data Owner | Responsable funcional del dominio; valida definiciones, accesos, reglas de calidad y nuevos activos. | Un owner por dominio: Publicidad, Suscripciones, Propuestas Comerciales, Audiencias, etc. |
| Data Steward | Responsable operativo del dominio; documenta activos, mantiene glosario y coordina incidencias. | Carga de metadatos en Dataplex y soporte al Owner. |
| Data Consumer | Usuario que consulta/usa datos y debe seguir canal formal de acceso y catálogo. | Analistas, negocio, marketing, producto, redacción, etc. |

### Procesos básicos

- **Catalogación**: Alta del activo → carga mínima de metadatos por el Steward → validación funcional del Owner → revisión del equipo de Gobierno → publicación en catálogo Dataplex.
- **Accesos**: Solicitud única (Jira o equivalente) → aprobación por Data Owner → aplicación técnica vía IAM/Dataplex → registro para auditoría.
- **Gestión de calidad**: Definición de reglas mínimas por dominio → monitorización → registro de incidencia → análisis Steward → resolución/validación → documentación de cierre.
- **Gestión de la demanda**: Canal único, clasificación por tipo/prioridad/dominio, validación funcional por Owner, priorización por el equipo central y cierre documentado.

### Políticas iniciales

- **Política de metadatos**: Ningún dataset/tabla/vista debe publicarse sin nombre, descripción, dominio, owner, steward, origen y frecuencia.
- **Política de accesos**: Todo acceso debe solicitarse formalmente, aprobarse por el Data Owner y quedar registrado; los datos sensibles requieren revisión adicional.
- **Política de calidad**: Cada dominio define reglas mínimas de completitud, formato y consistencia; las incidencias se registran y cierran por flujo formal.
- **Política de gestión de la demanda**: No se acepta trabajo informal fuera del canal único; la priorización la coordina el equipo de Gobierno con validación funcional del Owner.


