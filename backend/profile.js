// profile.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../uploads', file.fieldname);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Get profile by user ID
router.get('/profile/:userId', (req, res) => {
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
router.post('/profile/update', upload.fields([
  { name: 'foto_ktp', maxCount: 1 },
  { name: 'pas_foto', maxCount: 1 },
  { name: 'ijazah', maxCount: 1 }
]), (req, res) => {
  const userId = req.user.id; // Assuming you have user info in req from auth middleware
  const profileData = req.body;
  const files = req.files;

  // Add file paths to profile data if files were uploaded
  if (files) {
    Object.keys(files).forEach(fieldName => {
      profileData[fieldName] = files[fieldName][0].path;
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

// Get profiles for asesor view (with pagination)
router.get('/profiles', validateAdmin, (req, res) => {
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

module.exports = router;