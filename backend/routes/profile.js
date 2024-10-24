// backend/routes/profile.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { multerConfig } = require('../config/upload');
const { validateAuth } = require('../middleware/auth');

// Get profile
router.get('/profile/:userId', validateAuth, (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT * FROM asesi_profiles WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.json({
      success: true,
      profile: results[0]
    });
  });
});

// Update profile
router.post('/profile/update', validateAuth, upload.fields([
  { name: 'foto_ktp', maxCount: 1 },
  { name: 'pas_foto', maxCount: 1 },
  { name: 'ijazah', maxCount: 1 }
]), (req, res) => {
  const userId = req.user.id;
  const profileData = req.body;
  const files = req.files;

  if (files) {
    Object.keys(files).forEach(fieldName => {
      const file = files[fieldName][0];
      const relativePath = multerConfig.getRelativePath(
        fieldName,
        file.filename
      );
      profileData[fieldName] = relativePath;
    });
  }

  // Check if profile exists
  db.query('SELECT * FROM asesi_profiles WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }

    if (results.length === 0) {
      // Insert new profile
      const insertQuery = `
        INSERT INTO asesi_profiles 
        SET user_id = ?, 
        ${Object.keys(profileData).map(key => `${key} = ?`).join(', ')}
      `;

      db.query(insertQuery, [userId, ...Object.values(profileData)], (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error creating profile'
          });
        }

        res.json({
          success: true,
          message: 'Profile created successfully'
        });
      });
    } else {
      // Update existing profile
      const updateQuery = `
        UPDATE asesi_profiles 
        SET ${Object.keys(profileData).map(key => `${key} = ?`).join(', ')}
        WHERE user_id = ?
      `;

      db.query(updateQuery, [...Object.values(profileData), userId], (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error updating profile'
          });
        }

        res.json({
          success: true,
          message: 'Profile updated successfully'
        });
      });
    }
  });
});

// Get all profiles (for asesor)
router.get('/profiles', validateAuth, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query = `
    SELECT p.*, u.email 
    FROM asesi_profiles p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC 
    LIMIT ? OFFSET ?
  `;

  db.query(query, [limit, offset], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }

    db.query('SELECT COUNT(*) as total FROM asesi_profiles', (err, countResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Server error'
        });
      }

      res.json({
        success: true,
        data: results,
        pagination: {
          page,
          limit,
          total: countResult[0].total,
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      });
    });
  });
});

// Serve files
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