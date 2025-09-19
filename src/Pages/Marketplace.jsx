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
      <div className="w-full flex mb-2 px-6 md:px-12 lg:px-24 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="store" class="  h-full w-auto text-accent "><path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"></path><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"></path><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"></path></svg>
        <h1 class="ml-2 text-4xl font-bold text-primary"
        >Marketplace</h1>


      </div>
      <div className="w-full px-6 md:px-12 lg:px-24 text-accent mb-2 ">
        <div className=" border-1 rounded-md"></div>
      </div>

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
