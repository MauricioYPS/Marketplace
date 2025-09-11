import { useState } from "react";

export default function MarketBar({ onSearch, onSort }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSort = (type) => {
    setSortBy(type);
    onSort(type);
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="bg-white w-[75%] h-full flex items-center gap-5 px-4 rounded-lg shadow-sm  lg:w-[35%] md:w-[65%]">
      {/* Botón de Menú Hamburguesa */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={toggleMenu}
          className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100"
          aria-label="Abrir filtros"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/8369/8369197.png" 
            alt="Menú" 
            className="w-5 h-5"
          />
          <span className="hidden sm:inline-block text-gray-700">Filtrar</span>
        </button>

        {isMenuOpen && (
          <div className="absolute left-1/2 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 transform -translate-x-1/2">
            <div className="p-2">
              <button
                onClick={() => handleSort("lowest")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  sortBy === "lowest" ? "bg-amber-50 text-amber-600" : "hover:bg-gray-100"
                }`}
              >
                Menor precio
              </button>
              <button
                onClick={() => handleSort("highest")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  sortBy === "highest" ? "bg-amber-50 text-amber-600" : "hover:bg-gray-100"
                }`}
              >
                Mayor precio
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Barra de Búsqueda */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/8369/8369274.png" 
            alt="Buscar" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
          />
          <input
            type="text"
            placeholder={screen.width < 768 ? "uscar..." : "Buscar por nombre..."}
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                onSearch("");
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/5254/5254940.png" 
                alt="Limpiar búsqueda" 
                className="w-4 h-4"
              />
            </button>
          )}
        </div>
      </div>

      {/* Icono de Favoritos */}
      <div className="flex items-center justify-center">
        <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Ver lista de deseos">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/8189/8189263.png" 
            alt="Favoritos" 
            className="w-7 h-7"
          />
        </button>
      </div>
    </div>
  );
}
