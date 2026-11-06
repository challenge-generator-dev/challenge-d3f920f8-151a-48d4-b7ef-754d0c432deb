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