import { useNavigate } from "react-router-dom";
import ProductGridItem from "./ProductGridItem";
export default function Cards({ products = [], loading, error }) {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/productDetails/${id}`);
  };

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <section
      id="Products"
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-2 justify-center pt-12 px-6 md:px-12 lg:px-24 h-full w-full"
    >
      {products.map((product) => (
        <ProductGridItem
          key={product._id}
          product={product}
          onNavigate={handleNavigate}
        />
      ))}
    </section>
  );
}
