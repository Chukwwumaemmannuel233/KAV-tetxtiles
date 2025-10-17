"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [userName, setUserName] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const fabrics = [
    { id: 1, name: "Silk Crepe", desc: "Luxury soft crepe fabric.", img: "https://media.istockphoto.com/id/1410764223/photo/blue-crepe-satin-crumpled-or-wavy-fabric-texture-background-abstract-linen-cloth-soft-waves.jpg?s=612x612&w=0&k=20&c=Zjm1IwAYIaShzM2u6HjSr123V3RAmOGmnToNrp8ZaJs=" },
    { id: 2, name: "Chiffon", desc: "Lightweight chiffon fabric.", img: "https://media.istockphoto.com/id/2149036016/photo/red-and-black-organza-fabric-macro-wavy.jpg?s=612x612&w=0&k=20&c=8GtW5C4BZH6dqwst-_Ab8Z2G49GOslfFBtywi0gwvvA=" },
    { id: 3, name: "Ankara Deluxe", desc: "Vibrant traditional prints.", img: "https://media.istockphoto.com/id/2214934348/photo/small-business-owner-of-an-african-print-ankara-fabric-shop-proudly-displaying-different.jpg?s=612x612&w=0&k=20&c=E8tj1cpCaKGZ8SwsYWSnAAjEulR9CVwq544ctJj7PAw=" },
    { id: 4, name: "Lace Gold", desc: "Elegant lace pattern fabric.", img: "https://media.istockphoto.com/id/1301349878/photo/color-straight-strip-of-lace-fabric-on-a-gray-background-elastic-silk-nylon-braid-border-use.jpg?s=612x612&w=0&k=20&c=hqmc-R3UEmHnHVvzk5xXXh9jgqkn2d1-sNvEWjMxeYA=" },
    { id: 5, name: "Velvet Touch", desc: "Smooth and soft velvet.", img: "https://media.istockphoto.com/id/175418486/photo/red-fabric-texture-of-wave-pattern-with-copy-space.jpg?s=612x612&w=0&k=20&c=rueejOPfp-xzGBviWqOXCEd1Ps8LDJ3c5qlUmYOmI6Q=" },
    { id: 6, name: "Brocade Shine", desc: "Rich textured brocade.", img: "https://media.istockphoto.com/id/2228635507/photo/luxurious-black-and-gold-fabric-texture-elegant-textile-background-for-design-projects.jpg?s=612x612&w=0&k=20&c=MiDj4X9eMPIuIugqU47CphCmAERLB3cxCO4_JCETdG0=" },
    { id: 7, name: "Adire Indigo", desc: "Hand-dyed African design.", img: "https://media.istockphoto.com/id/2193942080/photo/valentine-images-heart-red-chocolate-and-pink-ribbon-with-navy-blue-cloth-background.jpg?s=612x612&w=0&k=20&c=mFOlXWhfLXABSujFSWY3_U0tX4vpxbsaA_gqTgvoULs=" },
    { id: 8, name: "Polished Cotton", desc: "Glossy premium cotton.", img: "https://media.istockphoto.com/id/2228880114/photo/fabric-white-background.jpg?s=612x612&w=0&k=20&c=IJr2Vck0kmtfw_YhiKmtOAFrOSoYLJ1m1ZgcPoOLYRE=" },
    { id: 9, name: "Satin Glow", desc: "Luxurious shiny satin.", img: "https://media.istockphoto.com/id/1283545192/photo/sea-wave-abstract-navy-blue-black-neon-pattern-moon-light-silk-wavy-dark-texture-night-beach.jpg?s=612x612&w=0&k=20&c=8ZG1U8l0HdwdbajC0vk4UAsWvuLB85Yd6ye5Inp_mBQ=" },
    { id: 10, name: "Georgette", desc: "Crinkled lightweight texture.", img: "https://media.istockphoto.com/id/2229037331/photo/soft-fold-on-white-orange-and-green-crepe-georgette.jpg?s=612x612&w=0&k=20&c=fzXudrxDcCh9nUlPitbFzsMcDV8Pqal60P_EBVF6JjM=" },
    { id: 11, name: "Damask Pattern", desc: "Classic floral damask.", img: "https://media.istockphoto.com/id/1485096193/vector/set-of-ornate-vector-ornamenal-patterns-vintage-classic-backgrounds-collection-16-damask.jpg?s=612x612&w=0&k=20&c=pz0kPoQOizv_1GEU8YwAYXFHn7-OSHAnOGGaRxRn3IE=" },
    { id: 12, name: "Organza", desc: "Sheer and smooth organza.", img: "https://media.istockphoto.com/id/2216220378/photo/translucent-white-fabric-with-a-delicate-texture.jpg?s=612x612&w=0&k=20&c=90eVu8nvplcsUaO821hFwvjZ64cya_kyk7TBKI2Rnvg=" },
    { id: 13, name: "Khaki Stretch", desc: "Durable and comfortable.", img: "https://media.istockphoto.com/id/1363983453/video/closeup-the-motion-footage-vide-green-textile-abstract-background-clothing-industry-concept.jpg?s=640x640&k=20&c=pylWng3Bdjo38DEOyrrpjnv9C-cJJzX1PGSG4ymHL3w=" },
    { id: 14, name: "Cotton Voile", desc: "Soft breathable cotton.", img: "https://media.istockphoto.com/id/1600605278/video/white-bed-linens-on-the-bed.jpg?s=640x640&k=20&c=MPOj6dyUoGE39ypFC8znYnsZ-QsCBuFkGcFrjJyq9As=" },
    { id: 15, name: "Silk Blend", desc: "Premium silk mix fabric.", img: "https://media.istockphoto.com/id/2164799211/vector/purple-gradient-blend-background-texture-pattern.jpg?s=612x612&w=0&k=20&c=8lDRmwc63BScovcN3dkWCld95lHAH8Pcpcdz3oiRXqU=" },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.firstName || "User");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        !loadingMore &&
        !endReached &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        setLoadingMore(true);
        setTimeout(() => {
          setVisibleCount((prev) => {
            const next = prev + 4;
            if (next >= fabrics.length) {
              setEndReached(true);
              return fabrics.length;
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
      <h1 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-4 mt-6">
        Welcome, {userName} 👋
      </h1>
      <p className="text-gray-300 text-sm md:text-base mb-8">
        Explore our premium fabrics and textiles below.
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
              {fabrics.slice(0, visibleCount).map((item) => (
                <motion.div
                  key={item.id}
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
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </motion.div>
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
                No more fabrics to load 😎
              </motion.p>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
