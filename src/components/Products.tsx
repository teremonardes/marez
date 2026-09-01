import ProductCard from "@/src/components/ProductCard";
import { products } from "@/src/data/products";

export default function Products() {
  return (
    <section
      id="productos"
      aria-label="Productos"
      className="bg-[var(--olive-green)] px-5 pb-24 pt-32 sm:px-8 sm:pb-28 sm:pt-36 lg:px-12 lg:pb-36"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 3}
          />
        ))}
      </div>
    </section>
  );
}
