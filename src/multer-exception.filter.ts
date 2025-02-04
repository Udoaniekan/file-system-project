import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { MulterError } from 'multer';

@Catch(MulterError)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.code === 'LIMIT_FILE_SIZE' ? 400 : 422;

    response
      .status(status)
      .json({
        message: exception.message || 'File upload failed',
        error: exception,
      });
  }
}
