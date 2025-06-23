import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

export function Serialize(dto: ClassConstructor<any>) {
  @Injectable()
  class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
      return next.handle().pipe(
        map((data: any) => {
          return plainToInstance(dto, data, {
            excludeExtraneousValues: true,
          });
        }),
      );
    }
  }

  return UseInterceptors(SerializeInterceptor);
}
