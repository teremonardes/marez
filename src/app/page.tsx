import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import BrandStatement from "@/src/components/BrandStatement";
import Services from "@/src/components/Services";
import About from "@/src/components/About";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <BrandStatement />
        <About />
        <Services />
      </main>

      <Footer />
    </>
  );
}
