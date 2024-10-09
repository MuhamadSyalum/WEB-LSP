import React from 'react';
import { motion } from 'framer-motion';
import Beranda from '../../Components/Beranda'; 
import Galeri from '../../Components/Galeri';

const Home = () => {
  return (
    <div>
      {/* Memanggil komponen Beranda dan Galeri */}
      <Beranda />
      <Galeri />

      <div className="sertifikasi-container">
        <h1 className="title">Program Sertifikasi</h1>
        <div className="sertifikasi-grid">
          <motion.div
            className="card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              bounce: 0.4,
              duration: 0.5,
            }}
          >
            <h2>Administrasi Kantor</h2>
            <p>Pelajari keterampilan administrasi yang dibutuhkan di kantor modern.</p>
          </motion.div>

          <motion.div
            className="card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              bounce: 0.4,
              duration: 0.5,
            }}
          >
            <h2>Sekretaris Junior</h2>
            <p>Dapatkan keterampilan dasar yang diperlukan untuk menjadi sekretaris junior.</p>
          </motion.div>
        </div>
      </div>

      <section id="kontak" className="container mt-5">
        <h1>Kontak Kami</h1>
        <p>Hubungi kami di sini.</p>
      </section>
    </div>
  );
}

export default Home;
