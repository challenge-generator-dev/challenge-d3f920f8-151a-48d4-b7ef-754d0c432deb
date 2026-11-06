import { Module, Logger } from '@nestjs/common';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderService } from './application/services/order.service';
import { OrderRepository } from './domain/repositories/order.repository';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { getDynamoDBClient, getDynamoDBDocumentClient } from './config/dynamodb.config';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: OrderRepository,
      useFactory: () => {
        const docClient = getDynamoDBDocumentClient();
        const tableName = process.env.DYNAMODB_TABLE_ORDERS || 'orders';
        const logger = new Logger('OrderRepository');
        return new OrderRepositoryImpl(docClient, tableName, logger);
      },
    },
    {
      provide: 'DYNAMODB_CLIENT',
      useFactory: () => {
        return getDynamoDBClient();
      },
    },
    {
      provide: 'DYNAMODB_DOCUMENT_CLIENT',
      useFactory: () => {
        return getDynamoDBDocumentClient();
      },
    },
  ],
  exports: [OrderRepository],
})
export class AppModule {}