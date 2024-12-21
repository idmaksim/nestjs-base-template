import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const method = request.method;
    const url = request.url;
    const start = new Date();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.debug(
            `END [${method}] ${url} ${new Date().getTime() - start.getTime()}ms`,
          ),
        ),
      );
  }
}
