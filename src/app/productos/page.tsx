import type { Metadata } from "next";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import Products from "@/src/components/Products";

export const metadata: Metadata = {
  title: "Productos | Marez",
  description: "Colección de productos textiles personalizados de Marez.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar darkAtTop />
      <main>
        <Products />
      </main>
      <Footer />
    </>
  );
}
