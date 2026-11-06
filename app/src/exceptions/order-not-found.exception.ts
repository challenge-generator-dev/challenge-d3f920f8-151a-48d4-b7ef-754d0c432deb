import { HttpException, HttpStatus, ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';

export class OrderNotFoundException extends HttpException {
  private readonly orderId: string;
  private readonly logger = new Logger(OrderNotFoundException.name);

  constructor(orderId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Orden con ID ${orderId} no encontrada`,
        error: 'NOT_FOUND',
        orderId,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.NOT_FOUND,
    );
    this.orderId = orderId;
    this.logger.warn(`OrderNotFoundException thrown for orderId: ${orderId}`);
  }

  getOrderId(): string {
    return this.orderId;
  }
}

@Catch(OrderNotFoundException)
export class OrderNotFoundExceptionFilter implements ExceptionFilter<OrderNotFoundException> {
  private readonly logger = new Logger(OrderNotFoundExceptionFilter.name);

  catch(exception: OrderNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? (exceptionResponse as any).message
        : 'Order not found',
      orderId: exception.getOrderId(),
    };

    this.logger.error(
      `Orden no encontrada - ID: ${exception.getOrderId()} | URL: ${request.url} | Método: ${request.method}`,
      exception.stack,
    );

    response.status(status).json(errorResponse);
  }
}

export class OrderAlreadyExistsException extends HttpException {
  private readonly orderId: string;

  constructor(orderId: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `Orden con ID ${orderId} ya existe`,
        error: 'CONFLICT',
        orderId,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.CONFLICT,
    );
    this.orderId = orderId;
  }

  getOrderId(): string {
    return this.orderId;
  }
}

export class InvalidOrderDataException extends HttpException {
  constructor(message: string, validationErrors?: any) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: message || 'Datos de orden inválidos',
        error: 'BAD_REQUEST',
        validationErrors,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class DatabaseOperationException extends HttpException {
  constructor(operation: string, originalError?: any) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error en la operación de base de datos: ${operation}`,
        error: 'INTERNAL_SERVER_ERROR',
        operation,
        originalError: originalError?.message || originalError,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}