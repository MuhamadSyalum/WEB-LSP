import React from 'react';

const Home = () => {
  return (
    <div>
      <section id="beranda" className="container mt-5">
        <h1>Beranda</h1>
        <p>Selamat datang di LSP AP-I.</p>
      </section>
      
      <section id="tentang" className="container mt-5">
        <h1>Tentang Kami</h1>
        <p>Ini adalah halaman tentang LSP AP-I. Kami berfokus pada sertifikasi administrasi perkantoran.</p>
      </section>

      <section id="galeri" className="container mt-5">
        <h1>Galeri</h1>
        <p>Ini adalah halaman galeri.</p>
      </section>

      <section id="sertifikasi" className="container mt-5">
        <h1>Sertifikasi</h1>
        <p>Informasi tentang sertifikasi.</p>
      </section>

      <section id="kontak" className="container mt-5">
        <h1>Kontak Kami</h1>
        <p>Hubungi kami di sini.</p>
      </section>
    </div>
  );
}

export default Home;
