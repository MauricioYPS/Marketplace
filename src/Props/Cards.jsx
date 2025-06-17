import { useState } from "react";

export default function Cards({ products = [], loading, error }) {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
       <div className="flex flex-wrap gap-6 justify-center mt-10"
    >
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white w-full max-w-xs h-80 rounded-lg shadow-md overflow-hidden 
                   hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
        >
          <button
            onClick={() => toggleFavorite(product._id)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm 
                       hover:bg-gray-100 transition-colors duration-200 active:scale-110"
            aria-label={favorites[product._id] ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {favorites[product._id] ? (
              <img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/535/535183.png" alt="Favorito" />
            ) : (
              <img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/535/535285.png" alt="No favorito" />
            )}
          </button>

          <div className="w-full h-3/4 bg-gray-100 flex justify-center items-center">
            {product.photoUrl ? (
              <img src={product.photoUrl} alt={product.name} className="h-full object-contain" />
            ) : (
              <span className="text-gray-400">Sin imagen</span>
            )}
          </div>

          <div className="w-full h-1/4 p-3 flex flex-col justify-between">
            <p className="text-lg font-semibold text-gray-900 truncate">{product.name}</p>
            <p className="text-xl font-bold text-amber-600">${product.price?.toLocaleString()} COP</p>
          </div>
        </div>
      ))}
    </div>
  );
}
