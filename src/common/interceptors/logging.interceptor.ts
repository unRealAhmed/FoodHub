import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.Logging(context, start);
      }),
    );
  }

  Logging(context: ExecutionContext, start: number) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const httpMethod = request.method;
    const URL = request.url;
    const statusCode = response.statusCode;
    const ip = request.ip;
    const userAgent = request.get('User-Agent');
    const responseTime = Date.now() - start;

    const logMessage = `${new Date().toISOString()} ${httpMethod} ${URL} ${statusCode} responseTime: ${responseTime}ms ip:${ip} using ${userAgent}`;

    return this.logger.log(logMessage);
  }
}
