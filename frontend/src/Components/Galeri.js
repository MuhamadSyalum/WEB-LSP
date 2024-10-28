import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Galeri.css';  
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';
import image6 from '../assets/images/image6.jpg';
import image7 from '../assets/images/image7.jpg';
import image8 from '../assets/images/image8.jpg';
import image9 from '../assets/images/image9.jpg';
import image10 from '../assets/images/image10.jpg';
import image11 from '../assets/images/image11.jpg';
import image12 from '../assets/images/image12.jpg';

const Galeri = () => {
  // Pengaturan untuk slider react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Data gambar slider
  const images = [
    { src: image1, alt: 'Foto 1' },
    { src: image2, alt: 'Foto 2' },
    { src: image3, alt: 'Foto 3' },
    { src: image4, alt: 'Foto 4' },
    { src: image5, alt: 'Foto 5' },
    { src: image6, alt: 'Foto 6' },
    { src: image7, alt: 'Foto 7' },
    { src: image8, alt: 'Foto 8' },
    { src: image9, alt: 'Foto 9' },
    { src: image10, alt: 'Foto 10' },
    { src: image11, alt: 'Foto 11' },
    { src: image12, alt: 'Foto 12' },
];

  return (
    <section id="galeri" className="galeri-section container mt-5">
      <h1 className="text-center mb-4">Galeri Kegiatan</h1>
      <motion.div
        className="slider-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Slider {...settings}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="slider-item"
              whileHover={{ scale: 1.05 }}  // Animasi saat hover
              whileTap={{ scale: 0.95 }}    // Animasi saat tap/klik
            >
              <img src={image.src} alt={image.alt} className="galeri-img" />
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </section>
  );
};

export default Galeri;
