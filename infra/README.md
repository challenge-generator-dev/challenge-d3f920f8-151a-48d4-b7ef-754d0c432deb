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