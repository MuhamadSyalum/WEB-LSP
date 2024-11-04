const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middleware
router.use(cors());
router.use(express.json());

// Configure file upload with validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    switch (file.fieldname) {
      case 'profile_picture':
        uploadPath += 'foto_profile/';
        break;
      case 'ktp':
        uploadPath += 'ktp/';
        break;
      case 'diploma':
        uploadPath += 'diploma/';
        break;
      case 'additional_documents':
        uploadPath += 'additional_documents/';
        break;
    }
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const username = req.body.username || 'user';
    const safeUsername = username.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const ext = path.extname(file.originalname);
    const filename = `${safeUsername}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const allowedDocTypes = ['application/pdf'];

  if (file.fieldname === 'profile_picture' || file.fieldname === 'ktp') {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed for images.'), false);
    }
  } else if (file.fieldname === 'diploma' || file.fieldname === 'additional_documents') {
    if (allowedDocTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF files are allowed for documents.'), false);
    }
  } else {
    cb(new Error('Unexpected field'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'web-lsp'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Validation middleware
const validateAdmin = (req, res, next) => {
  const userLevel = req.headers['user-level'];
  if (userLevel !== '1') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  next();
};

// Update the delete file helper function
const deleteOldFiles = async (userId, fields, db) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT profile_picture, ktp, diploma, additional_documents FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (results.length > 0) {
        const oldFiles = results[0];
        fields.forEach(field => {
          if (oldFiles[field]) {
            let basePath = 'uploads/';
            switch (field) {
              case 'profile_picture':
                basePath += 'foto_profile/';
                break;
              case 'ktp':
                basePath += 'ktp/';
                break;
              case 'diploma':
                basePath += 'diploma/';
                break;
              case 'additional_documents':
                basePath += 'additional_documents/';
                break;
            }
            const filePath = path.join(basePath, oldFiles[field]);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        });
      }
      resolve();
    });
  });
};

// Serve static files
router.use('/uploads', express.static('uploads'));

// Login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }

    if (results.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const user = results[0];

    // Check password (you should use bcrypt to hash and compare passwords)
    if ( user.password !== password) {
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

// Modified register endpoint with error handling for files
router.post('/register', validateAdmin, upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'ktp', maxCount: 1 },
  { name: 'diploma', maxCount: 1 },
  { name: 'additional_documents', maxCount: 1 }
]), async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      // Delete uploaded files if validation fails
      if (req.files) {
        Object.values(req.files).forEach(files => {
          files.forEach(file => {
            fs.unlinkSync(file.path);
          });
        });
      }
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Process file uploads
    const fileFields = {
      profile_picture: req.files?.['profile_picture']?.[0]?.filename || null,
      ktp: req.files?.['ktp']?.[0]?.filename || null,
      diploma: req.files?.['diploma']?.[0]?.filename || null,
      additional_documents: req.files?.['additional_documents']?.[0]?.filename || null
    };

    // Your existing register logic here, but include the file fields
    const query = `
      INSERT INTO users (
        email, password, level, username, date_of_birth, place_of_birth, 
        address, education, occupation, religion, gender, 
        profile_picture, ktp, diploma, additional_documents, 
        created_at, updated_at
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const values = [
      email,
      password,
      req.body.level || 3,
      req.body.username || null,
      req.body.date_of_birth || null,
      req.body.place_of_birth || null,
      req.body.address || null,
      req.body.education || null,
      req.body.occupation || null,
      req.body.religion || null,
      req.body.gender || null,
      fileFields.profile_picture,
      fileFields.ktp,
      fileFields.diploma,
      fileFields.additional_documents
    ];

    db.query(query, values, (err, results) => {
      if (err) {
        // Delete uploaded files if database operation fails
        Object.values(fileFields).forEach(filename => {
          if (filename) {
            fs.unlinkSync(path.join('uploads', filename));
          }
        });

        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ 
            success: false, 
            message: 'Email already exists' 
          });
        }
        throw err;
      }
      
      res.json({
        success: true,
        message: 'User  registered successfully',
        userId: results.insertId,
        files: fileFields
      });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
});

// Modified update endpoint with file handling
router.put('/users/:id', validateAdmin, upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'ktp', maxCount: 1 },
  { name: 'diploma', maxCount: 1 },
  { name: 'additional_documents', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Handle file updates
    const updatedFields = {};
    const fieldsToUpdate = [];
    const queryParams = [];

    // Add non-file fields
    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== undefined && !['profile_picture', 'ktp', 'diploma', 'additional_documents'].includes(key)) {
        fieldsToUpdate.push(`${key} = ?`);
        queryParams.push(value);
        updatedFields[key] = value;
      }
    });

    // Handle file updates
    if (req.files) {
      const fileFields = ['profile_picture', 'ktp', 'diploma', 'additional_documents'];
      await deleteOldFiles(id, fileFields, db);

      fileFields.forEach(field => {
        if (req.files[field]) {
          fieldsToUpdate.push(`${field} = ?`);
          queryParams.push(req.files[field][0].filename);
          updatedFields[field] = req.files[field][0].filename;
        }
      });
    }

    // Add updated_at
    fieldsToUpdate.push('updated_at = NOW()');

    // Add id to params
    queryParams.push(id);

    const query = `
      UPDATE users 
      SET ${fieldsToUpdate.join(', ')}
      WHERE id = ?
    `;

    db.query(query, queryParams, (err, results) => {
      if (err) {
        throw err;
      }

      res.json({
        success: true,
        message: 'User  updated successfully',
        updatedFields
      });
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
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

    db.query('SELECT COUNT(*) as total FROM users WHERE level =  2', (err, countResult) => {
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
    SELECT 
      id, 
      email, 
      username, 
      date_of_birth, 
      place_of_birth, 
      address, 
      education, 
      occupation, 
      religion, 
      gender, 
      created_at 
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
router.delete('/users/:id', validateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    // Delete associated files first
    await deleteOldFiles(id, ['profile_picture', 'ktp', 'diploma', 'additional_documents'], db);

    // Then delete the user record
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
      if (err) {
        throw err;
      }
      
      res.json({
        success: true,
        message: 'User  and associated files deleted successfully'
      });
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
});

// Add endpoint to get file
router.get('/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join('uploads', filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(path.resolve(filePath));
  } else {
    res.status(404).json({
      success: false,
      message: 'File not found'
    });
  }
});

module.exports = router;