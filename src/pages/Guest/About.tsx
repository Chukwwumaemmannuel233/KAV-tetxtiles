"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function About(): ReactNode {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulate loading delay (e.g. 2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show loading screen before main content
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16"
        />
      </div>
    );
  }

  // CEO info
  const ceos = [
    {
      name: "Ubuchukweze Victor",
      title: "Co-CEO",
      bio: "Ubuchukweze Victor is a visionary leader driving innovation and premium quality in fabrics.",
      image:
        "https://media.istockphoto.com/id/2173063058/photo/confident-businessman-and-his-team.jpg?s=612x612&w=0&k=20&c=aJYJV8akPJSM8hds5aS4e2aFZBAlizGhjBWKi7o_1GA=",
    },
    {
      name: "CEO Name Placeholder",
      title: "Co-CEO",
      bio: "This CEO leads with excellence, creativity, and a passion for quality fabrics.",
      image:
        "https://media.istockphoto.com/id/2220720426/photo/business-woman-in-the-office.jpg?s=612x612&w=0&k=20&c=fGLmxAuAresIyzYu0LJbqZOwcn3BzZbRrzsmkeg3tAw=",
    },
  ];

  const sections = [
    {
      title: "Premium Fabrics, Crafted with Care",
      text: "Our company specializes in sourcing and crafting premium fabrics that combine quality, durability, and elegance.",
      image:
        "https://media.istockphoto.com/id/166186209/photo/a-red-satin-cloth-background-with-wrinkles.jpg?s=612x612&w=0&k=20&c=WMoR3gGnHUUomws4RYXVQV03QebRaAb0WGJO9WSvPZs=",
    },
    {
      title: "Innovation Meets Tradition",
      text: "We blend traditional craftsmanship with modern techniques to create fabrics that are unique and versatile.",
      image:
        "https://media.istockphoto.com/id/873187570/photo/close-up-of-fabric-swatch-book-with-various-wools.jpg?s=612x612&w=0&k=20&c=Lst8M71YHbIOFdWRKf6pt_5qOt16rUhPX6hqS6C578U=",
    },
    {
      title: "Sustainable & Ethical Practices",
      text: "Sustainability is at the heart of what we do — from eco-friendly production to responsible sourcing.",
      image:
        "https://media.istockphoto.com/id/155285789/photo/textile-production-weaving-cotton-fabric-on-airjet-looms.jpg?s=612x612&w=0&k=20&c=hymTSX6heA1nDaS3MV6RYMR2dnLDYldP2O66OZ2xWRo=",
    },
  ];

  const gallery = [
    {
      image:
        "https://media.istockphoto.com/id/2209511574/photo/shweshwe-an-iconic-printed-cotton-fabric-from-south-africa.jpg?s=612x612&w=0&k=20&c=kvIQ7SaME88kGwqctwUEX6q77IXXI_2OYlLiAetFZPc=",
      text: "Vibrant Ankara fabric for premium fashion designs.",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1674747086849-3ec94d641ded?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
      text: "Soft cotton material perfect for everyday wear.",
    },
    {
      image:
        "https://media.istockphoto.com/id/2170279807/photo/purple-fabric-cloth-texture-for-background-and-design-art-work-beautiful-crumpled-pattern-of.jpg?s=612x612&w=0&k=20&c=zhoatUybx21BDpSAbL6WkFSFUYFHAvBqrEzNXICBmRU=",
      text: "Luxurious velvet fabric for elegant creations.",
    },
  ];

  return (
    <motion.section
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white px-6 md:px-12 py-24"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-5xl font-bold text-blue-400 mb-4">About Our Company</h1>
        <p className="text-gray-300 text-lg">
          We are passionate about providing premium fabrics that inspire creativity and innovation.
        </p>
      </motion.div>

      {/* Alternating Sections */}
      <div className="space-y-20">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 + 0.5 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center ${
              idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8`}
          >
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-400 mb-4">{section.title}</h2>
              <p className="text-gray-300 text-lg">{section.text}</p>
            </div>
            <div className="md:w-1/2">
              <img
                src={section.image}
                alt={section.title}
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* CEO Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto my-20"
      >
        <h2 className="text-4xl font-bold text-blue-400 text-center mb-12">Meet Our CEOs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {ceos.map((ceo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
            >
              <img
                src={ceo.image}
                alt={ceo.name}
                className="rounded-full w-40 h-40 object-cover mb-4"
              />
              <h3 className="text-2xl font-bold text-blue-300">{ceo.name}</h3>
              <p className="text-gray-400 font-semibold">{ceo.title}</p>
              <p className="text-gray-300 mt-2">{ceo.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fabric Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto my-20"
      >
        <h2 className="text-4xl font-bold text-blue-400 text-center mb-12">Our Fabrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <img src={item.image} alt={`Fabric ${idx + 1}`} className="w-full h-64 object-cover" />
              <p className="text-gray-300 p-4">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <h2 className="text-4xl font-bold text-blue-400 mb-6">Explore Our Collection</h2>
        <p className="text-gray-300 mb-8">
          Discover our fabrics and find the perfect materials for your next project.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition"
        >
          Shop Now
        </button>
      </motion.div>
    </motion.section>
  );
}
