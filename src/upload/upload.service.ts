import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UploadService {
  private readonly allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Updated allowed types
  private readonly maxSize = 5 * 1024 * 1024; // 5 MB

  handleUpload(file: Express.Multer.File) {
    this.validateFile(file);
    // Additional logic such as saving file details to a database can be added here
    return { message: 'File uploaded successfully!', file };
  }

  private validateFile(file: Express.Multer.File) {
    if (!this.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(`Unsupported file type: ${file.mimetype}`);
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(`File size exceeds the limit of ${this.maxSize / (1024 * 1024)} MB`);
    }
  }
}
