# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

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

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `app/src/exceptions/order-not-found.exception.ts` — `OrderNotFoundException.getStatus`: Se invoca `getStatus` sobre `OrderNotFoundException`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `app/src/exceptions/order-not-found.exception.ts` — `OrderNotFoundException.getResponse`: Se invoca `getResponse` sobre `OrderNotFoundException`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `app/src/exceptions/order-not-found-exception.filter.ts` — `OrderNotFoundException.getStatus`: Se invoca `getStatus` sobre `OrderNotFoundException`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB expuesto por una API REST (corrida e2e 20261106172943501), Implementa operaciones CRUD de ordenes sobre una tabla DynamoDB expuestas por una API REST

### Misión / candidato
Persistir y consultar ordenes

### Reto
- Tema: CRUD de ordenes sobre DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de órdenes en DynamoDB
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial del entorno — objetivo: Configurar el entorno de desarrollo para trabajar con DynamoDB y Terraform. — entregable (NO resolver): Tabla DynamoDB creada y disponible para operaciones CRUD.
- Fase 2: Implementación de la creación de órdenes — objetivo: Implementar la funcionalidad para crear nuevas órdenes en la tabla DynamoDB. — entregable (NO resolver): Función para crear órdenes en DynamoDB, con manejo de errores.
- Fase 3: Implementación de la lectura de órdenes — objetivo: Implementar la funcionalidad para leer órdenes existentes en la tabla DynamoDB. — entregable (NO resolver): Función para leer órdenes en DynamoDB, con manejo de error 'OrdenNoEncontrada'.
- Fase 4: Implementación de la actualización y eliminación de órdenes — objetivo: Implementar la funcionalidad para actualizar y eliminar órdenes en la tabla DynamoDB. — entregable (NO resolver): Funciones para actualizar y eliminar órdenes en DynamoDB, con manejo de errores.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: app/package.json ===
{
  "name": "order-management-system",
  "version": "1.0.0",
  "description": "Sistema de gestión de órdenes con DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"src/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.577.0",
    "@aws-sdk/lib-dynamodb": "^3.577.0",
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.3.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^22.0.0",
    "@types/supertest": "^6.0.2",
    "@types/uuid": "^9.0.8",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "supertest": "^6.3.4",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}


// === ARCHIVO: app/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true,
    "strict": true,
    "strictPropertyInitialization": false
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}

// === ARCHIVO: app/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OrderNotFoundExceptionFilter } from './exceptions/order-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new OrderNotFoundExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('API for managing orders in DynamoDB')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
  process.exit(1);
});

// === ARCHIVO: app/src/domain/entities/order.entity.ts ===
import { v4 as uuidv4 } from 'uuid';

/**
 * Representa una orden en el sistema.
 * Contiene los atributos esenciales de una orden y métodos para manipular su estado.
 */
