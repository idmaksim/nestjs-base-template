import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DecodeJwtPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
