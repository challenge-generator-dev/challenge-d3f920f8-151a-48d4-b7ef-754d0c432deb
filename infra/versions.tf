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