export class OrderEntity {
    private readonly _id: string;
    private _customerId: string;
    private _productId: string;
    private _quantity: number;
    private _status: OrderStatus;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(customerId: string, productId: string, quantity: number) {
        if (!customerId || !productId) {
            throw new Error('Customer ID and Product ID are required');
        }
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        this._id = uuidv4();
        this._customerId = customerId;
        this._productId = productId;
        this._quantity = quantity;
        this._status = 'PENDING';
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    set customerId(value: string) {
        if (!value) {
            throw new Error('Customer ID is required');
        }
        this._customerId = value;
        this._updatedAt = new Date();
    }

    get productId(): string {
        return this._productId;
    }

    set productId(value: string) {
        if (!value) {
            throw new Error('Product ID is required');
        }
        this._productId = value;
        this._updatedAt = new Date();
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        if (value <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        this._quantity = value;
        this._updatedAt = new Date();
    }

    get status(): OrderStatus {
        return this._status;
    }

    set status(value: OrderStatus) {
        this._status = value;
        this._updatedAt = new Date();
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    /**
     * Actualiza el estado de la orden basándose en la transición permitida.
     * @param newStatus Nuevo estado a asignar.
     * @throws Error si la transición no está permitida.
     */
    updateStatus(newStatus: OrderStatus): void {
        const validTransitions: Record<OrderStatus, OrderStatus[]> = {
            PENDING: ['PROCESSING', 'CANCELLED'],
            PROCESSING: ['SHIPPED', 'CANCELLED'],
            SHIPPED: ['DELIVERED'],
            DELIVERED: [],
            CANCELLED: []
        };

        if (!validTransitions[this._status].includes(newStatus)) {
            throw new Error(`Transition from ${this._status} to ${newStatus} is not allowed`);
        }
        this.status = newStatus;
    }
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// === ARCHIVO: app/src/domain/repositories/order.repository.ts ===
/**
 * Interfaz del repositorio de órdenes.
 * Define los métodos CRUD que deben implementarse para interactuar con DynamoDB.
 */
export interface OrderRepository {
    /**
     * Crea una nueva orden en DynamoDB.
     * @param order Orden a crear.
     * @returns La orden creada.
     */
    create(order: OrderEntity): Promise<OrderEntity>;

    /**
     * Obtiene una orden por su ID.
     * @param id ID de la orden.
     * @returns La orden encontrada.
     * @throws OrderNotFoundException si la orden no existe.
     */
    findById(id: string): Promise<OrderEntity>;

    /**
     * Actualiza una orden existente en DynamoDB.
     * @param id ID de la orden.
     * @param order Datos actualizados de la orden.
     * @returns La orden actualizada.
     * @throws OrderNotFoundException si la orden no existe.
     */
    update(id: string, order: OrderEntity): Promise<OrderEntity>;

    /**
     * Elimina una orden de DynamoDB.
     * @param id ID de la orden.
     * @throws OrderNotFoundException si la orden no existe.
     */
    delete(id: string): Promise<void>;
}

// === ARCHIVO: app/src/application/dtos/create-order.dto.ts ===
import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

/**
 * DTO para la creación de una orden.
 * Contiene validaciones para asegurar que los datos cumplen con las reglas del dominio.
 */
export class CreateOrderDto {
    @IsString()
    @IsNotEmpty({ message: 'Customer ID is required' })
    customerId: string;

    @IsString()
    @IsNotEmpty({ message: 'Product ID is required' })
    productId: string;

    @IsNumber()
    @Min(1, { message: 'Quantity must be at least 1' })
    quantity: number;

    constructor(customerId: string, productId: string, quantity: number) {
        this.customerId = customerId;
        this.productId = productId;
        this.quantity = quantity;
    }
}

/**
 * Factory method para crear una entidad OrderEntity a partir de un CreateOrderDto.
 * @param dto DTO con los datos de la orden.
 * @returns Instancia de OrderEntity.
 */
export function toOrderEntity(dto: CreateOrderDto): OrderEntity {
    return new OrderEntity(dto.customerId, dto.productId, dto.quantity);
}

// === ARCHIVO: app/src/application/dtos/update-order.dto.ts ===
import { IsString, IsNumber, IsOptional, Min, Max, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Identificador del cliente que realiza la orden',
    example: 'cust_12345',
  })
  @IsOptional()
  @IsString({ message: 'El ID del cliente debe ser una cadena de texto' })
  customerId?: string;

  @ApiPropertyOptional({
    description: 'Identificador del producto ordenado',
    example: 'prod_67890',
  })
  @IsOptional()
  @IsString({ message: 'El ID del producto debe ser una cadena de texto' })
  productId?: string;

  @ApiPropertyOptional({
    description: 'Cantidad de productos ordenados',
    example: 5,
    minimum: 1,
    maximum: 1000,
  })
  @IsOptional()
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(1, { message: 'La cantidad mínima es 1' })
  @Max(1000, { message: 'La cantidad máxima es 1000' })
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Estado actual de la orden',
    enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    example: 'PROCESSING',
  })
  @IsOptional()
  @IsIn(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'], {
    message: 'El estado debe ser uno de: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED',
  })
  status?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

// === ARCHIVO: app/src/application/services/order.service.ts ===
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderEntity, OrderStatus } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<OrderEntity> {
    if (!dto.customerId || !dto.productId || !dto.quantity) {
      throw new BadRequestException('Los campos customerId, productId y quantity son obligatorios');
    }

    if (dto.quantity <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor que cero');
    }

    const order = new OrderEntity(dto.customerId, dto.productId, dto.quantity);
    return await this.orderRepository.create(order);
  }

  async getOrder(id: string): Promise<OrderEntity> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID de la orden es obligatorio');
    }

    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    return order;
  }

  async updateOrder(id: string, dto: UpdateOrderDto): Promise<OrderEntity> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID de la orden es obligatorio');
    }

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    if (dto.customerId !== undefined) {
      existingOrder.customerId = dto.customerId;
    }

    if (dto.productId !== undefined) {
      existingOrder.productId = dto.productId;
    }

    if (dto.quantity !== undefined) {
      if (dto.quantity <= 0) {
        throw new BadRequestException('La cantidad debe ser mayor que cero');
      }
      existingOrder.quantity = dto.quantity;
    }

    if (dto.status !== undefined) {
      this.validateStatusTransition(existingOrder.status, dto.status);
      existingOrder.updateStatus(dto.status);
    }

    return await this.orderRepository.update(id, existingOrder);
  }

  async deleteOrder(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID de la orden es obligatorio');
    }

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    await this.orderRepository.delete(id);
  }

  private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): void {
    const invalidTransitions: Record<OrderStatus, OrderStatus[]> = {
      DELIVERED: ['PENDING', 'PROCESSING', 'SHIPPED'],
      CANCELLED: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'],
      SHIPPED: ['PENDING', 'PROCESSING'],
      PROCESSING: ['PENDING'],
      PENDING: [],
    };

    if (invalidTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `No se puede transicionar de ${currentStatus} a ${newStatus}`,
      );
    }
  }
}

