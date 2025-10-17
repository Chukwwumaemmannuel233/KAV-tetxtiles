"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../data/products";


export default function UserShop() {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);

  

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        !loadingMore &&
        !endReached &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        setLoadingMore(true);
        setTimeout(() => {
          setVisibleCount((prev) => {
            const next = prev + 6;
            if (next >= products.length) {
              setEndReached(true);
              return products.length;
            }
            return next;
          });
          setLoadingMore(false);
        }, 2500);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, loadingMore, endReached]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h1 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6 mt-6">
        Shop Fabrics 🧵
      </h1>
      <p className="text-gray-300 text-sm md:text-base mb-8">
        Explore our collection of high-quality fabrics.
      </p>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 pb-32">
            <AnimatePresence>
              {products.slice(0, visibleCount).map((item) => (
                 <Link key={item.id || Math.random()} to={`/product/${item.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900/70 p-4 rounded-xl shadow-md hover:scale-105 transition transform"
                >
                  <div className="h-36 w-full rounded-lg mb-3 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs mb-2">{item.desc}</p>
                  <p className="text-blue-400 font-semibold">{item.price}</p>
                </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center py-6 mb-28">
            {loadingMore && !endReached && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-blue-400 text-sm"
              >
                Loading more fabrics...
              </motion.p>
            )}
            {endReached && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-400 text-sm"
              >
                You’ve reached the end 🎉
              </motion.p>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
