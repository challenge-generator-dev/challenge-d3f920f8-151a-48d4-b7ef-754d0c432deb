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