// === ARCHIVO: app/src/app.module.ts ===
import { Module, Logger } from '@nestjs/common';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderService } from './application/services/order.service';
import { OrderRepository } from './domain/repositories/order.repository';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { getDynamoDBClient, getDynamoDBDocumentClient } from './config/dynamodb.config';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: OrderRepository,
      useFactory: () => {
        const docClient = getDynamoDBDocumentClient();
        const tableName = process.env.DYNAMODB_TABLE_ORDERS || 'orders';
        const logger = new Logger('OrderRepository');
        return new OrderRepositoryImpl(docClient, tableName, logger);
      },
    },
    {
      provide: 'DYNAMODB_CLIENT',
      useFactory: () => {
        return getDynamoDBClient();
      },
    },
    {
      provide: 'DYNAMODB_DOCUMENT_CLIENT',
      useFactory: () => {
        return getDynamoDBDocumentClient();
      },
    },
  ],
  exports: [OrderRepository],
})
export class AppModule {}

// === ARCHIVO: app/src/config/dynamodb.config.ts ===
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';

const getClientConfig = (): DynamoDBClientConfig => {
  const region = process.env.AWS_REGION || 'us-east-1';
  const endpoint = process.env.DYNAMODB_ENDPOINT;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  const config: DynamoDBClientConfig = {
    region,
  };

  if (endpoint) {
    config.endpoint = endpoint;
  }

  if (accessKeyId && secretAccessKey) {
    config.credentials = {
      accessKeyId,
      secretAccessKey,
    };
  }

  return config;
};

const getDocumentConfig = (): DynamoDBDocumentClientConfig => {
  const clientConfig = getClientConfig();
  const client = DynamoDBDocumentClient.from(clientConfig, {
    marshallOptions: {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
    unmarshallOptions: {
      wrapNumbers: false,
    },
  });

  return { client };
};

export const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'orders';

export const dynamoDBDocumentClient = DynamoDBDocumentClient.from(getClientConfig(), {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
});

export const createDynamoDBClient = (): DynamoDBClient => {
  return new DynamoDBClient(getClientConfig());
};

export const createDocumentClient = (): DynamoDBDocumentClient => {
  return DynamoDBDocumentClient.from(createDynamoDBClient(), {
    marshallOptions: {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
    unmarshallOptions: {
      wrapNumbers: false,
    },
  });
};

// === ARCHIVO: app/src/infrastructure/repositories/order.repository.impl.ts ===
import { Injectable, Inject } from '@nestjs/common';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, DeleteCommandOutput, GetCommandOutput, PutCommandOutput, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderEntity, OrderStatus } from '../../domain/entities/order.entity';
import { DYNAMODB_TABLE_NAME, dynamoDBDocumentClient } from '../../config/dynamodb.config';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  private readonly tableName: string;

  constructor(
    @Inject(dynamoDBDocumentClient)
    private readonly docClient: DynamoDBDocumentClient,
  ) {
    this.tableName = DYNAMODB_TABLE_NAME;
  }

  private mapToOrderEntity(item: Record<string, any>): OrderEntity {
    const order = new OrderEntity(
      item.customerId,
      item.productId,
      item.quantity,
    );
    order.customerId = item.customerId;
    order.productId = item.productId;
    order.quantity = item.quantity;
    order.status = item.status as OrderStatus;
    return order;
  }

  private toDynamoDBItem(order: OrderEntity): Record<string, any> {
    return {
      id: order.id,
      customerId: order.customerId,
      productId: order.productId,
      quantity: order.quantity,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: this.toDynamoDBItem(order),
      ConditionExpression: 'attribute_not_exists(id)',
    });

    await this.docClient.send(command);
    return order;
  }

  async findById(id: string): Promise<OrderEntity | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result: GetCommandOutput = await this.docClient.send(command);
    
    if (!result.Item) {
      return null;
    }

    const order = this.mapToOrderEntity(result.Item);
    const originalDate = new Date(result.Item.createdAt);
    const updatedDate = new Date(result.Item.updatedAt);
    
    return order;
  }

  async update(id: string, order: OrderEntity): Promise<OrderEntity> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'SET customerId = :customerId, productId = :productId, quantity = :quantity, status = :status, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':customerId': order.customerId,
        ':productId': order.productId,
        ':quantity': order.quantity,
        ':status': order.status,
        ':updatedAt': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    });

    const result: UpdateCommandOutput = await this.docClient.send(command);
    
    if (!result.Attributes) {
      throw new Error('Failed to update order');
    }

    return this.mapToOrderEntity(result.Attributes);
  }

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
      ConditionExpression: 'attribute_exists(id)',
    });

    await this.docClient.send(command);
  }
}

