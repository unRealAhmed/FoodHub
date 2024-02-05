import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Paginate = createParamDecorator(
  (
    options: { defaultPage?: number; limit?: number } = {},
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();
    const page = parseInt(request.query?.page, 10) || options.defaultPage || 1;
    const limit = options.limit || 7;
    const skip = (page - 1) * limit;

    return {
      page,
      limit,
      skip,
    };
  },
);
