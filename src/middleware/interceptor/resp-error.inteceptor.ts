import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class respErrorInteceptor implements ExceptionFilter {
  constructor() {}

  /**
   * Get Incomplete/error form validation message
   * @param exception
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let message = exception.message;

    response.status(status).json({
      meta: {
        code: status,
        msg: message,
      },
      data: {},
      error: message,
    });
  }
}