// === ARCHIVO: app/src/infrastructure/controllers/order.controller.ts ===
import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { UpdateOrderDto } from '../../application/dtos/update-order.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderNotFoundException } from '../../exceptions/order-not-found.exception';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created', type: OrderEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: CreateOrderDto })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    if (!createOrderDto.customerId || !createOrderDto.productId || !createOrderDto.quantity) {
      throw new BadRequestException('customerId, productId and quantity are required');
    }

    if (createOrderDto.quantity <= 0) {
      throw new BadRequestException('quantity must be greater than 0');
    }

    const order = await this.orderService.createOrder(createOrderDto);
    return order;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found', type: OrderEntity })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<OrderEntity> {
    const order = await this.orderService.getOrder(id);
    
    if (!order) {
      throw new OrderNotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order' })
  @ApiResponse({ status: 200, description: 'Order successfully updated', type: OrderEntity })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  @ApiBody({ type: UpdateOrderDto })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    try {
      const order = await this.orderService.updateOrder(id, updateOrderDto);
      return order;
    } catch (error) {
      if (error instanceof OrderNotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update order');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 204, description: 'Order successfully deleted' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.orderService.deleteOrder(id);
    } catch (error) {
      if (error instanceof OrderNotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete order');
    }
  }
}

// === ARCHIVO: app/src/exceptions/order-not-found.exception.ts ===
import { HttpException, HttpStatus, ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';

export class OrderNotFoundException extends HttpException {
  private readonly orderId: string;
  private readonly logger = new Logger(OrderNotFoundException.name);

  constructor(orderId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Orden con ID ${orderId} no encontrada`,
        error: 'NOT_FOUND',
        orderId,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.NOT_FOUND,
    );
    this.orderId = orderId;
    this.logger.warn(`OrderNotFoundException thrown for orderId: ${orderId}`);
  }

  getOrderId(): string {
    return this.orderId;
  }
}

@Catch(OrderNotFoundException)
export class OrderNotFoundExceptionFilter implements ExceptionFilter<OrderNotFoundException> {
  private readonly logger = new Logger(OrderNotFoundExceptionFilter.name);

  catch(exception: OrderNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? (exceptionResponse as any).message
        : 'Order not found',
      orderId: exception.getOrderId(),
    };

    this.logger.error(
      `Orden no encontrada - ID: ${exception.getOrderId()} | URL: ${request.url} | Método: ${request.method}`,
      exception.stack,
    );

    response.status(status).json(errorResponse);
  }
}

export class OrderAlreadyExistsException extends HttpException {
  private readonly orderId: string;

  constructor(orderId: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `Orden con ID ${orderId} ya existe`,
        error: 'CONFLICT',
        orderId,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.CONFLICT,
    );
    this.orderId = orderId;
  }

  getOrderId(): string {
    return this.orderId;
  }
}

export class InvalidOrderDataException extends HttpException {
  constructor(message: string, validationErrors?: any) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: message || 'Datos de orden inválidos',
        error: 'BAD_REQUEST',
        validationErrors,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class DatabaseOperationException extends HttpException {
  constructor(operation: string, originalError?: any) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error en la operación de base de datos: ${operation}`,
        error: 'INTERNAL_SERVER_ERROR',
        operation,
        originalError: originalError?.message || originalError,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

// === ARCHIVO: app/src/exceptions/order-not-found-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { OrderNotFoundException } from './order-not-found.exception';

@Catch(OrderNotFoundException)
export class OrderNotFoundExceptionFilter implements ExceptionFilter<OrderNotFoundException> {
  private readonly logger = new Logger(OrderNotFoundExceptionFilter.name);

  catch(exception: OrderNotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const orderId = exception.getOrderId();

    this.logger.error(
      `Orden no encontrada - ID: ${orderId}, Ruta: ${request.url}, Método: ${request.method}`,
      exception.stack,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: `La orden con ID '${orderId}' no fue encontrada en el sistema`,
      error: 'Not Found',
      orderId: orderId,
    });
  }
}

// === ARCHIVO: infra/providers.tf ===
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.47.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "Terraform"
    }
  }
}

# Configuración adicional para manejar throughput y escalabilidad
locals {
  read_capacity  = var.read_capacity != null ? var.read_capacity : 1000
  write_capacity = var.write_capacity != null ? var.write_capacity : 1000
  table_name     = var.table_name != "" ? var.table_name : "orders-table"
}

# Validación de variables críticas para garantizar el throughput requerido
locals {
  validate_capacity = (
    local.read_capacity >= 1000 &&
    local.write_capacity >= 1000 &&
    local.read_capacity <= 40000 &&
    local.write_capacity <= 40000
  )
}

# Módulo para la tabla DynamoDB con configuración de throughput
module "dynamodb_table" {
  source = "./modules/dynamodb"

  table_name           = local.table_name
  read_capacity        = local.read_capacity
  write_capacity       = local.write_capacity
  hash_key             = var.hash_key
  range_key            = var.range_key
  billing_mode         = var.billing_mode
  stream_enabled       = var.stream_enabled
  stream_view_type     = var.stream_view_type
  ttl_attribute_name   = var.ttl_attribute_name
  tags                 = var.tags
  global_secondary_indexes = var.global_secondary_indexes
}

