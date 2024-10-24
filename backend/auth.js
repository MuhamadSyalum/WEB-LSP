// auth.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');

// Middleware
router.use(cors());
router.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'web-lsp'
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Middleware untuk validasi admin
const validateAdmin = (req, res, next) => {
  const userLevel = req.headers['user-level'];
  if (userLevel !== '1') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  next();
};

// Login endpoint
router.post('/login', (req, res) => {
  console.log('Login request received:', req.body);
  
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }

    console.log('Query results:', results);

    if (results.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const user = results[0];

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate session token (in production, use JWT)
    const token = Date.now().toString();

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        level: user.level
      },
      token: token
    });
  });
});

// Register endpoint
router.post('/register', validateAdmin, (req, res) => {
  const { email, password, level } = req.body;

  if (!email || !password || !level) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format' 
    });
  }

  const query = `
    INSERT INTO users (email, password, level, created_at, updated_at) 
    VALUES (?, ?, ?, NOW(), NOW())
  `;

  db.query(query, [email, password, level], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ 
          success: false, 
          message: 'Email already exists' 
        });
      }
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }
    
    res.json({
      success: true,
      message: 'User registered successfully',
      userId: results.insertId
    });
  });
});

// Update user endpoint
router.put('/users/:id', validateAdmin, (req, res) => {
  const { id } = req.params;
  const { email, password, level } = req.body;

  let query;
  let params;

  if (password) {
    query = `
      UPDATE users 
      SET email = ?, password = ?, level = ?, updated_at = NOW() 
      WHERE id = ?
    `;
    params = [email, password, level, id];
  } else {
    query = `
      UPDATE users 
      SET email = ?, level = ?, updated_at = NOW() 
      WHERE id = ?
    `;
    params = [email, level, id];
  }

  db.query(query, params, (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ 
          success: false, 
          message: 'Email already exists' 
        });
      }
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully'
    });
  });
});

// Get users endpoints
router.get('/asesor', validateAdmin, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query = `
    SELECT id, email, level, created_at, updated_at 
    FROM users 
    WHERE level = 2 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;

  db.query(query, [limit, offset], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }

    db.query('SELECT COUNT(*) as total FROM users WHERE level = 2', (err, countResult) => {
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

// Get asesi endpoint
router.get('/users/asesi', validateAdmin, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query = `
    SELECT id, email, level, created_at, updated_at 
    FROM users 
    WHERE level = 3 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;

  db.query(query, [limit, offset], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }

    db.query('SELECT COUNT(*) as total FROM users WHERE level = 3', (err, countResult) => {
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

// Get total asesi count
router.get('/asesi-count', validateAdmin, (req, res) => {
  const query = 'SELECT COUNT(*) as total FROM users WHERE level = 3';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }
    
    res.json({
      success: true,
      total: results[0].total
    });
  });
});

// Dashboard endpoint
router.get('/dashboard', validateAdmin, async (req, res) => {
  console.log('Dashboard endpoint hit');
  
  try {
    // Promises untuk menjalankan queries secara parallel
    const [asesorCount, asesiCount, recentActivities] = await Promise.all([
      // Get total Asesor (level 2)
      new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) as total FROM users WHERE level = 2', (err, result) => {
          if (err) reject(err);
          else resolve(result[0].total);
        });
      }),
      
      // Get total Asesi (level 3)
      new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) as total FROM users WHERE level = 3', (err, result) => {
          if (err) reject(err);
          else resolve(result[0].total);
        });
      }),
      
      // Get recent activities
      new Promise((resolve, reject) => {
        db.query(
          `SELECT id, email, level, created_at 
           FROM users 
           WHERE level IN (2, 3) 
           ORDER BY created_at DESC 
           LIMIT 5`,
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      })
    ]);

    console.log('Dashboard data:', {
      asesorCount,
      asesiCount,
      recentActivitiesCount: recentActivities.length
    });

    res.json({
      success: true,
      stats: {
        totalAsesor: asesorCount,
        totalAsesi: asesiCount,
        recentActivities: recentActivities
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// Delete user endpoint
router.delete('/users/:id', validateAdmin, (req, res) => {
  const { id } = req.params;

  db.query('SELECT level FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User  not found' 
      });
    }

    if (results[0].level === 1) {
      return res.status(403).json({ 
        success: false, 
        message: 'Cannot delete admin users' 
      });
    }

    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Server error' 
        });
      }
      
      res.json({
        success: true,
        message: 'User  deleted successfully'
      });
    });
  });
});
// Endpoint untuk menyimpan profil asesi
router.post('/profile_asesi', (req, res) => {
  const { 
    userId,
    nama,
    email,
    noKTP,
    tempatLahir,
    tanggalLahir,
    jenisKelamin,
    alamat,
    noTelepon,
    pendidikanTerakhir,
    pekerjaan,
    namaPerusahaan
  } = req.body;

  // Validasi data
  if (!userId || !nama || !email || !noKTP) {
    return res.status(400).json({ 
      success: false, 
      message: 'Data tidak lengkap' 
    });
  }

  const query = `
    INSERT INTO profile_asesi 
    (user_id, nama, email, no_ktp, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telepon, pendidikan_terakhir, pekerjaan, nama_perusahaan, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    ON DUPLICATE KEY UPDATE
    nama = VALUES(nama), 
    email = VALUES(email), 
    no_ktp = VALUES(no_ktp), 
    tempat_lahir = VALUES(tempat_lahir), 
    tanggal_lahir = VALUES(tanggal_lahir), 
    jenis_kelamin = VALUES(jenis_kelamin), 
    alamat = VALUES(alamat), 
    no_telepon = VALUES(no_telepon), 
    pendidikan_terakhir = VALUES(pendidikan_terakhir), 
    pekerjaan = VALUES(pekerjaan), 
    nama_perusahaan = VALUES(nama_perusahaan), 
    updated_at = NOW()
  `;

  db.query(query, [
    userId,
    nama,
    email,
    noKTP,
    tempatLahir,
    tanggalLahir,
    jenisKelamin,
    alamat,
    noTelepon,
    pendidikanTerakhir,
    pekerjaan,
    namaPerusahaan
  ], (err, result) => {
    if (err) {
      console.error('Error saving asesi profile:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Gagal menyimpan profil asesi' 
      });
    }
    
    res.json({
      success: true,
      message: 'Profil asesi berhasil disimpan',
      profileId: result.insertId
    });
  });
});

module.exports = router;