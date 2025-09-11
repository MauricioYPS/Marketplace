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


      
        <div id="searcherContainer" className=" rounded-lg  w-full justify-items-start px-6 md:px-12 lg:px-24 flex h-16 ">
          <MarketBar onSearch={handleSearch} onSort={handleSort} />
        </div>

        <section id="marketplaceContainer" className=" w-full h-full ">
          <Cards products={filteredProducts} loading={loading} error={error} />
        </section>

      </section>

  );
}
