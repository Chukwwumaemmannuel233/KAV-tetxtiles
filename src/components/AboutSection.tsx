"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Truck, DollarSign, Star } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      title: "Quality Fabrics",
      description: "Premium textiles crafted to make your fashion stand out.",
      icon: <ShoppingBag size={36} className="text-blue-400" />,
    },
    {
      title: "Fast Delivery",
      description: "Quick shipping to get your fabrics when you need them.",
      icon: <Truck size={36} className="text-blue-400" />,
    },
    {
      title: "Affordable Prices",
      description: "Luxury fabrics at prices that suit your budget.",
      icon: <DollarSign size={36} className="text-blue-400" />,
    },
    {
      title: "Unique Designs",
      description: "Exclusive patterns that make your creations one-of-a-kind.",
      icon: <Star size={36} className="text-blue-400" />,
    },
  ];

  return (
    <section
      className="relative bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white py-24 px-6 md:px-12 overflow-hidden"
      style={{ overflowX: "hidden" }} // ensures no horizontal scroll
    >
      {/* About Kav Textiles */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-20">
        {/* Image / Visual */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 flex justify-center"
        >
          <img
            src="https://images.pexels.com/photos/374820/pexels-photo-374820.jpeg"
            alt="Kav Textiles"
            className="rounded-2xl shadow-2xl w-full max-w-md md:max-w-none object-cover h-72 sm:h-80 md:h-96 border border-gray-800"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-4">
            About Kav Textiles
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            <span className="text-blue-400 font-semibold">Kav Textiles</span> is a
            personal venture founded by two passionate partners, dedicated to
            delivering luxurious, high-quality, and sustainably sourced fabrics
            that bring your fashion ideas to life. Each piece in our collection is
            a fusion of creativity, culture, and modern elegance — perfect for
            individuals who value style and craftsmanship.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto text-center overflow-hidden">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-4xl font-bold text-blue-400 mb-12"
        >
          Why Choose Us
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2 sm:px-4 md:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center text-center gap-3 border border-gray-800 hover:border-blue-500/40 transition-all duration-300"
            >
              {feature.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
