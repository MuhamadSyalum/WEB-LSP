// Home.js
import React from 'react';
import { motion } from 'framer-motion';
import MyNavbar from '../../components/MyNavbar'; // Pastikan path ini benar
import Beranda from '../../components/Beranda';
import Tentang from '../../components/Tentang';
import Galeri from '../../components/Galeri';

const Home = () => {
  return (
    <>
      {/* Memanggil Navbar */}
      <MyNavbar />

      {/* Konten Halaman Home */}
      <div className="container mt-3">
        <motion.div>
          <Beranda />
          <Tentang />
          <Galeri />

          <section>
            <h2>Program Sertifikasi</h2>
            <div>
              <h3>Administrasi Kantor</h3>
              <p>Pelajari keterampilan administrasi yang dibutuhkan di kantor modern.</p>
            </div>
            <div>
              <h3>Sekretaris Junior</h3>
              <p>Dapatkan keterampilan dasar yang diperlukan untuk menjadi sekretaris junior.</p>
            </div>
          </section>

          <section>
            <h2>Kontak Kami</h2>
            <p>Hubungi kami di sini.</p>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
