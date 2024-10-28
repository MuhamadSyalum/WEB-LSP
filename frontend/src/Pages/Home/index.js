import React from 'react';
import { motion } from 'framer-motion';
import Beranda from '../../Components/Beranda';
import Tentang from '../../Components/Tentang';
import Galeri from '../../Components/Galeri';

const Home = () => {
  return (
    <div>
      {/* Memanggil komponen Beranda dan Galeri */}
      <Beranda />
      <Tentang />
      <Galeri />

      <div className="sertifikasi-container">
        <h1 className="title">Program Sertifikasi</h1>
        <div className="sertifikasi-grid">
          <div className="card">
            <h2>Administrasi Kantor</h2>
            <p>Dapatkan sertifikasi keterampilan administrasi kantor yang dibutuhkan di kantor modern</p>
            <motion.button
              whileHover={{ scale: 1.1 }} // Animasi saat tombol di-hover
              whileTap={{ scale: 0.9 }} // Animasi saat tombol di-klik
            >
              Selanjutnya
            </motion.button>
          </div>

          <div className="card">
            <h2>Sekretaris Junior</h2>
            <p>Dapatkan sertifikasi sekretaris junior dan tingkatkan karirmu!</p>
            <motion.button
              whileHover={{ scale: 1.1 }} // Animasi saat tombol di-hover
              whileTap={{ scale: 0.9 }} // Animasi saat tombol di-klik
            >
              Selanjutnya
            </motion.button>
          </div>
        </div>
      </div>

      <section id="kontak" className="container mt-5">
        <h1>Kontak Kami</h1>
        <p>Feel free to contact & reach us</p>
      </section>
    </div>
  );
}

export default Home;
