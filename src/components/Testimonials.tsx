"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Amaka Johnson",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Kav Textiles provides the most luxurious fabrics I've ever used. The quality is unmatched!",
  },
  {
    id: 2,
    name: "Tunde Ade",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Fast delivery and the designs are just breathtaking. I love shopping here!",
  },
  {
    id: 3,
    name: "Chinelo Obi",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "Affordable prices without compromising on quality. Kav Textiles is my go-to store.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white py-24 px-6 md:px-12 overflow-hidden"
      style={{ overflowX: "hidden" }}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 drop-shadow-lg">
          Testimonials
        </h2>
        <p className="text-gray-300 mt-4 text-base md:text-lg">
          See what our happy customers have to say about Kav Textiles.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-3xl mx-auto relative px-4 sm:px-6 md:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[current].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="bg-gray-900/80 p-8 md:p-10 rounded-2xl shadow-lg flex flex-col items-center gap-5 text-center border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
          >
            <motion.img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-400 shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <p className="text-gray-300 italic leading-relaxed max-w-2xl">
              “{testimonials[current].quote}”
            </p>
            <h3 className="text-blue-400 font-semibold text-lg">
              {testimonials[current].name}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                current === index ? "bg-blue-400 w-6" : "bg-gray-600"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
