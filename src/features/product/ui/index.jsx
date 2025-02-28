import { Text } from "shared/ui";
import "./style.css";
import defaultImg from "shared/assets/images/item_default_img.png";
import icHeartEmpty from "shared/assets/images/ic_heart_empty.png";

export const Product = ({ img, title, price, favorite }) => {
  const isDefaultImage = !Boolean(img);

  const handleError = (e) => {
    e.target.src = defaultImg;
    e.target.classList.add("default-img");
  };

  return (
    <div className="product-wrapper">
      <div className="product-img-container">
        <img
          src={img || defaultImg}
          className={isDefaultImage ? "default-img" : ""}
          alt=""
          onError={(e) => handleError(e)}
        />
      </div>
      <Text
        size={"md"}
        weight={"medium"}
        style={{ color: "#1f2937", marginTop: "16px" }}
      >
        {title}
      </Text>
      <Text
        size={"lg"}
        weight={"bold"}
        style={{ color: "#1f2937", marginTop: "6px" }}
      >
        {price.toLocaleString("ko-kr")}원
      </Text>
      <div className="product-favorite-container">
        <img src={icHeartEmpty} alt="" />
        <Text size={"xs"} weight={"medium"} style={{ color: "#4b5563" }}>
          {favorite}
        </Text>
      </div>
    </div>
  );
};