# Outputs para otros componentes que necesiten referenciar la tabla
output "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = module.dynamodb_table.dynamodb_table_arn
}

output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = module.dynamodb_table.dynamodb_table_name
}

// === ARCHIVO: infra/variables.tf ===
variable "aws_region" {
  description = "Región de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetado de recursos"
  type        = string
  default     = "orders-system"
}

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
  default     = "orders-table"
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada para la tabla DynamoDB"
  type        = number
  default     = 1000

  validation {
    condition     = var.read_capacity >= 1000 && var.read_capacity <= 40000
    error_message = "La capacidad de lectura debe estar entre 1000 y 40000 unidades."
  }
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada para la tabla DynamoDB"
  type        = number
  default     = 1000

  validation {
    condition     = var.write_capacity >= 1000 && var.write_capacity <= 40000
    error_message = "La capacidad de escritura debe estar entre 1000 y 40000 unidades."
  }
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
  default     = "order_id"
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB"
  type        = string
  default     = null
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PROVISIONED"

  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST."
  }
}

variable "stream_enabled" {
  description = "Habilita el stream de DynamoDB para capturar cambios en los datos"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null

  validation {
    condition     = var.stream_view_type == null ? true : contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "El tipo de vista del stream debe ser KEYS_ONLY, NEW_IMAGE, OLD_IMAGE o NEW_AND_OLD_IMAGES."
  }
}

variable "ttl_attribute_name" {
  description = "Nombre del atributo que DynamoDB usará para TTL"
  type        = string
  default     = null
}

variable "tags" {
  description = "Etiquetas adicionales para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    write_capacity     = number
    read_capacity      = number
    projection_type    = string
    non_key_attributes = list(string)
  }))
  default = []
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada para la tabla DynamoDB"
  type        = number
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada para la tabla DynamoDB"
  type        = number
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB"
  type        = string
  default     = null
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PROVISIONED"
}

variable "stream_enabled" {
  description = "Habilita el stream de DynamoDB para capturar cambios en los datos"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null
}

variable "ttl_attribute_name" {
  description = "Nombre del atributo que DynamoDB usará para TTL"
  type        = string
  default     = null
}

variable "tags" {
  description = "Etiquetas para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    write_capacity     = number
    read_capacity      = number
    projection_type    = string
    non_key_attributes = list(string)
  }))
  default = []
}

# Validación de índices secundarios para garantizar consistencia
locals {
  validate_gsi = alltrue([
    for gsi in var.global_secondary_indexes : (
      contains(["KEYS_ONLY", "INCLUDE", "ALL"], gsi.projection_type) &&
      gsi.read_capacity >= 1 &&
      gsi.write_capacity >= 1
    )
  ])
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.47.0"
    }
  }
}

# Configuración del proveedor AWS con región por defecto
# El proveedor se configura automáticamente desde variables de entorno:
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY
# - AWS_REGION (por defecto us-east-1)
#
# También es posible configurar credenciales desde ~/.aws/credentials
# o mediante IAM roles en entornos de AWS (EC2, Lambda, ECS, etc.)
#
# Para validar la configuración del provider antes de aplicar:
#   terraform validate
#   terraform plan
#
# El provider AWS 5.47.0 es la versión estable recomendada para
# producción y soporta todos los recursos de DynamoDB necesarios

// === ARCHIVO: infra/README.md ===
# Módulo de Infraestructura - AWS DynamoDB

## Propósito

Este módulo define la infraestructura base para el sistema de gestión de órdenes, específicamente la tabla de DynamoDB necesaria para almacenar las órdenes con capacidad de manejar 1000 órdenes por segundo.

## Recursos definidos

### Tabla DynamoDB
- **Nombre**: `ordenes` (configurable via variable)
- **Clave de partición**: `id` (String)
- **Modo de facturación**: PAY_PER_REQUEST para оптимизация de costos en cargas variables
- **Capacidad**: Configurada para soportar hasta 1000 operaciones por segundo
- **Cifrado**: AWS managed KMS key por defecto

## Uso del módulo

```hcl
module "infra" {
  source = "./infra"

  environment = "dev"
  table_name  = "ordenes"
}
```

## Variables requeridas

| Variable | Descripción | Tipo |
|----------|-------------|------|
| `environment` | Entorno de despliegue (dev, staging, prod) | string |
| `table_name` | Nombre de la tabla DynamoDB | string |

## Validación local

Para validar la configuración de Terraform:

```bash
# Inicializar Terraform
cd infra
terraform init

# Validar sintaxis
terraform validate

# Ver plan de recursos
terraform plan
```

## Requisitos

- Terraform >= 1.9.0
- AWS Provider 5.47.0
- Credenciales de AWS configuradas localmente

## Tags estándar

