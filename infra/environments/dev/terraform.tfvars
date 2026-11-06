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