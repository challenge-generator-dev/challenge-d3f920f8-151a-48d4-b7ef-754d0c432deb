# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de CRUD de órdenes en DynamoDB**.

| | |
|---|---|
| Tema | CRUD de ordenes sobre DynamoDB |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 11 |
| Patron arquitectonico | capas estándar (dominio, aplicación, infraestructura) |
| Tiempo estimado | 8 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/common 11.0.0
- @nestjs/core 11.0.0
- @nestjs/platform-express 11.0.0
- @nestjs/swagger 7.3.1
- class-validator 0.14.1
- class-transformer 0.5.1
- @aws-sdk/client-dynamodb 3.577.0
- @aws-sdk/lib-dynamodb 3.577.0
- reflect-metadata 0.2.2
- rxjs 7.8.1
- @nestjs/testing 11.0.0
- jest 29.7.0
- supertest 6.3.4

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración inicial del entorno**: Tabla DynamoDB creada y disponible para operaciones CRUD.
- **Fase 2 — Implementación de la creación de órdenes**: Función para crear órdenes en DynamoDB, con manejo de errores.
- **Fase 3 — Implementación de la lectura de órdenes**: Función para leer órdenes en DynamoDB, con manejo de error 'OrdenNoEncontrada'.
- **Fase 4 — Implementación de la actualización y eliminación de órdenes**: Funciones para actualizar y eliminar órdenes en DynamoDB, con manejo de errores.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (3)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `app/src/exceptions/order-not-found.exception.ts` — `OrderNotFoundException.getStatus`
      Se invoca `getStatus` sobre `OrderNotFoundException`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `app/src/exceptions/order-not-found.exception.ts` — `OrderNotFoundException.getResponse`
      Se invoca `getResponse` sobre `OrderNotFoundException`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `app/src/exceptions/order-not-found-exception.filter.ts` — `OrderNotFoundException.getStatus`
      Se invoca `getStatus` sobre `OrderNotFoundException`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (27)

- `app/package.json`
- `app/tsconfig.json`
- `app/src/main.ts`
- `app/src/domain/entities/order.entity.ts`
- `app/src/domain/repositories/order.repository.ts`
- `app/src/application/dtos/create-order.dto.ts`
- `app/src/application/dtos/update-order.dto.ts`
- `app/src/application/services/order.service.ts`
- `app/src/app.module.ts`
- `app/src/config/dynamodb.config.ts`
- `app/src/infrastructure/repositories/order.repository.impl.ts`
- `app/src/infrastructure/controllers/order.controller.ts`
- `app/src/exceptions/order-not-found.exception.ts`
- `app/src/exceptions/order-not-found-exception.filter.ts`
- `infra/providers.tf`
- `infra/variables.tf`
- `infra/modules/dynamodb/variables.tf`
- `infra/versions.tf`
- `infra/README.md`
- `infra/main.tf`
- `infra/outputs.tf`
- `infra/environments/dev/terraform.tfvars`
- `infra/modules/dynamodb/main.tf`
- `infra/modules/dynamodb/outputs.tf`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `app`
- `app/src/domain/entities`
- `app/src/domain/repositories`
- `app/src/application/services`
- `app/src/application/dtos`
- `app/src/infrastructure/controllers`
- `app/src/infrastructure/repositories`
- `app/src/config`
- `infra`
- `infra/modules/dynamodb`

## Verificacion

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **capas estándar (dominio, aplicación, infraestructura)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2
- Brecha que el reto ataca: CRUD de ordenes en DynamoDB expuesto por una API REST (corrida e2e 20261106172943501), Implementa operaciones CRUD de ordenes sobre una tabla DynamoDB expuestas por una API REST
- Mision: Persistir y consultar ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