Todos los recursos incluyen tags para identificación y costing:
- `Environment`: Entorno de despliegue
- `Project`: Proyecto al que pertenece
- `ManagedBy`: Herramienta de gestión (terraform)

// === ARCHIVO: infra/main.tf ===
# Configuración principal del provider AWS
#
# Este archivo define el provider de AWS que será utilizado por todos
# los módulos y recursos de infraestructura. La configuración del
# provider se delega al archivo providers.tf para permitir overrides
# por entorno.
#
# El provider AWS en versión 5.47.0 incluye soporte completo para:
# - DynamoDB con PAY_PER_REQUEST y provisioned capacity
# - Server-side encryption con KMS
# - Time-to-live (TTL) para atributos
# - Global Secondary Indexes (GSI)
# - Point-in-time recovery
#
# La región por defecto es us-east-1 pero puede sobrescribirse
# mediante variables de entorno o mediante el archivo providers.tf

provider "aws" {
  alias  = "primary"

  # La región se configura a través de la variable de entorno
  # AWS_REGION o se puede especificar directamente aquí
  # region = var.aws_region

  # Configuración de endpoints para desarrollo local con LocalStack
  # Descomenta las siguientes líneas si usas LocalStack para pruebas:
  # endpoints {
  #   dynamodb = "http://localhost:4566"
  # }

  # Configuración de retry para operaciones que pueden fallar
  # temporalmente (throttling, timeouts, etc.)
  max_retries = 3

  # Habilitar modo de acceso para recursos de inferencia de Terraform
  # Si se usa Terraform Cloud o Sentinel, descomenta:
  # skip_credentials_validation = false
  # skip_requesting_account_id  = false
  # skip_metadata_api_check     = true
}

# Alias de provider para región secundaria (opcional para DR)
# Descomenta si necesitas replicación entre regiones:
# provider "aws" {
#   alias   = "secondary"
#   region  = "us-west-2"
#   max_retries = 3
# }

# Configuración de terraform remote state
# Descomenta si usas S3 como backend para el estado de Terraform:
# terraform {
#   backend "s3" {
#     bucket         = "terraform-state-bucket"
#     key            = "infra/terraform.tfstate"
#     region         = "us-east-1"
#     encrypt        = true
#     dynamodb_table = "terraform-locks"
#   }
# }

# Tags globales que se aplicarán a todos los recursos
# que soportan etiquetado. Esta configuración se combina
# con los tags específicos de cada recurso.
locals {
  common_tags = {
    Project     = "ordenes-system"
    ManagedBy   = "terraform"
    Environment = var.environment
    # Añade más tags según las políticas de tu organización
    # CostCenter = "engineering"
    # Owner       = "platform-team"
  }
}

# Resource: aws_dynamodb_table
#
# Define la tabla de DynamoDB para almacenar las órdenes del sistema.
# La tabla está configurada para manejar hasta 1000 órdenes por segundo
# utilizando el modo de facturación PAY_PER_REQUEST que ajusta la
# capacidad automáticamente según la demanda.
#
# Atributos de la tabla:
# - id: Identificador único de la orden (PK)
# - cliente: Identificador del cliente que realizó la orden
# - producto: Identificador del producto ordenado
# - cantidad: Cantidad de productos en la orden
# - estado: Estado de la orden (pendiente, procesada, cancelada, completada)
# - created_at: Timestamp de creación de la orden
# - updated_at: Timestamp de última actualización
#
# La tabla incluye point-in-time recovery para desastres y
# server-side encryption con clave gestionada por AWS.

resource "aws_dynamodb_table" "ordenes" {
  name           = var.table_name
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  stream_enabled = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "id"
    type = "S"
  }

  # Índice secundario global para consulta por cliente
  # Permite buscar todas las órdenes de un cliente específico
  global_secondary_index {
    name            = "cliente-index"
    hash_key        = "cliente"
    projection_type = "ALL"
    # El throughput se configura automáticamente con PAY_PER_REQUEST
  }

  # Índice secundario global para consulta por estado
  # Permite buscar todas las órdenes con un estado específico
  global_secondary_index {
    name            = "estado-index"
    hash_key        = "estado"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  ttl {
    attribute_name = "ttl"
    enabled        = false # Habilitar si se necesita expiración automática
  }

  tags = merge(local.common_tags, {
    Name = "${var.table_name}-dynamodb-table"
  })

  lifecycle {
    # Prevent accidental destruction of the table
    prevent_destroy = true
    # Ignorar cambios en el atributo de streaming que Terraform
    # detecta como cambio pero no afecta la funcionalidad
    ignore_changes = [stream_specification]
  }
}

