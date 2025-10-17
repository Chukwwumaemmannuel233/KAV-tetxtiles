"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";

export default function UserProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [related, setRelated] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const selected = products.find((p) => p.id === Number(id));

      if (isMounted) {
        setProduct(selected || null);
        setMainImage(selected?.img ?? null);

        // Pick 3 random related products (excluding the current one)
        const randomRelated = products
          .filter((p) => p.id !== Number(id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        setRelated(randomRelated);
        setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const showSuccessToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (!product)
    return (
      <div className="text-center mt-32 text-gray-300">
        Product not found 😢
        <br />
        <button
          onClick={() => navigate(-1)}
          className="text-blue-400 underline mt-4"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen text-white overflow-y-auto"
    >
      {/* ✅ Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
          >
            <div className="relative w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin-reverse" />
            <span className="text-sm font-medium">
              Added to Cart Successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom reverse spin */}
      <style>
        {`
          .animate-spin-reverse {
            animation: spinReverse 1s linear infinite;
          }
          @keyframes spinReverse {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
        `}
      </style>

      {/* Product Section */}
      <div className="max-w-6xl mx-auto md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Main + Sub images */}
          <div className="flex flex-col">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={mainImage || product.img}
                alt={product.name}
                className="w-full h-[350px] md:h-[450px] object-cover transition-all duration-300"
              />
            </div>

            {/* Sub Images */}
            <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
              {product.subImages?.map((src: string, index: number) => (
                <img
                  key={index}
                  src={src}
                  alt="sub"
                  onClick={() => setMainImage(src)}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 ${
                    mainImage === src
                      ? "border-blue-400 scale-105"
                      : "border-gray-700"
                  } transition`}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-3">
              {product.name}
            </h1>
            <p className="text-gray-300 mb-5 leading-relaxed">{product.desc}</p>
            <p className="text-xl text-blue-500 font-semibold mb-8">
              {product.price}
            </p>

            {/* Color Selector */}
            {product.colors && (
              <div className="mb-6">
                <h3 className="text-sm text-gray-400 mb-2">Choose Color:</h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-blue-400 scale-110"
                          : "border-gray-600"
                      } transition`}
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: parseInt(product.price.replace(/[^\d]/g, "")),
                  img: product.img,
                  quantity: 1,
                });
                showSuccessToast();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg transition"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>

        {/* 🛍️ You May Also Like Section */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl md:text-2xl font-semibold text-blue-400 mb-6">
              You may also like
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {related.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900/60 p-4 rounded-lg shadow hover:shadow-xl transition cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-36 w-full object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-sm font-semibold text-white truncate">
                    {item.name}
                  </h3>
                  <p className="text-blue-400 text-xs">{item.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
