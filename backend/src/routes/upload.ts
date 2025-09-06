import { Router } from 'express';
import { UploadController } from '../controllers/uploadController';
import { requireAuth } from '../middleware/auth';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') // 10MB default
  },
  fileFilter: (req, file, cb) => {
    // Allow audio, video, and image files
    const allowedTypes = /jpeg|jpg|png|gif|mp3|mp4|wav|m4a|webm|ogg|avi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    // More flexible MIME type checking
    const allowedMimeTypes = [
      'audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/ogg',
      'video/mp4', 'video/webm', 'video/avi',
      'image/jpeg', 'image/png', 'image/gif'
    ];
    
    const mimetype = allowedMimeTypes.includes(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only audio, video, and image files are allowed'));
    }
  }
});

// Upload file
router.post('/',
  requireAuth,
  upload.single('file'),
  UploadController.uploadFile
);

// Get uploaded file
router.get('/:filename',
  UploadController.getFile
);

export default router;
