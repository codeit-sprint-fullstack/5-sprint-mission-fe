import SearchNav from "./components/SearchNav";
import ProductList from "./components/ProductList.jsx";
import { useState } from "react";

export default function ProductListPage() {
  const [ search, setSearch ] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="mx-auto mb-[140px] mt-[26px] max-w-[1100px] px-4">
      <SearchNav value={search} onChange={handleChange} />
      <ProductList value={search} />
    </div>
  );
}
