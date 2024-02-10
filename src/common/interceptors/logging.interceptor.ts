import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import winston, { createLogger, transports, format } from 'winston';
import * as path from 'path';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: winston.Logger;

  constructor() {
    const logsPath = path.join('logs', 'success.log');
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
      ),
      transports: [new transports.File({ filename: logsPath })],
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logging(context, start);
      }),
    );
  }

  logging(context: ExecutionContext, start: number) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const httpMethod = request.method;
    const URL = request.url;
    const statusCode = response.statusCode;
    const ip = request.ip;
    const userAgent = request.get('User-Agent');
    const responseTime = Date.now() - start;

    const logMessage = `${httpMethod} ${URL} ${statusCode} responseTime: ${responseTime}ms ip:${ip} using ${userAgent}`;

    this.logger.info({ logMessage });
  }
}
