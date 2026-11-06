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