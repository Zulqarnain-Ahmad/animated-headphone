const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads', 'products'));
  },
  filename: (req, file, cb) => {
    const randomName = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${randomName}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG, and WEBP images are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE, files: 1 }
});

// Runs AFTER multer has saved the file — verifies the file's actual
// binary content matches an allowed image type, not just what the
// client claimed in headers. Deletes the file immediately if it fails.
const verifyFileContent = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const { fileTypeFromFile } = await import('file-type');
    const type = await fileTypeFromFile(req.file.path);

    if (!type || !ALLOWED_MIME_TYPES.includes(type.mime)) {
      fs.unlinkSync(req.file.path); // delete the bad file immediately
      return res.status(400).json({
        status: 'error',
        message: 'File content does not match an allowed image type'
      });
    }

    next();
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    next(error);
  }
};

module.exports = { upload, verifyFileContent };