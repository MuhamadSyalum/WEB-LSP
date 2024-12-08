import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Slider from "react-slick";
import "./Tentang.css";

// Import images
import image1 from "../assets/images/header.png";
import image2 from "../assets/images/header.png";
import image3 from "../assets/images/header.png";
import image4 from "../assets/images/header.png";
import image5 from "../assets/images/header.png";
import image6 from "../assets/images/header.png";

const Tentang = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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

  const teamMembers = [
    { name: "Agus Sumeru, MM", role: "MET.000.003627", image: image1 },
    { name: "Aneta", role: "MET. 000.001261 2022", image: image2 },
    { name: "Bertha Musty", role: "MET.000.004262", image: image3 },
    { name: "Dadan Ramdan H.", role: "MET. 000.001260", image: image4 },
    { name: "Dedi Nurdadi, ST", role: "MET.000.003624", image: image5 },
    { name: "Delicia Purdanisari", role: "MET. 000.001255", image: image6 },
    { name: "Devy Ardhiany Utami", role: "MET. 000.007184", image: image1 },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Change for testing
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
                <div className="team-member-content">
                  <img src={member.image} alt={member.name} className="team-image" />
                  <h4 className="team-name">{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Tentang;