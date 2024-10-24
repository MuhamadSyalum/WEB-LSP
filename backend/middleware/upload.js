const multer = require('multer');
const { multerConfig } = require('../config/upload');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, multerConfig.getDestination(file.fieldname));
  },
  filename: (req, file, cb) => {
    cb(null, multerConfig.generateFilename(file));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'ijazah') {
    if (!file.mimetype.includes('pdf')) {
      return cb(new Error('Only PDF files are allowed for ijazah'), false);
    }
  } else if (file.fieldname.includes('foto')) {
    if (!file.mimetype.includes('image/')) {
      return cb(new Error('Only image files are allowed for photos'), false);
    }
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;