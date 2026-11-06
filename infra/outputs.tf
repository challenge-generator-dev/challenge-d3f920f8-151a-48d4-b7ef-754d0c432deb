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