import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white h-full">
      <div className="aspect-square w-full">
        <img
          src={product.images[0]}
          alt={product.name + "이미지"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 mt-[16px]">
        <h3 className="font-medium mb-2">{product.name}</h3>
        <p className="text-lg font-bold mb-2">
          {product.price.toLocaleString()}원
        </p>
        <div className="flex items-center text-gray-500">
          <Heart className="w-4 h-4 mr-1" />
          <span>{product.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
