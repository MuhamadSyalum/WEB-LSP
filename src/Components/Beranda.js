import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import backgroundImage from '../assets/images/background.jpg';
import './Beranda.css'; // Pastikan untuk memasukkan CSS jika diperlukan

const Beranda = () => {
  return (
    <div
      className="beranda-container"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Menggunakan gambar sebagai background
        backgroundSize: 'cover', // Menutupi seluruh area
        height: '100vh', // Mengatur tinggi container
        display: 'flex', // Mengatur display untuk konten di tengah
        alignItems: 'center', // Mengatur konten ke tengah vertikal
        justifyContent: 'center', // Mengatur konten ke tengah horizontal
      }}
    >
      <section id="beranda">
        <div className="beranda-content">
          <h1>Selamat Datang di LSP AP-I</h1>
          <p>Berfokus pada sertifikasi administrasi perkantoran modern.</p>
        </div>
        {/* Tambahkan animasi 3D */}
        <div className="canvas-container">
          <Canvas style={{ height: '500px', width: '100%' }}> {/* Atur tinggi dan lebar canvas */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1} />
            <Model /> {/* Panggil komponen Model untuk memuat GLB */}
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </section>
    </div>
  );
};

// Komponen untuk memuat model GLB
const Model = () => {
  const gltf = useLoader(GLTFLoader, require('../assets/models/computer.glb')); // Memuat model GLB
  return <primitive object={gltf.scene} scale={2.5} />; // Atur skala jika perlu
};

export default Beranda;
