// import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
// import { Response } from 'express';
// import { MulterError } from 'multer';
// import { BadRequestException } from '@nestjs/common';

// @Catch(MulterError, BadRequestException)
// export class MulterExceptionFilter implements ExceptionFilter {
//   catch(exception: MulterError | BadRequestException, host: ArgumentsHost) {
//     const response = host.switchToHttp().getResponse<Response>();
//     const status =
//       exception instanceof MulterError
//         ? exception.code === 'LIMIT_FILE_SIZE'
//           ? 400
//           : 422
//         : 400; // Bad Request for other cases

//     response.status(status).json({
//       message:
//         exception instanceof MulterError
//           ? exception.message
//           : 'File upload failed, invalid request',
//       error: exception,
//     });
//   }
// }
