const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

const createUploadDirs = () => {
  const dirs = ['foto_ktp', 'pas_foto', 'ijazah', 'dokumen_tambahan'];
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  
  dirs.forEach(dir => {
    const fullPath = path.join(uploadDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
    }
  });
};

const multerConfig = {
  getDestination: (fieldname) => path.join(uploadDir, fieldname),
  generateFilename: (file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return `${uniqueSuffix}${path.extname(file.originalname)}`;
  },
  getRelativePath: (fieldname, filename) => path.join(fieldname, filename)
};

module.exports = {
  uploadDir,
  createUploadDirs,
  multerConfig
};