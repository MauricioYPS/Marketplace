import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Cards({ products = [], loading, error }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  function handleNavigate(id) {
    navigate(`/productDetails/${id}`);
  }

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (

    <section id="Products" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-x-2 gap-y-2 justify-center pt-12 px-6 md:px-12 lg:px-24 h-full w-full ">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative select-none rounded-sm overflow-hidden bg-[#F8F7F2] hover:border-1"
        >

          <button
            onClick={() => handleNavigate(product._id)}
            className="block w-full"
            aria-label={product.name}
          >
            <div className="relative w-full bg-white aspect-[4/3] md:aspect-[5/4]">
              {product.photoUrl ? (
                <img
                  src={product.photoUrl}
                  alt={product.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Sin imagen
                </span>
              )}
            </div>
          </button>


          <div className="px-3 py-2 md:px-4 md:py-3">

            <div className="mb-1">
              <span className="inline-flex items-center text-sm px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {product.category || "General"}
              </span>
            </div>


            <button
              onClick={() => handleNavigate(product._id)}
              title={product.name}
              className="text-sm md:text-[15px] leading-5 text-gray-900 text-left
                           overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]
                           min-h-[2.4rem]"
            >
              {product.name}
            </button>


            <div className="mt-1 flex items-baseline gap-1">
              <p className="text-base md:text-[15px] font-semibold text-amber-600">
                ${product.price?.toLocaleString("es-CO")} COP
              </p>
              {product.unit && (
                <span className="text-xs text-gray-500">/ {product.unit}</span>
              )}
            </div>
          </div>
        </div>


      ))}
    </section>
  );
}
