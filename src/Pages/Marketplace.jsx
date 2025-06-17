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
    <div id="bodyMarketplace" className="border-2 border-yellow-400 flex flex-col w-full h-screen">
      <div id="searcherContainer" className="border-2 border-red-600 w-full h-16">
        <MarketBar onSearch={handleSearch} onSort={handleSort} />
      </div>

      <div id="marketplaceContainer" className="border-2 border-green-600 w-full h-full d-flex justify-between">
        <Cards products={filteredProducts} loading={loading} error={error} />
      </div>
    </div>
  );
}
