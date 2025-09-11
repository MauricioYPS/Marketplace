import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/reducers/productsSlice";

import Cards from "../Props/Cards";
import MarketBar from "../Props/MarketBar";

export default function Marketplace() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (query) => setSearchQuery(query);
  const handleSort = (sortType) => setSortBy(sortType);

  const filteredProducts = products
    ?.filter((product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortBy === "lowest") return a.price - b.price;
      if (sortBy === "highest") return b.price - a.price;
      return 0;
    });

  return (

      <section id="marketplace" class="page-section  flex flex-col min-h-screen max-h-auto  justify-center mt-12 w-full">
        <h1 class="text-4xl font-bold text-primary mb-2 px-6 md:px-12 lg:px-24">Marketplace</h1>
        <p class="text-gray-600 mb-8 px-6 md:px-12 lg:px-24">Encuentra lo que necesitas o publica tus productos para vender.</p>


        {/* <div class="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div class="relative flex-grow w-full">
            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i>
            <input type="text" placeholder="Buscar por nombre, ej: 'Yuca', 'Servicio de Mototaxi'..." class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
            </input>
          </div>
          <div class="flex items-center gap-4 w-full md:w-auto">
            <select class="w-full md:w-auto border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Todas las categorías</option>
              <option>Alimentos y Bebidas</option>
              <option>Artesanías</option>
              <option>Hogar y Muebles</option>
              <option>Herramientas</option>
              <option>Servicios</option>
              <option>Tecnología</option>
              <option>Vehículos</option>
            </select>
            <button class="btn btn-primary">
              <span class="hidden md:block">Publicar</span>
              <i data-lucide="plus-circle" class="md:hidden"></i>
            </button>
          </div>
        </div> */}
        <div id="searcherContainer" className=" rounded-lg  w-full justify-items-start px-6 md:px-12 lg:px-24 flex h-16">
          <MarketBar onSearch={handleSearch} onSort={handleSort} />
        </div>


        {/* <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          <div class="card product-card" onclick="showProductDetail()">
            <img src="https://placehold.co/400x300/DDE2C6/333333?text=Yuca" alt="Yuca" class="w-full h-40 object-cover">
            </img>
            <div class="p-4">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Alimentos</span>
              <h3 class="font-semibold text-lg mt-2">Yuca Amarilla</h3>
              <p class="text-primary font-bold text-xl">$1,500 COP</p>
              <p class="text-gray-500 text-sm">por Libra</p>
            </div>
          </div>
          <div class="card product-card" onclick="showProductDetail()">
            <img src="https://placehold.co/400x300/A0D2DB/333333?text=Moto" alt="Mototaxi" class="w-full h-40 object-cover">
            </img>
            <div class="p-4">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Servicios</span>
              <h3 class="font-semibold text-lg mt-2">Servicio de Mototaxi</h3>
              <p class="text-primary font-bold text-xl">$3,000 COP</p>
              <p class="text-gray-500 text-sm">Carrera mínima</p>
            </div>
          </div>
          <div class="card product-card" onclick="showProductDetail()">
            <img src="https://placehold.co/400x300/F5F5DC/333333?text=Artesanía" alt="Artesanía local" class="w-full h-40 object-cover">
            </img>
            <div class="p-4">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Artesanías</span>
              <h3 class="font-semibold text-lg mt-2">Chinchorro de Moriche</h3>
              <p class="text-primary font-bold text-xl">$150,000 COP</p>
              <p class="text-gray-500 text-sm">Unidad</p>
            </div>
          </div>
          <div class="card product-card" onclick="showProductDetail()">
            <img src="https://placehold.co/400x300/DDE2C6/333333?text=Machete" alt="Machete" class="w-full h-40 object-cover">
            </img>
            <div class="p-4">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Herramientas</span>
              <h3 class="font-semibold text-lg mt-2">Machete con estuche</h3>
              <p class="text-primary font-bold text-xl">$45,000 COP</p>
              <p class="text-gray-500 text-sm">Unidad</p>
            </div>
          </div>
          <div class="card product-card" onclick="showProductDetail()">
            <img src="https://placehold.co/400x300/A0D2DB/333333?text=Celular+Usado" alt="Celular Usado" class="w-full h-40 object-cover">
            </img>
            <div class="p-4">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Tecnología</span>
              <h3 class="font-semibold text-lg mt-2">Celular Usado</h3>
              <p class="text-primary font-bold text-xl">$250,000 COP</p>
              <p class="text-gray-500 text-sm">Buen estado</p>
            </div>
          </div>
          <div class="card product-card" onclick="showProductDetail()">
            <img src="https://placehold.co/400x300/F5F5DC/333333?text=Queso+Llanero" alt="Queso Llanero" class="w-full h-40 object-cover">
            </img>
            <div class="p-4">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Alimentos</span>
              <h3 class="font-semibold text-lg mt-2">Queso Siete Cueros</h3>
              <p class="text-primary font-bold text-xl">$12,000 COP</p>
              <p class="text-gray-500 text-sm">por Libra</p>
            </div>
          </div>
        </div> */}
        <section id="marketplaceContainer" className=" w-full h-full ">
          <Cards products={filteredProducts} loading={loading} error={error} />
        </section>

      </section>

  );
}
