import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads folder exists in root of backend
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const filetypes = /pdf|doc|docx|xls|xlsx|png|jpg|jpeg/i;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    cb(null, extname);
  },
});
