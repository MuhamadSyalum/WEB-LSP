const express = require('express');
const router = express.Router();

// GET profile
router.get('/', (req, res) => {
  // Implementasi untuk mengambil profil
  res.json({ message: 'Get profile' });
});

// POST profile
router.post('/', (req, res) => {
  // Implementasi untuk membuat profil baru
  res.json({ message: 'Create profile' });
});

// PUT profile
router.put('/', (req, res) => {
  // Implementasi untuk mengupdate profil
  res.json({ message: 'Update profile' });
});

// DELETE profile
router.delete('/', (req, res) => {
  // Implementasi untuk menghapus profil
  res.json({ message: 'Delete profile' });
});

module.exports = router;