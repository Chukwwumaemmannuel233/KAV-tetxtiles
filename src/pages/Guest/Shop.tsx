"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

export default function Shop() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(4);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotifications();

  // 🛍 Restore cart
  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("guestCart") || "[]"
    ) as Product[];
    setCart(stored);
  }, []);

  // 🔄 Infinite scroll with longer loading
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        if (visibleProducts < Object.keys(products).length) {
          setLoading(true);
          setTimeout(() => {
            setVisibleProducts((prev) =>
              Math.min(prev + 4, Object.keys(products).length)
            );
            setLoading(false);
          }, 2000);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, visibleProducts]);

  // 🧵 Add to cart
  // 🧵 Add to cart (fixed)
  const handleAddToCart = (product: Product) => {
    // Get existing cart items
    const storedCart = JSON.parse(
      localStorage.getItem("guestCart") || "[]"
    ) as Product[];

    // Prevent duplicates
    const isAlreadyInCart = storedCart.some((item) => item.id === product.id);
    if (isAlreadyInCart) {
      addNotification(
        "Already Added",
        `${product.name} is already in your cart.`,
        "blue"
      );
      return;
    }

    // Add product
    const updated = [...storedCart, product];
    localStorage.setItem("guestCart", JSON.stringify(updated));
    setCart(updated);

    // ✅ Show success toast
    addNotification(
      "Added to Cart",
      `${product.name} has been added to your cart.`,
      "green"
    );
  };

  // 💳 Checkout logic (opens modal)
  const handleCheckout = () => {
    setShowSignupModal(true);
  };

  // 🔹 Products
  const products: { [key: string]: Product } = {
    1: {
      id: 1,
      name: "Royal Ankara",
      price: "₦8,500",
      description:
        "Vibrant African Ankara fabric with unique color patterns for premium fashion wear.",
      image:
        "https://media.istockphoto.com/id/2209511574/photo/shweshwe-an-iconic-printed-cotton-fabric-from-south-africa.jpg?s=612x612&w=0&k=20&c=kvIQ7SaME88kGwqctwUEX6q77IXXI_2OYlLiAetFZPc=",
    },
    2: {
      id: 2,
      name: "Pure Cotton Fabric",
      price: "₦6,200",
      description:
        "Soft and breathable cotton fabric perfect for casual and professional outfits.",
      image:
        "https://plus.unsplash.com/premium_photo-1674747086849-3ec94d641ded?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRleHRpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    },
    3: {
      id: 3,
      name: "Luxury Linen Material",
      price: "₦9,000",
      description:
        "High-end linen known for its lightweight and durability, ideal for warm weather.",
      image:
        "https://media.istockphoto.com/id/2164628087/photo/blue-sports-clothing-fabric-football-shirt-jersey-texture.jpg?s=612x612&w=0&k=20&c=tOFVOPH1vs-LGKIag6zW8qabF9Ogdp72rzSXZnbjyPQ=",
    },
    4: {
      id: 4,
      name: "African Wax Print",
      price: "₦7,800",
      description:
        "Classic wax prints with bold motifs that celebrate African heritage and style.",
      image:
        "https://media.istockphoto.com/id/91697992/photo/mayan-blankets.jpg?s=612x612&w=0&k=20&c=7cprqjzrNQWWb3MCr23rC_HUuOWfLI8u7i6La02zQOw=",
    },
    5: {
      id: 5,
      name: "Velvet Material",
      price: "₦10,500",
      description:
        "Luxurious and soft velvet fabric that adds class and richness to any design.",
      image:
        "https://media.istockphoto.com/id/123202071/photo/crumpled-black-satin-texture-background.jpg?s=612x612&w=0&k=20&c=CPsy5lMIEwzBdOropYMBZh9E_l0BQS67tK6UMFciqGc=",
    },
    6: {
      id: 6,
      name: "Chiffon Fabric",
      price: "₦5,500",
      description:
        "Elegant and light chiffon material perfect for dresses and evening wear.",
      image:
        "https://media.istockphoto.com/id/171147662/photo/smoky-gauze-fabric.jpg?s=612x612&w=0&k=20&c=lDi8dxfJgVr9pGIGyW67pqm8DFFRwmBJxtqH9-jP0NE=",
    },
    7: {
      id: 7,
      name: "Silk Crepe",
      price: "₦12,000",
      description:
        "Smooth, glossy silk crepe ideal for classy gowns and traditional attires.",
      image:
        "https://media.istockphoto.com/id/1410764223/photo/blue-crepe-satin-crumpled-or-wavy-fabric-texture-background-abstract-linen-cloth-soft-waves.jpg?s=612x612&w=0&k=20&c=Zjm1IwAYIaShzM2u6HjSr123V3RAmOGmnToNrp8ZaJs=",
    },
    8: {
      id: 8,
      name: "Brocade Pattern",
      price: "₦11,800",
      description:
        "Brocade material with rich embossed designs — perfect for luxury fashion lines.",
      image:
        "https://media.istockphoto.com/id/157580047/photo/red-silk-wallpaper-with-ornaments.jpg?s=612x612&w=0&k=20&c=VgREC9hTA2R9ILRVZdEQbBgff_FmrrD_tEwKIdVaNH8=",
    },
    9: {
      id: 9,
      name: "Adire Indigo",
      price: "₦7,000",
      description:
        "Traditional Nigerian Adire dye patterns on soft cotton material.",
      image:
        "https://images.pexels.com/photos/4491421/pexels-photo-4491421.jpeg",
    },
    10: {
      id: 10,
      name: "Polished Cotton",
      price: "₦8,000",
      description:
        "Polished cotton with smooth texture and vibrant colors suitable for any style.",
      image:
        "https://images.pexels.com/photos/1670761/pexels-photo-1670761.jpeg",
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-black text-white py-24 px-6 md:px-12">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-blue-400"
        >
          Shop Our Premium Fabrics
        </motion.h1>
        <p className="text-gray-300 mt-4 text-lg">
          Discover luxury, sustainability, and beauty — all woven into every
          fabric.
        </p>
      </div>

      {/* 🧶 Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <AnimatePresence>
          {Object.values(products)
            .slice(0, visibleProducts)
            .map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-5 rounded-xl shadow-lg flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg h-56 w-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-300">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 flex-1">
                  {product.description}
                </p>
                <p className="text-gray-200 text-lg mt-3">{product.price}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2"
                  >
                    <ShoppingCart size={18} /> Add
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-blue-300 hover:text-blue-400 font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-400 mt-8 animate-pulse">
          Loading more products...
        </p>
      )}

      {/* Checkout Button */}
      {cart.length > 0 && (
        <div className="flex justify-center mt-16">
          <button
            onClick={handleCheckout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition"
          >
            Proceed to Checkout ({cart.length})
          </button>
        </div>
      )}

      {/* 🧾 Sign Up Modal (Triggered by Checkout) */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-md text-center shadow-2xl relative"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-3">
                Ready to Complete Your Purchase?
              </h2>
              <p className="text-gray-300 mb-6">
                You’re almost there! Sign up or log in to enjoy seamless
                checkout, track your orders, and access exclusive fabric
                collections.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold"
                >
                  Log In
                </button>
              </div>
              <button
                onClick={() => setShowSignupModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔍 Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-xl p-6 max-w-md text-center relative"
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="rounded-lg h-60 w-full object-cover mb-4"
              />
              <h2 className="text-2xl font-bold text-blue-400 mb-2">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-300 mb-4">
                {selectedProduct.description}
              </p>
              <p className="text-gray-200 text-lg font-semibold mb-4">
                {selectedProduct.price}
              </p>
              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
