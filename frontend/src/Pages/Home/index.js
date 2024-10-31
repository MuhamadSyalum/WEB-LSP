import React from "react";
import { motion } from "framer-motion";
import Beranda from "../../components/Beranda";
import Tentang from "../../components/Tentang";
import Galeri from "../../components/Galeri";
import MyNavbar from "../../components/MyNavbar";
import Footer from "../../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/* Memanggil komponen Beranda dan Galeri */}
      <MyNavbar />
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

      <div className="app-contacts">
        <div className="app-contact">
          <h2>Hubungi Kami</h2>
          <div className="App">
            <div className="contact-form">
              <input type="email" placeholder="Email" />
              <input type="tel" placeholder="Phone" />
              <input type="text" placeholder="Name" />
              <textarea placeholder="Message"></textarea>
              <motion.button
                whileHover={{ scale: 1.1 }} // Animasi saat tombol di-hover
                whileTap={{ scale: 1.2 }} // Animasi saat tombol di-klik
              >
                Kirim
              </motion.button>
            </div>

            <div className="info-cards-form">
              <div className="card-form">
                <FaPhoneAlt size={24} />
                <p>(+876) 765 685</p>
              </div>
              <div className="card-form">
                <FaEnvelope size={24} />
                <p>mail@influenca.id</p>
              </div>
              <div className="card-form">
                <FaMapMarkerAlt size={24} />
                <p>Kota Bandung</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
