import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export abstract class BaseActiveGuard implements CanActivate {
  constructor(private readonly i18n: I18nService) {}

  abstract getRequest(context: ExecutionContext);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = await this.getRequest(context);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.isActive) {
      throw new ForbiddenException(this.i18n.t('errors.user.deactivated'));
    }
    return true;
  }
}

@Injectable()
export class ActiveGuard extends BaseActiveGuard {
  async getRequest(context: ExecutionContext): Promise<Request> {
    return context.switchToHttp().getRequest();
  }
}

@Injectable()
export class ActiveGuardGraphql extends BaseActiveGuard {
  async getRequest(context: ExecutionContext): Promise<Request> {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
