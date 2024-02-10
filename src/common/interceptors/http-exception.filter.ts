import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: winston.Logger;

  constructor() {
    const logsPath = path.join('logs', 'error.log');
    this.logger = winston.createLogger({
      level: 'error',
      format: winston.format.json(),
      transports: [new winston.transports.File({ filename: logsPath })],
    });
  }

  catch(exception: any, host: ArgumentsHost) {
    const httpHost = host.switchToHttp();
    const request = httpHost.getRequest();
    const response = httpHost.getResponse();
    const httpMethod = request.method;
    const URL = request.url;
    const statusCode = response.statusCode;
    const ip = request.ip;
    const userAgent = request.get('User-Agent');

    const logMessage = `${httpMethod} ${URL} ${statusCode} responseTime: - ms ip:${ip} using ${userAgent}`;

    this.logger.error(logMessage, exception.stack);

    response.status(statusCode).json({
      statusCode: statusCode,
      message: exception.message,
      path: request.url,
    });
  }
}
