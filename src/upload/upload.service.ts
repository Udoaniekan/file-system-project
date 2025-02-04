import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class UploadService {
  private readonly uploadPath = path.join(__dirname, '../../uploads');

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File) {
    try {
      const filePath = path.join(this.uploadPath, file.originalname);
      fs.writeFileSync(filePath, file.buffer);
      return { message: 'File uploaded successfully', fileName: file.originalname };
    } catch (error) {
      throw new Error('Failed to save the file');
    }
  }
}
