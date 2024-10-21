const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Buat koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost', // ganti dengan host database Anda
  user: 'root',      // ganti dengan user database Anda
  password: '',      // ganti dengan password database Anda
  database: 'web-lsp', // ganti dengan nama database Anda
});

// Connect ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Endpoint untuk login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email); // Log email
  console.log('Password:', password); // Log password

  // Query untuk mengecek apakah pengguna ada di database
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error during query:', err);
      res.status(500).json({ message: 'Server error' });
    } else if (results.length > 0) {
      // Jika pengguna ditemukan, kirim data termasuk level
      const user = results[0];
      res.json({
        success: true,
        message: 'Login successful',
        level: user.level, // Kirim level pengguna ke frontend
      });
    } else {
      // Jika pengguna tidak ditemukan
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

module.exports = router; // Pastikan router diekspor
