import ProductLikes from "../ProductLikes";
import defaultImage from "../../../assets/product/img_default.png";

const formatPrice = (price) => new Intl.NumberFormat("ko-KR").format(price);

export default function Product({ data }) {
  const { images, name, price, favoriteCount, ...etc } = data;

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <div className="w-full flex flex-col">
      <img
        src={images?.[0] ?? defaultImage}
        alt={name || "상품 기본 이미지"}
        onError={handleImageError}
        className="w-full h-full mb-[16px] object-cover transition-transform duration-300 ease-in-out"
      />
      <section className="flex flex-col gap-[6px] text-gray-800">
        <p className="text-sm font-medium leading-[24px]">{name}</p>
        <p className="text-base font-bold leading-[26px]">
          {formatPrice(price)}
        </p>
        <ProductLikes favoriteCount={favoriteCount} />
      </section>
    </div>
  );
}
