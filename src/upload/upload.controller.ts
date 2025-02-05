import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Catch, ExceptionFilter, ArgumentsHost, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('upload')
@Catch(BadRequestException)
export class UploadController implements ExceptionFilter {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return this.uploadService.handleUpload(file);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      throw new BadRequestException('File not found');
    }
  }

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
