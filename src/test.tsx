"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Trash2,
  Download,
  Layers,
  Package,
  ShoppingBag,
  X,
} from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: string
  stock: number
  status: string
  image: string
  description: string
}

export default function Products() {
  const [search, setSearch] = useState("")
  const [slideType, setSlideType] = useState<null | "add" | "edit" | "view" | "delete">(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([
    {
      id: "#P101",
      name: "Ankara Royal Pattern",
      category: "Ankara",
      price: "₦12,000",
      stock: 45,
      status: "Available",
      image: "https://images.unsplash.com/photo-1618354691373-8e0cd5c8c83b",
      description: "Beautiful Ankara royal pattern perfect for elegant and stylish outfits.",
    },
    {
      id: "#P102",
      name: "Plain Cotton Material",
      category: "Cotton",
      price: "₦9,500",
      stock: 23,
      status: "Low Stock",
      image: "https://images.unsplash.com/photo-1618354887831-0f1bfa9a5c5d",
      description: "Soft and durable plain cotton material suitable for casual and formal wear.",
    },
    {
      id: "#P103",
      name: "African Wax Print",
      category: "Wax",
      price: "₦15,800",
      stock: 0,
      status: "Out of Stock",
      image: "https://images.unsplash.com/photo-1589216532372-fbc98d35f8c4",
      description: "Colorful African wax print ideal for traditional attires and creative designs.",
    },
  ])

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "text-green-500 bg-green-500/10"
      case "Low Stock":
        return "text-yellow-500 bg-yellow-500/10"
      case "Out of Stock":
        return "text-red-500 bg-red-500/10"
      default:
        return "text-gray-500 bg-gray-500/10"
    }
  }

  const openSlide = (type: "add" | "edit" | "view" | "delete", product?: Product) => {
    setSelectedProduct(product || null)
    setSlideType(type)
  }

  const closeSlide = () => setSlideType(null)

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const newProduct: Product = {
      id: "#P" + (Math.floor(Math.random() * 1000) + 100),
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      stock: Number(formData.get("stock")),
      status: formData.get("status") as string,
      image: (formData.get("image") as string) || "",
      description: (formData.get("description") as string) || "",
    }

    setProducts([newProduct, ...products])
    closeSlide()
  }

  const handleEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedProduct) return
    const formData = new FormData(e.currentTarget)

    const updatedProduct: Product = {
      ...selectedProduct,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      stock: Number(formData.get("stock")),
      status: formData.get("status") as string,
      image: (formData.get("image") as string) || "",
      description: (formData.get("description") as string) || "",
    }

    setProducts(products.map((p) => (p.id === selectedProduct.id ? updatedProduct : p)))
    closeSlide()
  }

  const handleDeleteProduct = () => {
    if (!selectedProduct) return
    setProducts(products.filter((p) => p.id !== selectedProduct.id))
    closeSlide()
  }

  return (
    <motion.div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-black text-white px-4 sm:px-6 lg:px-10 py-8 overflow-y-auto pb-24">
      <div className="max-w-[2000px] mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Products</h1>
            <p className="text-gray-400">Manage, edit, and track all textile products in your inventory</p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-900 text-gray-200 pl-9 pr-4 py-2 rounded-lg border border-gray-800 focus:ring-2 focus:ring-blue-600 outline-none w-full"
              />
            </div>

            <div className="flex flex-row flex-wrap justify-between sm:justify-start gap-3 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg transition-all flex-1 sm:flex-none">
                <Filter size={18} /> Filter
              </button>
              <button
                onClick={() => openSlide("add")}
                className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all flex-1 sm:flex-none"
              >
                <Plus size={18} /> Add
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg transition-all flex-1 sm:flex-none">
                <Download size={18} /> Export
              </button>
            </div>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
            <Layers className="text-blue-500" size={32} />
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <h3 className="text-xl font-bold">{products.length}</h3>
            </div>
          </div>

          <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
            <ShoppingBag className="text-green-500" size={32} />
            <div>
              <p className="text-gray-400 text-sm">Available Stock</p>
              <h3 className="text-xl font-bold">{products.reduce((sum, p) => sum + p.stock, 0)}</h3>
            </div>
          </div>

          <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
            <Package className="text-yellow-500" size={32} />
            <div>
              <p className="text-gray-400 text-sm">Low / Out of Stock</p>
              <h3 className="text-xl font-bold">{products.filter((p) => p.status !== "Available").length}</h3>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-900/70 border border-gray-800 rounded-2xl shadow-md hover:shadow-blue-900/30 transition-all overflow-hidden flex flex-col"
            >
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.category}</p>
                  <p className="text-blue-400 font-semibold mt-2">{product.price}</p>
                  <p className="text-sm text-gray-400">Stock: {product.stock}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={() => openSlide("view", product)} className="p-2 hover:bg-gray-800 rounded-full">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => openSlide("edit", product)} className="p-2 hover:bg-blue-700 rounded-full">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => openSlide("delete", product)} className="p-2 hover:bg-red-700 rounded-full">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SLIDE-OVER PANEL */}
      <AnimatePresence>
        {slideType && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 w-full max-w-md h-full shadow-2xl p-6 overflow-y-auto relative border-l border-gray-800"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
            >
              <button
                onClick={closeSlide}
                className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
              >
                <X size={22} />
              </button>

              {slideType === "add" && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-blue-400">Add New Product</h2>
                  <form onSubmit={handleAddProduct} className="flex flex-col gap-3">
                    <FormFields />
                    <button
                      type="submit"
                      className="bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-lg mt-2 transition"
                    >
                      Add Product
                    </button>
                  </form>
                </>
              )}

              {slideType === "edit" && selectedProduct && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-blue-400">Edit Product</h2>
                  <form onSubmit={handleEditProduct} className="flex flex-col gap-3">
                    <FormFields product={selectedProduct} />
                    <button
                      type="submit"
                      className="bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-lg mt-2 transition"
                    >
                      Save Changes
                    </button>
                  </form>
                </>
              )}

              {slideType === "view" && selectedProduct && (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-blue-400">{selectedProduct.name}</h2>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-52 object-cover rounded-lg mb-3"
                  />
                  <p className="text-gray-400">{selectedProduct.description}</p>
                  <p className="text-blue-400 font-semibold">{selectedProduct.price}</p>
                  <p className="text-sm text-gray-400">
                    Stock: {selectedProduct.stock} • {selectedProduct.status}
                  </p>
                </div>
              )}

              {slideType === "delete" && selectedProduct && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-red-500">Delete Product</h2>
                  <p className="text-gray-400 mb-4">
                    Are you sure you want to delete{" "}
                    <span className="text-blue-400">{selectedProduct.name}</span>?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDeleteProduct}
                      className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={closeSlide}
                      className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ✅ Reusable FormFields component
