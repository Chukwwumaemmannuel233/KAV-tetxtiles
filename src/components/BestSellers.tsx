"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bestSellers = [
  {
    id: 1,
    name: "Luxury Satin Fabric",
    image:
      "https://media.istockphoto.com/id/1424301376/vector/satin-textile-texture-silk-fabric-background.jpg?s=612x612&w=0&k=20&c=Fs3g8oBBpS-ItIHIyQhRfKhILgMiGN_W7QGKqujP4Bs=",
    price: "$25/m",
  },
  {
    id: 2,
    name: "Elegant Printed Cotton",
    image:
      "https://media.istockphoto.com/id/2183019893/video/textile-rolls-are-stored-on-industrial-warehouse-shelves-concept-of-textile-industry.jpg?s=640x640&k=20&c=_CUSpQivbcbDYhiVC9JoBZjNLax5PonuJeMvpBUkYUg=",
    price: "$18/m",
  },
  {
    id: 3,
    name: "Gold Silk Fabric",
    image:
      "https://media.istockphoto.com/id/2198284918/photo/flying-gold-silk-textile-fabric-flag-background-3d-rendering.jpg?s=612x612&w=0&k=20&c=8VLtwx6zQkeKj9oKvkJzqkQl5F93dlSWhpzmTC1cSZ4=",
    price: "$30/m",
  },
  {
    id: 4,
    name: "Soft Linen Fabric",
    image:
      "https://media.istockphoto.com/id/123202071/photo/crumpled-black-satin-texture-background.jpg?s=612x612&w=0&k=20&c=CPsy5lMIEwzBdOropYMBZh9E_l0BQS67tK6UMFciqGc=",
    price: "$20/m",
  },
];

export default function BestSellers() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % bestSellers.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + bestSellers.length) % bestSellers.length);

  return (
    <section
      className="relative py-20 bg-gray-900 text-white overflow-hidden"
      style={{ overflowX: "hidden" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-10 text-center">
          Best Sellers
        </h2>

        <div className="relative flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={bestSellers[current].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col md:flex-row items-center justify-center gap-8"
            >
              <motion.img
                src={bestSellers[current].image}
                alt={bestSellers[current].name}
                className="w-80 h-60 object-cover rounded-xl shadow-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  {bestSellers[current].name}
                </h3>
                <p className="text-lg mb-4">{bestSellers[current].price}</p>
                <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full font-semibold shadow-lg">
                  Shop Now
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 flex justify-between items-center w-full px-4 md:px-6">
            <button
              onClick={prevSlide}
              className="bg-blue-500/80 hover:bg-blue-600 text-white px-3 py-2 rounded-full shadow-md"
            >
              &#8592;
            </button>
            <button
              onClick={nextSlide}
              className="bg-blue-500/80 hover:bg-blue-600 text-white px-3 py-2 rounded-full shadow-md"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-3 mt-6">
          {bestSellers.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                current === idx ? "bg-blue-400 w-6" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
