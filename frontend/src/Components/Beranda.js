import React, { useState, useEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Navbar from "./MyNavbar";

import "./Beranda.css";

const CounterSection = () => {
  const [projectsCompleted, setProjectsCompleted] = useState(0);
  const [satisfiedClients, setSatisfiedClients] = useState(0);
  const [publicPlace, setPublicPlace] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);

  const sectionRef = useRef(null);
  const hasScrolled = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionPosition = sectionRef.current.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;

      if (sectionPosition < screenPosition && !hasScrolled.current) {
        hasScrolled.current = true;
        incrementNumbers();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const incrementNumbers = () => {
    incrementValue(setProjectsCompleted, 1000);
    incrementValue(setSatisfiedClients, 28);
    incrementValue(setPublicPlace, 50);
    incrementValue(setSuccessRate, 96);
    incrementValue(setYearsExperience, 6);
  };

  const incrementValue = (setFunction, target) => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setFunction(current);
      if (current >= target) {
        clearInterval(interval);
      }
    }, 20);
  };

  return (
    <div className="counter-section" ref={sectionRef}>
      <div className="counter-box">
        <h2>{projectsCompleted}+</h2>
        <p>Asesi</p>
      </div>
      <div className="counter-box">
        <h2>{satisfiedClients}</h2>
        <p>Asesor</p>
      </div>
      <div className="counter-box">
        <h2>{publicPlace}+</h2>
        <p>TUK</p>
      </div>
      <div className="counter-box">
        <h2>{successRate}%</h2>
        <p>Tingkat Kesuksesan</p>
      </div>
      <div className="counter-box">
        <h2>{yearsExperience}+</h2>
        <p>Tahun Pengalaman</p>
      </div>
    </div>
  );
};

const Beranda = () => {
  return (
    <div
      className="beranda-container"
      style={{
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <section id="beranda">
        <div className="head">
          <div className="left-side">
            <img
              src="../assets/images/header.png" // Pastikan jalur gambar benar
              alt="Woman Pointing"
              className="image-head"
            />
          </div>

          <div className="right-side">
            <div className="info-boxes">
              <div className="info-box">
                <h3>8,400+</h3>
                <p>Asesi</p>
              </div>
              <div className="info-box">
                <h3>100+</h3>
                <p>Asesor</p>
              </div>
            </div>

            <h1>Selamat Datang di LSP AP-I</h1>
            <p>Berfokus pada sertifikasi administrasi perkantoran modern</p>

            {/* Tombol */}
            <div className="buttons-head">
              <button className="btn request-demo">Selengkapnya</button>
              <button className="btn lets-begin">Sertifikasi</button>
            </div>

            {/* Keterangan di bagian bawah */}
            <div className="footer-text">
              <span>Administrasi Kantor</span>
              <span>Sekretaris Yunior</span>
              <span>Sekretaris Korporat</span>
            </div>
          </div>
        </div>

        {/* Tambahkan CounterSection di sini */}
        <CounterSection />
      </section>
    </div>
  );
};

export { CounterSection };
export default Beranda;