function FormFields({ product }: { product?: Product }) {
  return (
    <>
      <input
        name="name"
        defaultValue={product?.name}
        placeholder="Product Name"
        className="p-2 rounded-lg bg-gray-800 border border-gray-700 outline-none"
        required
      />
      <input
        name="category"
        defaultValue={product?.category}
        placeholder="Category"
        className="p-2 rounded-lg bg-gray-800 border border-gray-700 outline-none"
        required
      />
      <input
        name="price"
        defaultValue={product?.price}
        placeholder="Price"
        className="p-2 rounded-lg bg-gray-800 border border-gray-700 outline-none"
        required
      />
      <input
        name="stock"
        type="number"
        defaultValue={product?.stock}
        placeholder="Stock"
        className="p-2 rounded-lg bg-gray-800 border border-gray-700 outline-none"
        required
      />
      <select
        name="status"
        defaultValue={product?.status}
        className="p-2 rounded-lg bg-gray-800 border border-gray-700 outline-none"
        required
      >
        <option>Available</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>
      <input
        name="image"
        defaultValue={product?.image}
        placeholder="Image URL"
        className="p-2 rounded-lg bg-gray-800 border border-gray-700 outline-none"
      />
      <textarea
        name="description"
        defaultValue={product?.description}
        placeholder="Description"
        className="p-2 rounded-lg bg-gray-800 border border-gray-700 outline-none min-h-[100px]"
      />
    </>
  )
}
