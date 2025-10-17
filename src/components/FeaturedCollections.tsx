"use client";

import { motion } from "framer-motion";

const collections = [
  {
    id: 1,
    name: "Silk Collection",
    image:
      "https://media.istockphoto.com/id/2192806905/photo/luxury-pearl-fabric-background-3d-render.jpg?s=612x612&w=0&k=20&c=G32DnzcZZS4RRMpagl41rqes1ZW7Ky7fOAoa5d-k9nE=",
  },
  {
    id: 2,
    name: "Cotton Prints",
    image:
      "https://media.istockphoto.com/id/1029136008/vector/3d-illustration-of-white-flag.jpg?s=612x612&w=0&k=20&c=V9xIO79Km-pQRWmc4JmTqMa8SJSYEf4pwPyl4mK_vcw=",
  },
  {
    id: 3,
    name: "Traditional Fabrics",
    image:
      "https://media.istockphoto.com/id/2178707215/photo/colorful-scarves-medina-fez-morocco-north-africa.jpg?s=612x612&w=0&k=20&c=JicM9j5eIuUP2cSxWiPxBdqmpiEXRDcA47aubdzccz4=",
  },
  {
    id: 4,
    name: "Bold Prints",
    image:
      "https://media.istockphoto.com/id/2188425344/photo/textured-folds-of-linen-fabric-in-beige-brown-color.jpg?s=612x612&w=0&k=20&c=i1NiaedH0lTM7qKY9TbWdV_ZvdKFIjH-zWuaCX3y4_A=",
  },
];

export default function FeaturedCollections() {
  return (
    <section
      className="py-20 bg-gray-900 text-white relative overflow-hidden"
      style={{ overflowX: "hidden" }} // 🧱 prevents horizontal scroll
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold mb-10 text-blue-400 text-center drop-shadow-lg"
        >
          Featured Collections
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden rounded-2xl cursor-pointer shadow-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
            >
              <motion.img
                src={collection.image}
                alt={collection.name}
                className="w-full h-64 object-cover transform transition-transform duration-500"
                whileHover={{ scale: 1.08 }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-lg md:text-xl font-semibold text-blue-300 tracking-wide">
                  {collection.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
