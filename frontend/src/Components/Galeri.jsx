import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Galeri.css";

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // State untuk data produk
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <section id="galeri" className="galeri-section container mt-5">
      <h1 className="text-center mb-4">Galeri Produk</h1>
      <motion.div
        className="slider-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Slider {...settings}>
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="slider-item"
              whileHover={{ scale: 1.05 }} // Animasi saat hover
              whileTap={{ scale: 0.95 }} // Animasi saat tap/klik
            >
              <div className="image-wrapper">
                <div className="overlay">
                  <p>{product.keterangan}</p> {/* Menampilkan keterangan saat hover */}
                </div>
                <img src={product.url} alt={product.name} className="galeri-img" />
              </div>
              <h3 className="image-title">{product.name}</h3> {/* Menampilkan judul gambar */}
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </section>
  );
};

export default Galeri;

