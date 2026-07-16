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


!!! info "Fuentes documentales"
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Propuesta Modelo de Gobierno del Dato (Draft).docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Propuesta de gestión de la demada.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Estandarización reglas de calidad.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Glosario de negocio\Dataplex_CargaMasiva_GlosarioNegocio.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Glosario de negocio\Plantilla_Glosario_Terminos_VF.xlsx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Análisis y reglas de calidad\Dataplex_CargaMasiva_ReglasCalidad.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Carga masiva Aspect-types\Dataplex_CargaMasiva_AspectType.docx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\Modelado DW.xlsx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\dataform-consum-dlk\definitions\01_source\declare_source.js`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\dataform-consum-dlk\definitions\02_staging\load_staging.js`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\dataform-consum-dlk\definitions\03_intermediate\*.sqlx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\dataform-consum-dlk\definitions\04_data_mart\*.sqlx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\bq_queries_20260210\prod__stg\*.sql`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\bq_queries_20260210\prod__mrt\*.sql`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Modelo de Gobierno\Calidad del dato\Dataform Sumauto\bq_queries_assertions_20251020\**\*.sql`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Carga masiva Aspect-types\**\*.xlsx`
    `4. Documentación Plataforma Tecnológica\2 - Gobierno del Dato\Código Dataplex\Dataplex\Análisis y reglas de calidad\**\*.zip`
    `5. Documentación Espacio Datos\2. Casos de uso\Código Dataplex\Análisis y reglas de calidad\*.zip`
    `5. Documentación Espacio Datos\2. Casos de uso\Código Dataplex\Carga masiva Aspect-types\*.zip`
    `5. Documentación Espacio Datos\2. Casos de uso\Código BigQuery\Queries\*.zip`
