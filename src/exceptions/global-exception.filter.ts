import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'INTERNAL_SERVER_ERROR';

    // Handle HTTP Exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message;
    }

    // Handle Prisma Known Request Errors
    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': {
          status = HttpStatus.CONFLICT;
          message = 'Unique constraint violation';
          break;
        }
        default: {
          status = HttpStatus.BAD_REQUEST;
          message = exception.message.replace(/\n/g, '');
        }
      }
    }

    // Handle Validation Errors
    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      const validationErrors =
        (exceptionResponse as any).message instanceof Array
          ? (exceptionResponse as any).message
          : [exceptionResponse];

      status = HttpStatus.BAD_REQUEST;
      message = validationErrors[0];
    }

    // Fallback for unhandled exceptions
    response.status(status).json({
      status: 'error',
      statusCode: status,
      message,
    });
  }
}
