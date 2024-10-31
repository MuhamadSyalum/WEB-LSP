import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Slider from "react-slick"; // Import react-slick
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Tentang.css";

const TentangPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Tentang Perusahaan",
      answer: "LSP Administrasi Perkantoran Indonesia didirikan dengan Akta Notaris No. 01 tanggal 27 Juli 2016, berfungsi dan memiliki tugas melaksanakan uji kompetensi bidang Administrasi Profesional...",
    },
    {
      question: "VISI",
      answer: "Mewujudkan Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia sebagai lembaga sertifikasi yang profesional, independen, akuntabel, transparan, dan terpercaya",
    },
    {
      question: "MISI",
      answer: "1. Mendukung pengembangan dan pembangunan Sumber Daya Manusia internal dan eksternal yang kompeten dan profesional...",
    },
    {
      question: "Kebijakan Mutu",
      answer: "Lembaga Sertifikasi Profesi Administrasi Perkantoran Indonesia bertekad mendukung program pemerintah dalam meningkatkan kualitas sumber daya manusia berbasis kompetensi...",
    },
    {
      question: "Sasaran Mutu",
      answer: "Tercapainya standar mutu sertifikasi profesi yang kredibel, kompeten, dan profesional di seluruh sektor/subsektor...",
    },
  ];

  const teamMembers = [
    { name: "Agus Sumeru, MM", role: "MET.000.003627", image: "../assets/images/header.png" },
    { name: "Aneta", role: "MET. 000.001261 2022", image: "../assets/images/header.png" },
    { name: "Bertha Musty", role: "MET.000.004262", image: "../assets/images/header.png" },
    { name: "Dadan Ramdan H.", role: "MET. 000.001260", image: "../assets/images/header.png" },
    { name: "Dedi Nurdadi, ST", role: "MET.000.003624", image: "../assets/images/header.png" },
    { name: "Delicia Purdanisari", role: "MET. 000.001255", image: "../assets/images/header.png" },
    { name: "Devy Ardhiany Utami", role: "MET. 000.007184", image: "../assets/images/header.png" },
  ];

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // Number of items to show at once
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
    <div>
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
        <p className="team-subtitle">Para Asesor di Lembaga Sertifikasi Administrasi Perkantoran Indonesia</p>
        <div className="team-members">
          <Slider {...sliderSettings} className="team-carousel">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.image} alt={member.name} className="team-image" />
                <h4 className="team-name">{member.name}</h4>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default TentangPage;
