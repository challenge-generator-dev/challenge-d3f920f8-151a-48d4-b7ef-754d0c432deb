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