import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { UpdateOrderDto } from '../../application/dtos/update-order.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderNotFoundException } from '../../exceptions/order-not-found.exception';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created', type: OrderEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: CreateOrderDto })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    if (!createOrderDto.customerId || !createOrderDto.productId || !createOrderDto.quantity) {
      throw new BadRequestException('customerId, productId and quantity are required');
    }

    if (createOrderDto.quantity <= 0) {
      throw new BadRequestException('quantity must be greater than 0');
    }

    const order = await this.orderService.createOrder(createOrderDto);
    return order;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found', type: OrderEntity })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<OrderEntity> {
    const order = await this.orderService.getOrder(id);
    
    if (!order) {
      throw new OrderNotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order' })
  @ApiResponse({ status: 200, description: 'Order successfully updated', type: OrderEntity })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  @ApiBody({ type: UpdateOrderDto })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    try {
      const order = await this.orderService.updateOrder(id, updateOrderDto);
      return order;
    } catch (error) {
      if (error instanceof OrderNotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update order');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 204, description: 'Order successfully deleted' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.orderService.deleteOrder(id);
    } catch (error) {
      if (error instanceof OrderNotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete order');
    }
  }
}