import { useState } from "react";

export default function Cards() {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); 
    };

    return (
        <div 
            className="mt-10 bg-white w-full max-w-xs h-80 rounded-lg shadow-md overflow-hidden 
                       hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
        >
            <button 
                onClick={toggleFavorite}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm 
                          hover:bg-gray-100 transition-colors duration-200 active:scale-110"
                aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
                {isFavorite ? (
                    <span className="text-red-500 text-xl"><img className="w-6 h-6 " src="https://cdn-icons-png.flaticon.com/512/535/535183.png" alt="" /></span> 
                ) : (
                    <span className="text-gray-400 text-xl"><img className="w-6 h-6 " src="https://cdn-icons-png.flaticon.com/512/535/535285.png" alt="" /></span> 
                )}
            </button>

            <div className="w-full h-3/4 bg-gray-100 flex justify-center items-center">
                <span className="text-gray-400">Product Image</span>
            </div>

            <div className="w-full h-1/4 p-3 flex flex-col justify-between">
                <p className="text-lg font-semibold text-gray-900 truncate">Product Name</p>
                <p className="text-xl font-bold text-amber-600">$25.000 COP</p>
            </div>
        </div>
    );
}