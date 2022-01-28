import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
export interface Response<T> {
  data: T;
}

export class RespSuccessInteceptor<T> implements NestInterceptor<T, Response<T>> {
  private getData(data: any) {
    if (!!data) {
      return data;
    }
    return {};
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        meta: {
          code: 200,
          msg: "success",
        },
        data: this.getData(data),
        error: "",
      })),
    );
  }
}
