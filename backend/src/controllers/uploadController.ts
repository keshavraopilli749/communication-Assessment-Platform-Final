import { Request, Response } from 'express';
import { ResponseHelper } from '../utils/response';
import path from 'path';
import fs from 'fs';

export class UploadController {
  // Handle file upload
  static async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        ResponseHelper.error(res, 'No file uploaded', 400);
        return;
      }

      const file = req.file;
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const fileUrl = `${baseUrl}/uploads/${file.filename}`;

      ResponseHelper.success(res, { url: fileUrl }, 'File uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      ResponseHelper.error(res, 'Failed to upload file');
    }
  }

  // Get uploaded file
  static async getFile(req: Request, res: Response): Promise<void> {
    try {
      const { filename } = req.params;
      const filePath = path.join(process.cwd(), 'uploads', filename);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        ResponseHelper.notFound(res, 'File not found');
        return;
      }

      // Set appropriate headers for audio/video files
      const ext = path.extname(filename).toLowerCase();
      if (['.mp3', '.wav', '.m4a', '.ogg'].includes(ext)) {
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Accept-Ranges', 'bytes');
      } else if (['.mp4', '.webm', '.avi'].includes(ext)) {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
      }

      // Send file
      res.sendFile(filePath);
    } catch (error) {
      console.error('Get file error:', error);
      ResponseHelper.error(res, 'Failed to retrieve file');
    }
  }
}
