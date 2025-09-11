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

    //   <img src="https://placehold.co/400x300/F5F5DC/333333?text=Queso+Llanero" alt="Queso Llanero" class="w-full h-40 object-cover">
    //   </img>
    //   <div class="p-4">
    //     <span class=" ">Alimentos</span>
    //     <h3 class="font-semibold text-lg mt-2">Queso Siete Cueros</h3>
    //     <p class="text-primary font-bold text-xl">$12,000 COP</p>
    //     <p class="text-gray-500 text-sm">por Libra</p>
    //   </div>
    // </div>
    <section id="Products" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-x-2 gap-y-2 justify-center pt-12 h-full w-full px-2">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative cursor-pointer select-none rounded-sm overflow-hidden hover:border-1
             ring-1 ring-black/5 bg-white  "
        >
          {/* Imagen */}
          <div
            className="bg-white w-full aspect-[4/3] flex items-center justify-center"
            onClick={() => handleNavigate(product._id)}
          >
            {product.photoUrl ? (
              <img
                src={product.photoUrl}
                alt={product.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain p-3 transition-transform duration-200"
              />
            ) : (
              <span className="text-gray-400">Sin imagen</span>
            )}
          </div>

          {/* INFO ABAJO — fondo igual al de la sección (usa bg-inherit) */}
          <div className="bg-inherit px-4 pt-3 pb-4">
            {/* Categoría */}
            <div className="mb-2">
              <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full 
                       bg-gray-100 text-gray-700">
                {product.category || "General"}
              </span>
            </div>

            {/* Nombre (2 líneas) */}
            <p
              title={product.name}
              onClick={() => handleNavigate(product._id)}
              className="text-[15px] font-semibold leading-5 text-gray-900 hover:underline 
                 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
            >
              {product.name}
            </p>

            {/* Precio + unidad */}
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-xl font-semibold text-amber-600">
                ${product.price?.toLocaleString("es-CO")} COP
              </p>
              {product.unit && <span className="text-xs text-gray-500">/ {product.unit}</span>}
            </div>
          </div>

          {/* Favorito (sobre la zona de imagen) */}
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product._id);
            }}
            aria-pressed={!!favorites[product._id]}
            aria-label={favorites[product._id] ? "Quitar de favoritos" : "Añadir a favoritos"}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur
               ring-1 ring-black/10 shadow-sm hover:bg-white active:scale-95"
          >
            {favorites[product._id] ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-rose-600">
                <path d="M12 21s-7.3-4.35-9.33-8.18C1.3 9.74 3.14 6.5 6.2 6.5c1.73 0 3.02.96 3.8 2.06.78-1.1 2.07-2.06 3.8-2.06 3.06 0 4.9 3.24 3.53 6.32C19.3 16.65 12 21 12 21z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-gray-700 fill-none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
                  strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button> */}
        </div>

      ))}
    </section>
  );
}