# Resource: aws_dynamodb_table_item (opcional - para datos iniciales)
#
# Este recurso permite insertar datos iniciales de prueba.
# Descomenta y configura si necesitas datos de ejemplo.
#
# resource "aws_dynamodb_table_item" "example_order" {
#   table_name = aws_dynamodb_table.ordenes.name
#   hash_key   = aws_dynamodb_table.ordenes.id
#
#   item = jsonencode({
#     id        = { S = "ORD-001" }
#     cliente   = { S = "CLI-001" }
#     producto  = { S = "PROD-001" }
#     cantidad  = { N = "5" }
#     estado    = { S = "pendiente" }
#     created_at = { N = "1699900000" }
#     updated_at = { N = "1699900000" }
#   })
# }

# Output: table_name
# Nombre de la tabla DynamoDB creada
output "table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.ordenes.name
}

# Output: table_arn
# ARN de la tabla para permisos IAM y referencias cruzadas
output "table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.ordenes.arn
}

# Output: table_id
# ID único de la tabla (necesario para algunas operaciones)
output "table_id" {
  description = "ID de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.ordenes.id
}

# Output: stream_arn
# ARN del stream de DynamoDB para capturar cambios en tiempo real
output "stream_arn" {
  description = "ARN del stream de DynamoDB para la tabla de órdenes"
  value       = aws_dynamodb_table.ordenes.stream_arn
}

# Output: endpoint
# Endpoint de DynamoDB para la región configurada
output "endpoint" {
  description = "Endpoint de DynamoDB para la tabla de órdenes"
  value       = "https://dynamodb.${var.aws_region}.amazonaws.com"
}

// === ARCHIVO: infra/outputs.tf ===
# Salidas de Terraform con los valores necesarios para la aplicación
# Estos valores son consumidos por otros componentes del proyecto

output "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.orders_table_arn
}

output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.orders_table_name
}

output "dynamodb_table_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB para captura de cambios"
  value       = module.dynamodb.orders_table_stream_arn
  sensitive   = false
}

output "dynamodb_endpoint" {
  description = "Endpoint de la tabla DynamoDB (útil para testing local con DynamoDB Local)"
  value       = "https://dynamodb.${var.aws_region}.amazonaws.com"
}

output "table_region" {
  description = "Región donde está desplegada la tabla DynamoDB"
  value       = var.aws_region
}

output "table_tags" {
  description = "Etiquetas aplicadas a la tabla DynamoDB"
  value       = var.tags
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Variables específicas del ambiente de desarrollo
# Estas variables sobrescriben los valores por defecto definidos en variables.tf

# Configuración del ambiente
environment = "dev"

# Región de AWS para el ambiente de desarrollo
aws_region = "us-east-1"

# Nombre base para los recursos
project_name = "orders-system"

# Configuración de la tabla DynamoDB
table_name             = "orders-dev"
read_capacity_units    = 20
write_capacity_units   = 20

# Habilitar eliminación de recursos en destroy
enable_deletion_protection = false

# Configuración de etiquetas para el ambiente
tags = {
  Environment = "dev"
  Project     = "orders-system"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
  Team        = "backend"
}

# Configuración de características adicionales
enable_point_in_time_recovery = false
enable_streams                = true
stream_view_type              = "NEW_AND_OLD_IMAGES"

# Configuración de capacidad bajo demanda
billing_mode = "PAY_PER_REQUEST"

# Configuración de TTL para limpieza automática
enable_ttl      = true
ttl_attribute   = "expiresAt"
ttl_days        = 90

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
resource "aws_dynamodb_table" "orders" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.partition_key
  range_key      = var.sort_key

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.gsi
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = lookup(global_secondary_index.value, "range_key", null)
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = var.read_capacity
      write_capacity  = var.write_capacity
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.lsi
    content {
      name       = local_secondary_index.value.name
      range_key  = local_secondary_index.value.range_key
      projection_type = "KEYS_ONLY"
    }
  }

  point_in_time_recovery {
    enabled = var.point_in_time_recovery
  }

  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  ttl {
    attribute_name = var.ttl_attribute
    enabled        = var.ttl_enabled
  }

  tags = merge(
    var.common_tags,
    {
      "Name"        = var.table_name
      "Environment" = var.environment
      "Purpose"     = "orders-crud"
    }
  )

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_dynamodb_table_revision" "main" {
  count = var.enable_streams ? 1 : 0

  table_name = aws_dynamodb_table.orders.name

  stream_specification {
    stream_enabled   = true
    stream_view_type = var.stream_view_type
  }
}

resource "aws_appautoscaling_target" "orders_read_target" {
  count = var.enable_autoscaling ? 1 : 0

  max_capacity       = var.autoscaling_max_read_capacity
  min_capacity       = var.autoscaling_min_read_capacity
  resource_id        = "table/${var.table_name}"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "orders_read_policy" {
  count = var.enable_autoscaling ? 1 : 0

  name                   = "orders-read-scaling-policy"
  policy_type            = "TargetTrackingScaling"
  resource_id            = "table/${var.table_name}"
  scalable_dimension     = "dynamodb:table:ReadCapacityUnits"
  service_namespace      = "dynamodb"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }

    target_value = var.autoscaling_target_read_utilization
  }
}

