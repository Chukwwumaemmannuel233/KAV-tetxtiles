import Hero from "../../components/Hero";
import FeaturedCollections from "../../components/FeaturedCollections";
import BestSellers from "../../components/BestSellers";
import AboutSection from "../../components/AboutSection";
import Testimonials from "../../components/Testimonials";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCollections />
       <BestSellers />
       <AboutSection />
       <Testimonials />
       <Newsletter />
       <Footer />
      {/* Add more sections later like Featured Products, Collections, etc. */}
    </div>
  );
}
