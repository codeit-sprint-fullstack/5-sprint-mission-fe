import "./index.css";
import Pagination from "./components/feature/Pagination"; // 페이지네이션 컴포넌트
import Header from "./common/Header";
import SetOrder from "./components/feature/SetOrder";
import SearchBar from "./common/SearchBar";
import Footer from "./common/Footer";
import BestItemList from "./components/bestItems/BestItemList";
import ItemList from "./components/SalesItems/ItemList";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <Header />
      <div className=" max-w-[1200px] mx-auto w-full mr-auto mb-[135px] px-[16px] flex-col items-center gap-[40px]">
        <BestItemList />
        <ItemList data={data} />
      </div>
      <Footer />
    </>
  );
};

export default App;
