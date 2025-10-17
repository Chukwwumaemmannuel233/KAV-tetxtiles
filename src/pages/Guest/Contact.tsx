"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, SendHorizonal } from "lucide-react";

export default function Contact() {
  const contactDetails = [
    {
      title: "Address",
      text: "Opp Evangel Academy, Kubwa, Abuja",
      icon: <MapPin className="w-7 h-7 text-blue-400" />,
    },
    {
      title: "Phone",
      text: "08161770490",
      icon: <Phone className="w-7 h-7 text-blue-400" />,
    },
    {
      title: "Email",
      text: "echukwma561@gmail.com",
      icon: <Mail className="w-7 h-7 text-blue-400" />,
    },
    {
      title: "Working Hours",
      text: "Mon – Sat: 9:00 AM – 6:00 PM",
      icon: <Clock className="w-7 h-7 text-blue-400" />,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 800);
  };

  return (
    <section className="bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white overflow-hidden">
      {/* ✅ Success Message */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50"
        >
          Message sent successfully! We’ll get back to you shortly.
        </motion.div>
      )}

      {/* 🌟 Hero Section */}
      <motion.div
        className="relative w-full h-[65vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1600&q=80')", // elegant textile/fabric vibe
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Let’s talk about fabrics, creativity, and craftsmanship. Whether
            it’s bulk production, premium custom materials, or creative
            collaborations — we’d love to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all text-lg font-medium shadow-md">
              Contact Our Team
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* 💬 Why Reach Out Section */}
      <motion.div
        className="max-w-6xl mx-auto py-24 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div>
          <h2 className="text-4xl font-bold text-blue-400 mb-6">
            Why Reach Out to Us?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            At <span className="font-semibold text-blue-300">Kav Textiles</span>
            , we value every inquiry as an opportunity to connect, collaborate,
            and craft something extraordinary. Whether it’s a bulk order,
            partnership, or personalized fabric design, our experts are here to
            help.
          </p>
          <p className="text-gray-400">
            We respond promptly and handle every request with care — because
            your ideas deserve the best materials and attention to detail.
          </p>
        </div>
        <motion.img
          src="https://media.istockphoto.com/id/2157163364/video/manufacturing-worker-preparing-leather-fabrics-to-cut-them-at-a-shoe-factory.jpg?s=640x640&k=20&c=bdnA8XiW6kUxvcidF4RhKYqjW7jg3YSijLKOylMSyZE="
          alt="Fabric workspace"
          className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* 🏢 Contact Info Section */}
      <motion.div
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {contactDetails.map((info, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative group bg-gradient-to-b from-gray-950 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800 hover:border-blue-400/60 hover:shadow-blue-500/20 transition-all duration-500"
          >
            {/* Icon */}
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-400/30 group-hover:scale-105 transition-transform duration-300">
              {info.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2 tracking-wide group-hover:text-blue-400 transition-colors">
              {info.title}
            </h3>

            {/* Text */}
            <p className="text-gray-400 text-sm leading-relaxed">{info.text}</p>

            {/* Accent line */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-500 group-hover:w-full"></span>
          </motion.div>
        ))}
      </motion.div>

      {/* 📬 Contact Form & Map */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24 px-6">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-10 rounded-3xl shadow-2xl border border-gray-800/50 backdrop-blur-md"
        >
          <h3 className="text-3xl font-bold text-blue-400 mb-6 tracking-wide">
            Send Us a Message
          </h3>
          <p className="text-gray-400 mb-8 leading-relaxed text-sm">
            Have questions about our premium fabrics or want to start a project?
            Fill the form below and our team will get back to you shortly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="p-4 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:bg-gray-800 transition-all"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="p-4 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:bg-gray-800 transition-all"
            />
          </div>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-4 mb-6 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:bg-gray-800 transition-all"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="w-full p-4 mb-8 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:bg-gray-800 transition-all resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            Send Message
            <SendHorizonal className="w-5 h-5" />
          </button>
        </motion.form>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-3xl overflow-hidden shadow-2xl border border-gray-800/50"
        >
          <iframe
            title="Kav Textiles Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.158711613799!2d7.3414!3d9.1538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b6eac5d8e23%3A0x5e8a4c93efee8d8a!2sEvangel%20Academy%2C%20Kubwa!5e0!3m2!1sen!2sng!4v1694168356111!5m2!1sen!2sng"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>

      {/* 💬 CTA Section */}
      <motion.div
        className="relative text-center py-16 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 rounded-3xl overflow-hidden shadow-2xl border border-gray-800/50"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
            Let’s Create Something Beautiful Together
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed text-base">
            Whether it’s custom fabric, wholesale partnership, or design
            collaboration — we’re ready to bring your vision to life with our
            premium textiles.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/shop")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium text-base shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="bg-transparent border border-blue-500/60 hover:bg-blue-500/10 text-blue-400 px-8 py-3 rounded-full font-medium text-base transition-all duration-300"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
