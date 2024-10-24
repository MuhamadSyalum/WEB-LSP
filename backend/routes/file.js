const express = require('express');
const router = express.Router();
const path = require('path');
const { uploadDir } = require('../config/upload');
const { validateAuth } = require('../middleware/auth');

// Serve files with authentication
router.get('/files/:type/:filename', validateAuth, (req, res) => {
  const { type, filename } = req.params;
  const filePath = path.join(uploadDir, type, filename);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
  });
});

module.exports = router;