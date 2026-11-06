import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderEntity, OrderStatus } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<OrderEntity> {
    if (!dto.customerId || !dto.productId || !dto.quantity) {
      throw new BadRequestException('Los campos customerId, productId y quantity son obligatorios');
    }

    if (dto.quantity <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor que cero');
    }

    const order = new OrderEntity(dto.customerId, dto.productId, dto.quantity);
    return await this.orderRepository.create(order);
  }

  async getOrder(id: string): Promise<OrderEntity> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID de la orden es obligatorio');
    }

    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    return order;
  }

  async updateOrder(id: string, dto: UpdateOrderDto): Promise<OrderEntity> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID de la orden es obligatorio');
    }

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    if (dto.customerId !== undefined) {
      existingOrder.customerId = dto.customerId;
    }

    if (dto.productId !== undefined) {
      existingOrder.productId = dto.productId;
    }

    if (dto.quantity !== undefined) {
      if (dto.quantity <= 0) {
        throw new BadRequestException('La cantidad debe ser mayor que cero');
      }
      existingOrder.quantity = dto.quantity;
    }

    if (dto.status !== undefined) {
      this.validateStatusTransition(existingOrder.status, dto.status);
      existingOrder.updateStatus(dto.status);
    }

    return await this.orderRepository.update(id, existingOrder);
  }

  async deleteOrder(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID de la orden es obligatorio');
    }

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    await this.orderRepository.delete(id);
  }

  private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): void {
    const invalidTransitions: Record<OrderStatus, OrderStatus[]> = {
      DELIVERED: ['PENDING', 'PROCESSING', 'SHIPPED'],
      CANCELLED: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'],
      SHIPPED: ['PENDING', 'PROCESSING'],
      PROCESSING: ['PENDING'],
      PENDING: [],
    };

    if (invalidTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `No se puede transicionar de ${currentStatus} a ${newStatus}`,
      );
    }
  }
}