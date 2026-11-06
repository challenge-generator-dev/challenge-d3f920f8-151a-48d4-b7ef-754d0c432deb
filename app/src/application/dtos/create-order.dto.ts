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