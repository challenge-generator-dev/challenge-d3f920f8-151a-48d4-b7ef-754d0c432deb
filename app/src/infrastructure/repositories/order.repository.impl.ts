import { Injectable, Inject } from '@nestjs/common';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, DeleteCommandOutput, GetCommandOutput, PutCommandOutput, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderEntity, OrderStatus } from '../../domain/entities/order.entity';
import { DYNAMODB_TABLE_NAME, dynamoDBDocumentClient } from '../../config/dynamodb.config';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  private readonly tableName: string;

  constructor(
    @Inject(dynamoDBDocumentClient)
    private readonly docClient: DynamoDBDocumentClient,
  ) {
    this.tableName = DYNAMODB_TABLE_NAME;
  }

  private mapToOrderEntity(item: Record<string, any>): OrderEntity {
    const order = new OrderEntity(
      item.customerId,
      item.productId,
      item.quantity,
    );
    order.customerId = item.customerId;
    order.productId = item.productId;
    order.quantity = item.quantity;
    order.status = item.status as OrderStatus;
    return order;
  }

  private toDynamoDBItem(order: OrderEntity): Record<string, any> {
    return {
      id: order.id,
      customerId: order.customerId,
      productId: order.productId,
      quantity: order.quantity,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: this.toDynamoDBItem(order),
      ConditionExpression: 'attribute_not_exists(id)',
    });

    await this.docClient.send(command);
    return order;
  }

  async findById(id: string): Promise<OrderEntity | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result: GetCommandOutput = await this.docClient.send(command);
    
    if (!result.Item) {
      return null;
    }

    const order = this.mapToOrderEntity(result.Item);
    const originalDate = new Date(result.Item.createdAt);
    const updatedDate = new Date(result.Item.updatedAt);
    
    return order;
  }

  async update(id: string, order: OrderEntity): Promise<OrderEntity> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'SET customerId = :customerId, productId = :productId, quantity = :quantity, status = :status, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':customerId': order.customerId,
        ':productId': order.productId,
        ':quantity': order.quantity,
        ':status': order.status,
        ':updatedAt': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    });

    const result: UpdateCommandOutput = await this.docClient.send(command);
    
    if (!result.Attributes) {
      throw new Error('Failed to update order');
    }

    return this.mapToOrderEntity(result.Attributes);
  }

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
      ConditionExpression: 'attribute_exists(id)',
    });

    await this.docClient.send(command);
  }
}