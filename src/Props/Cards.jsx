import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/reducers/itemsReducer"; // Asegúrate de tener esta ruta correcta

export default function Cards() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.items);

    const [favorites, setFavorites] = useState({}); // Para manejar favoritos por ID

    // Al montar el componente, obtener los productos
    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    // Función para alternar favoritos
    const toggleFavorite = (id) => {
        setFavorites((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (loading) return <p className="text-center mt-10">Cargando productos...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

    return (
        <div className="flex flex-wrap gap-6 justify-center mt-10">
            {items.map((item) => (
                <div
                    key={item._id} // Asegúrate que los objetos tengan _id o id
                    className="bg-white w-full max-w-xs h-80 rounded-lg shadow-md overflow-hidden 
                               hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
                >
                    <button
                        onClick={() => toggleFavorite(item._id)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm 
                                   hover:bg-gray-100 transition-colors duration-200 active:scale-110"
                        aria-label={favorites[item._id] ? "Quitar de favoritos" : "Añadir a favoritos"}
                    >
                        {favorites[item._id] ? (
                            <img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/535/535183.png" alt="Favorito" />
                        ) : (
                            <img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/535/535285.png" alt="No favorito" />
                        )}
                    </button>

                    <div className="w-full h-3/4 bg-gray-100 flex justify-center items-center">
                        {item.photoUrl ? (
                            <img src={item.photoUrl} alt={item.name} className="h-full object-contain" />
                        ) : (
                            <span className="text-gray-400">Sin imagen</span>
                        )}
                    </div>

                    <div className="w-full h-1/4 p-3 flex flex-col justify-between">
                        <p className="text-lg font-semibold text-gray-900 truncate">{item.name}</p>
                        <p className="text-xl font-bold text-amber-600">${item.price?.toLocaleString()} COP</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
