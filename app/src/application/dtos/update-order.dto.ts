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