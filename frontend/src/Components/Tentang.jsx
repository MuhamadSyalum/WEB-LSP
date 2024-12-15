import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Tentang.css";

const Tentang = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeProfileIndex, setActiveProfileIndex] = useState(null);
  const [asesors, setAsesors] = useState([]);
  const [msg, setMsg] = useState("");

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleProfile = (index) => {
    setActiveProfileIndex(activeProfileIndex === index ? null : index);
  };

  useEffect(() => {
    const getAsesors = async () => {
      try {
        const response = await fetch("http://localhost:5000/asesors");
        if (!response.ok) {
          throw new Error("Gagal memuat data asesor.");
        }
        const data = await response.json();
        setAsesors(data);
      } catch (error) {
        console.error("Error fetching asesors:", error);
        setMsg(error.message);
      }
    };

    getAsesors();
  }, []);

  const faqs = [
    {
      question: "Tentang Perusahaan",
      answer: "LSP Administrasi Perkantoran Indonesia didirikan dengan Akta Notaris No. 01 tanggal 27 Juli 2016...",
    },
    {
      question: "VISI",
      answer: "Mewujudkan Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia...",
    },
    {
      question: "MISI",
      answer: "1. Mendukung pengembangan dan pembangunan Sumber Daya Manusia...",
    },
    {
      question: "Kebijakan Mutu",
      answer: "Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia bertekad mendukung program pemerintah...",
    },
    {
      question: "Sasaran Mutu",
      answer: "Tercapainya standar mutu sertifikasi profesi yang kredibel...",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="tentang-container">
      {/* FAQ Section */}
      <section className="faq-container" id="faq">
        <h2 className="title">Tentang</h2>
        <h4 className="subtitle">Lembaga Sertifikasi Administrasi Perkantoran Indonesia</h4>
        <div className="faq-items">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h4>{faq.question}</h4>
                <span>{activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}</span>
              </div>
              {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="team-title">Data Asesor</h2>
        <p className="team-subtitle">
          Para Asesor di Lembaga Sertifikasi Administrasi Perkantoran Indonesia
        </p>
        <div className="team-members">
          {msg ? (
            <p className="error-message">{msg}</p>
          ) : (
            <Slider {...sliderSettings} className="team-carousel">
              {asesors.map((asesor, index) => (
                <div key={asesor.id} className="team-member">
                  <div className="team-member-content">
                    <img
                      src={asesor.url}
                      alt={asesor.nama}
                      className="team-image"
                    />
                    <h4 className="team-name" onClick={() => toggleProfile(index)}>
                      {asesor.nama}
                    </h4>
                    <p className="team-role">{asesor.met}</p>
                  </div>
                  {activeProfileIndex === index && (
                    <div className="team-profile">
                      <p><strong>Nama:</strong> {asesor.nama}</p>
                      <p><strong>Jabatan:</strong> {asesor.met}</p>
                      <p><strong>Profil Lainnya:</strong> {asesor.profil || "Tidak ada deskripsi."}</p>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tentang;
