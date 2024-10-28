const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "ijazah" || file.fieldname === "dokumen_lain") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("File harus berformat PDF"));
      }
    } else if (file.fieldname === "ktp" || file.fieldname === "foto") {
      if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
      } else {
        cb(new Error("File harus berformat JPG, JPEG, atau PNG"));
      }
    } else {
      cb(new Error("Tipe file tidak didukung"));
    }
  }
});

// Middleware untuk validasi level asesi
const validateAsesi = (req, res, next) => {
  const userLevel = req.headers['user-level'];
  if (userLevel !== '3') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  next();
};

// Get profile
router.get('/', validateAsesi, (req, res) => {
  const userId = req.headers['user-id'];
  
  const query = 'SELECT * FROM profiles WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    res.json({
      success: true,
      profile: results[0]
    });
  });
});

// Create profile
router.post('/', validateAsesi, upload.fields([
  { name: 'ijazah', maxCount: 1 },
  { name: 'ktp', maxCount: 1 },
  { name: 'foto', maxCount: 1 },
  { name: 'dokumen_lain', maxCount: 1 }
]), (req, res) => {
  const userId = req.headers['user-id'];
  const {
    nama, tanggal_lahir, tempat_lahir, jenis_kelamin,
    agama, pendidikan_terakhir, pekerjaan, nomor_telp,
    email, alamat
  } = req.body;

  // Check if profile already exists
  db.query('SELECT id FROM profiles WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    
    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'Profile already exists' });
    }

    const files = req.files;
    const profileData = {
      user_id: userId,
      nama,
      tanggal_lahir,
      tempat_lahir,
      jenis_kelamin,
      agama,
      pendidikan_terakhir,
      pekerjaan,
      nomor_telp,
      email,
      alamat,
      ijazah_path: files.ijazah ? files.ijazah[0].path : null,
      ktp_path: files.ktp ? files.ktp[0].path : null,
      foto_path: files.foto ? files.foto[0].path : null,
      dokumen_lain_path: files.dokumen_lain ? files.dokumen_lain[0].path : null
    };

    db.query('INSERT INTO profiles SET ?', profileData, (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      
      res.json({
        success: true,
        message: 'Profile created successfully'
      });
    });
  });
});

// Update profile
router.put('/', validateAsesi, upload.fields([
  { name: 'ijazah', maxCount: 1 },
  { name: 'ktp', maxCount: 1 },
  { name: 'foto', maxCount: 1 },
  { name: 'dokumen_lain', maxCount: 1 }
]), (req, res) => {
  const userId = req.headers['user-id'];
  const {
    nama, tanggal_lahir, tempat_lahir, jenis_kelamin,
    agama, pendidikan_terakhir, pekerjaan, nomor_telp,
    email, alamat
  } = req.body;

  // Get existing profile
  db.query('SELECT * FROM profiles WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    const oldProfile = results[0];
    const files = req.files;

    // Delete old files if new ones are uploaded
    if (files.ijazah && oldProfile.ijazah_path) {
      fs.unlink(oldProfile.ijazah_path, (err) => {
        if (err) console.error('Error deleting old ijazah:', err);
      });
    }
    if (files.ktp && oldProfile.ktp_path) {
      fs.unlink(oldProfile.ktp_path, (err) => {
        if (err) console.error('Error deleting old KTP:', err);
      });
    }
    if (files.foto && oldProfile.foto_path) {
      fs.unlink(oldProfile.foto_path, (err) => {
        if (err) console.error('Error deleting old foto:', err);
      });
    }
    if (files.dokumen_lain && oldProfile.dokumen_lain_path) {
      fs.unlink(oldProfile.dokumen_lain_path, (err) => {
        if (err) console.error('Error deleting old dokumen:', err);
      });
    }

    const updateData = {
      nama,
      tanggal_lahir,
      tempat_lahir,
      jenis_kelamin,
      agama,
      pendidikan_terakhir,
      pekerjaan,
      nomor_telp,
      email,
      alamat,
      ijazah_path: files.ijazah ? files.ijazah[0].path : oldProfile.ijazah_path,
      ktp_path: files.ktp ? files.ktp[0].path : oldProfile.ktp_path,
      foto_path: files.foto ? files.foto[0].path : oldProfile.foto_path,
      dokumen_lain_path: files.dokumen_lain ? files.dokumen_lain[0].path : oldProfile.dokumen_lain_path
    };

    db.query('UPDATE profiles SET ? WHERE user_id = ?', [updateData, userId], (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      
      res.json({
        success: true,
        message: 'Profile updated successfully'
      });
    });
  });
});

// Delete profile
router.delete('/', validateAsesi, (req, res) => {
  const userId = req.headers['user-id'];

  // Get profile to delete files
  db.query('SELECT * FROM profiles WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    const profile = results[0];

    // Delete files
    const files = [
      profile.ijazah_path,
      profile.ktp_path,
      profile.foto_path,
      profile.dokumen_lain_path
    ];

    files.forEach(file => {
      if (file) {
        fs.unlink(file, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
    });

    // Delete profile from database
    db.query('DELETE FROM profiles WHERE user_id = ?', [userId], (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      
      res.json({
        success: true,
        message: 'Profile deleted successfully'
      });
    });
  });
});

module.exports = router;
