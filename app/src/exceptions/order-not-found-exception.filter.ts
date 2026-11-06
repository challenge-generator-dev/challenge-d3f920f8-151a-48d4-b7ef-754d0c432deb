import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { OrderNotFoundException } from './order-not-found.exception';

@Catch(OrderNotFoundException)
export class OrderNotFoundExceptionFilter implements ExceptionFilter<OrderNotFoundException> {
  private readonly logger = new Logger(OrderNotFoundExceptionFilter.name);

  catch(exception: OrderNotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const orderId = exception.getOrderId();

    this.logger.error(
      `Orden no encontrada - ID: ${orderId}, Ruta: ${request.url}, Método: ${request.method}`,
      exception.stack,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: `La orden con ID '${orderId}' no fue encontrada en el sistema`,
      error: 'Not Found',
      orderId: orderId,
    });
  }
}