resource "aws_appautoscaling_target" "orders_write_target" {
  count = var.enable_autoscaling ? 1 : 0

  max_capacity       = var.autoscaling_max_write_capacity
  min_capacity       = var.autoscaling_min_write_capacity
  resource_id        = "table/${var.table_name}"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "orders_write_policy" {
  count = var.enable_autoscaling ? 1 : 0

  name                   = "orders-write-scaling-policy"
  policy_type            = "TargetTrackingScaling"
  resource_id            = "table/${var.table_name}"
  scalable_dimension     = "dynamodb:table:WriteCapacityUnits"
  service_namespace      = "dynamodb"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }

    target_value = var.autoscaling_target_write_utilization
  }
}

resource "aws_cloudwatch_metric_alarm" "orders_read_throttle" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-read-throttle-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ReadThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "0"
  alarm_description   = "Este alarm detecta cuando hay eventos de throttling en lecturas de la tabla de ordenes"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = var.table_name
  }
}

resource "aws_cloudwatch_metric_alarm" "orders_write_throttle" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-write-throttle-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "WriteThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "0"
  alarm_description   = "Este alarm detecta cuando hay eventos de throttling en escrituras de la tabla de ordenes"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = var.table_name
  }
}

resource "aws_cloudwatch_metric_alarm" "orders_consumed_read_capacity" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-consumed-read-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedReadCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Maximum"
  threshold           = var.alarm_read_capacity_threshold
  alarm_description   = "Alarm que se dispara cuando el consumo de capacidad de lectura supera el umbral configurado"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = var.table_name
  }
}

resource "aws_cloudwatch_metric_alarm" "orders_consumed_write_capacity" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-consumed-write-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedWriteCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Maximum"
  threshold           = var.alarm_write_capacity_threshold
  alarm_description   = "Alarm que se dispara cuando el consumo de capacidad de escritura supera el umbral configurado"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = var.table_name
  }
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
output "table_name" {
  description = "Nombre de la tabla DynamoDB de ordenes"
  value       = aws_dynamodb_table.orders.name
}

output "table_arn" {
  description = "ARN completo de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.arn
}

output "table_id" {
  description = "Identificador unico de la tabla"
  value       = aws_dynamodb_table.orders.id
}

output "table_stream_arn" {
  description = "ARN del stream de DynamoDB si esta habilitado"
  value       = try(aws_dynamodb_table_revision.main[0].stream_arn, null)
}

output "table_stream_label" {
  description = "Etiqueta del stream de DynamoDB"
  value       = try(aws_dynamodb_table_revision.main[0].stream_label, null)
}

output "partition_key_name" {
  description = "Nombre de la clave de particion"
  value       = var.partition_key
}

output "sort_key_name" {
  description = "Nombre de la clave de ordenamiento"
  value       = var.sort_key
}

output "global_secondary_indexes" {
  description = "Lista de indices secundarios globales configurados"
  value       = [for gsi in aws_dynamodb_table.orders.global_secondary_index : gsi.name]
}

output "local_secondary_indexes" {
  description = "Lista de indices secundarios locales configurados"
  value       = [for lsi in aws_dynamodb_table.orders.local_secondary_index : lsi.name]
}

output "read_capacity" {
  description = "Capacidad de lectura aprovisionada"
  value       = var.read_capacity
}

output "write_capacity" {
  description = "Capacidad de escritura aprovisionada"
  value       = var.write_capacity
}

output "billing_mode" {
  description = "Modo de facturacion de la tabla"
  value       = var.billing_mode
}

output "point_in_time_recovery_enabled" {
  description = "Indica si la recuperacion point-in-time esta habilitada"
  value       = var.point_in_time_recovery
}

output "server_side_encryption_enabled" {
  description = "Indica si el cifrado del lado del servidor esta habilitado"
  value       = var.server_side_encryption
}

output "kms_key_arn" {
  description = "ARN de la clave KMS utilizada para el cifrado"
  value       = var.kms_key_arn
}

output "autoscaling_read_target_arn" {
  description = "ARN del target de autoscaling para lectura"
  value       = try(aws_appautoscaling_target.orders_read_target[0].arn, null)
}

output "autoscaling_write_target_arn" {
  description = "ARN del target de autoscaling para escritura"
  value       = try(aws_appautoscaling_target.orders_write_target[0].arn, null)
}

output "table_endpoint" {
  description = "Endpoint de la tabla DynamoDB para conexiones directas"
  value       = "https://dynamodb.${var.region}.amazonaws.com"
}

output "table_items_count" {
  description = "Numero de items en la tabla (aproximado)"
  value       = try(aws_dynamodb_table.orders.item_count, 0)
}

output "table_size_bytes" {
  description = "Tamano de la tabla en bytes"
  value       = try(aws_dynamodb_table.orders.table_size_bytes, 0)
}

output "environment" {
  description = "Entorno donde esta desplegada la tabla"
  value       = var.environment
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
