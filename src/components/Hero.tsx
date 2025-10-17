"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image:
      "https://media.istockphoto.com/id/1424301376/vector/satin-textile-texture-silk-fabric-background.jpg?s=612x612&w=0&k=20&c=Fs3g8oBBpS-ItIHIyQhRfKhILgMiGN_W7QGKqujP4Bs=",
    title: "Luxury Fabrics for Every Style",
    text: "Discover premium-quality textiles designed to make your fashion stand out.",
  },
  {
    id: 2,
    image:
      "https://media.istockphoto.com/id/2183019893/video/textile-rolls-are-stored-on-industrial-warehouse-shelves-concept-of-textile-industry.jpg?s=640x640&k=20&c=_CUSpQivbcbDYhiVC9JoBZjNLax5PonuJeMvpBUkYUg=",
    title: "Bold Prints & Elegant Designs",
    text: "Explore our unique patterns perfect for traditional and modern wear.",
  },
  {
    id: 3,
    image:
      "https://media.istockphoto.com/id/2198284918/photo/flying-gold-silk-textile-fabric-flag-background-3d-rendering.jpg?s=612x612&w=0&k=20&c=8VLtwx6zQkeKj9oKvkJzqkQl5F93dlSWhpzmTC1cSZ4=",
    title: "Your Fabric, Your Fashion",
    text: "Shop authentic fabrics and bring your fashion ideas to life.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setImageLoaded(false); // reset when changing slide
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover brightness-75 transition-opacity duration-700"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay content */}
      {imageLoaded && (
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-6">
          <motion.h1
            key={slides[current].title}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-blue-400 drop-shadow-lg"
          >
            {slides[current].title}
          </motion.h1>

          <motion.p
            key={slides[current].text}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg md:text-2xl text-gray-200 max-w-3xl"
          >
            {slides[current].text}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Shop Now
          </motion.button>
        </div>
      )}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-blue-400 w-6" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
