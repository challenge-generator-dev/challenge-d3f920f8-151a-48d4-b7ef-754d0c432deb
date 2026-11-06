# Implementación de CRUD de órdenes en DynamoDB

El sistema debe permitir la creación, lectura, actualización y eliminación de órdenes en una tabla de DynamoDB, expuestas a través de una API REST. Los actores involucrados son el Cliente, que realiza las solicitudes, y el Sistema de Órdenes, que gestiona las operaciones CRUD. La tabla DynamoDB debe ser capaz de manejar un volumen pico de 1000 órdenes por segundo con una latencia máxima de 100ms. Las órdenes tienen atributos como ID, cliente, producto, cantidad y estado. La operación de lectura debe fallar con un error 'OrdenNoEncontrada' si la orden no existe.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de ordenes sobre DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial del entorno

**Objetivo:** Configurar el entorno de desarrollo para trabajar con DynamoDB y Terraform.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar Terraform para crear la tabla DynamoDB.
- Verificar que la tabla se ha creado correctamente y está disponible para su uso.

**Entregable:** Tabla DynamoDB creada y disponible para operaciones CRUD.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para gestionar recursos en la nube.

</details>

### Fase 2: Implementación de la creación de órdenes

**Objetivo:** Implementar la funcionalidad para crear nuevas órdenes en la tabla DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Desarrollar la lógica para crear una nueva orden con los atributos necesarios.
- Asegurar que la orden se almacene correctamente en la tabla DynamoDB.
- Manejar posibles errores durante la creación de la orden.

**Entregable:** Función para crear órdenes en DynamoDB, con manejo de errores.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de la API de DynamoDB para operaciones de escritura.
- Manejo de errores en la creación de órdenes.

</details>

### Fase 3: Implementación de la lectura de órdenes

**Objetivo:** Implementar la funcionalidad para leer órdenes existentes en la tabla DynamoDB.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Desarrollar la lógica para leer una orden existente por su ID.
- Asegurar que la orden se recupera correctamente de la tabla DynamoDB.
- Manejar el caso en que la orden no existe, devolviendo un error 'OrdenNoEncontrada'.

**Entregable:** Función para leer órdenes en DynamoDB, con manejo de error 'OrdenNoEncontrada'.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de la API de DynamoDB para operaciones de lectura.
- Manejo de errores en la lectura de órdenes.

</details>

### Fase 4: Implementación de la actualización y eliminación de órdenes

**Objetivo:** Implementar la funcionalidad para actualizar y eliminar órdenes en la tabla DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Desarrollar la lógica para actualizar una orden existente por su ID.
- Desarrollar la lógica para eliminar una orden existente por su ID.
- Asegurar que las operaciones de actualización y eliminación se realicen correctamente.
- Manejar posibles errores durante las operaciones de actualización y eliminación.

**Entregable:** Funciones para actualizar y eliminar órdenes en DynamoDB, con manejo de errores.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de la API de DynamoDB para operaciones de actualización y eliminación.
- Manejo de errores en la actualización y eliminación de órdenes.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una orden en el contexto de este sistema?
- **paraQueSirve**: ¿Para qué sirve la tabla DynamoDB en este sistema?
- **comoSeUsa**: ¿Cómo se usa la API REST para interactuar con las órdenes en DynamoDB?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir durante las operaciones CRUD en DynamoDB?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de las operaciones CRUD en DynamoDB?

## Criterios de Evaluacion

- Configuración correcta de la tabla DynamoDB utilizando Terraform.
- Implementación correcta de la funcionalidad para crear órdenes en DynamoDB.
- Implementación correcta de la funcionalidad para leer órdenes en DynamoDB, con manejo de error 'OrdenNoEncontrada'.
- Implementación correcta de la funcionalidad para actualizar órdenes en DynamoDB, con manejo de errores.
- Implementación correcta de la funcionalidad para eliminar órdenes en DynamoDB, con manejo de errores.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | `app/` | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd app && npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
