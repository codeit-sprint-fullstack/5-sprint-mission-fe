import { useState } from "react";
import dropDownBtn from "../../assets/img/ic_arrow_down.png";

const SetOrder = ({ setSortOrder }) => {
  const [order, setOrder] = useState("recent");
  const [visible, setVisible] = useState(false); // 드롭다운 메뉴 표시/숨김 상태

  const handleSelectChange = (e) => {
    const selectedOrder = e.target.value === "최신순" ? "recent" : "favorite";
    setOrder(e.target.value); // 드롭다운에서 선택된 값으로 상태 업데이트
    setSortOrder(selectedOrder); // 부모로 상태 변경 전달
  };

  return (
    <div className="flex items-center">
      <select
        onChange={handleSelectChange}
        className=" appearance-none border rounded-lg p-2 pr-8"
        style={{
          backgroundImage: `url(${dropDownBtn})`,
          backgroundPosition: "right 10px center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "16px",
        }}
      >
        <option value="최신순">최신순</option>
        <option value="좋아요순">좋아요순</option>
      </select>
    </div>
  );
};

export default SetOrder;
