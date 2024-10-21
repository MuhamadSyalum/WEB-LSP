import React from 'react';
import { motion } from 'framer-motion';
import './Tentang.css';

const Tentang = () => {
  return (
    <section className="container" id="tentang">
      <h2 className="title">Tentang</h2>
      
      {/* Konten Pertama */}
      <div className="content">
        <img
          src="/assets/images/aboutImage.png"
          alt="Tentang Kami"
          className="tentangImage"
        />
        <ul className="tentangItems">
          <motion.li
            className="tentangItem"
            initial={{ opacity: 0, y: -20 }} // Mulai dari transparan dan sedikit di atas
            animate={{ opacity: 1, y: 0 }} // Masuk ke posisi normal
            transition={{ duration: 0.5 }}
          >
            <img src="/assets/images/cursorIcon.png" alt="Cursor icon" />
            <div className="tentangItemText">
              <h3>Frontend Developer</h3>
              <p>Saya seorang frontend developer...</p>
            </div>
          </motion.li>
          <motion.li
            className="tentangItem"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} // Delay untuk efek bertahap
          >
            <img src="/assets/images/serverIcon.png" alt="Server icon" />
            <div className="tentangItemText">
              <h3>Backend Developer</h3>
              <p>Saya memiliki pengalaman...</p>
            </div>
          </motion.li>
          <motion.li
            className="tentangItem"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="/assets/images/uiIcon.png" alt="UI icon" />
            <div className="tentangItemText">
              <h3>UI Designer</h3>
              <p>Saya telah merancang beberapa halaman arahan...</p>
            </div>
          </motion.li>
        </ul>
      </div>

      {/* Konten Kedua dengan Animasi */}
      <motion.div
        className="content"
        initial={{ opacity: 0 }} // Mulai dari transparan
        animate={{ opacity: 1 }} // Masuk ke posisi normal
        exit={{ opacity: 0 }} // Saat keluar, hilang
        transition={{ duration: 0.5 }} // Durasi animasi
      >
        <ul className="tentangItems">
          <motion.li
            className="tentangItem"
            initial={{ opacity: 0, y: -20 }} // Teks masuk dari atas
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/assets/images/cursorIcon.png" alt="Cursor icon" />
            <div className="tentangItemText">
              <h3>Frontend Developer</h3>
              <p>Saya seorang frontend developer...</p>
            </div>
          </motion.li>
          <motion.li
            className="tentangItem"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} // Delay untuk efek bertahap
          >
            <img src="/assets/images/serverIcon.png" alt="Server icon" />
            <div className="tentangItemText">
              <h3>Backend Developer</h3>
              <p>Saya memiliki pengalaman...</p>
            </div>
          </motion.li>
          <motion.li
            className="tentangItem"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="/assets/images/uiIcon.png" alt="UI icon" />
            <div className="tentangItemText">
              <h3>UI Designer</h3>
              <p>Saya telah merancang beberapa halaman arahan...</p>
            </div>
          </motion.li>
        </ul>
        <motion.img
          src="/assets/images/aboutImage.png"
          alt="Tentang Kami"
          className="tentangImage"
          initial={{ opacity: 0, y: 20 }} // Gambar mulai dari bawah
          animate={{ opacity: 1, y: 0 }} // Masuk ke posisi normal
          transition={{ duration: 0.5, delay: 0.3 }} // Delay agar gambar muncul setelah teks
        />
      </motion.div>
    </section>
  );
};

export default Tentang;
