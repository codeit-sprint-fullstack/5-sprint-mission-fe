import { colorChips } from "@/shared/styles/colorChips";
import { CircularProgress, Stack } from "@mui/material";
import {
  useDeleteCodeitProduct,
  useGetCodeitProductDetail,
} from "../../core/hooks/useProductDetailQuery";
import { formatDate } from "@/shared/utils/getFormattedDate";
import { useRouter } from "next/navigation";
import { ProductImage } from "./core/components/ProductImage";
import { ProductHeader } from "./core/components/ProductHeader";
import { ProductDesc } from "./core/components/ProductDesc";
import { ProductWriterInfo } from "./core/components/ProductWriterInfo";
import { useProductFavoriteHook } from "@/app/items/core/hooks/useProductFavoriteHook";

export const ProductDetails = ({ itemId }: { itemId: string }) => {
  const router = useRouter();
  const { data, isLoading } = useGetCodeitProductDetail(itemId);
  const { mutate: deleteProduct } = useDeleteCodeitProduct();
  const { isFavorite, handleToggleFavorite } = useProductFavoriteHook({
    productId: itemId,
    initialFavorite: data?.isFavorite ?? false,
  });

  if (isLoading || !data) {
    return (
      <Stack
        sx={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={30} />
      </Stack>
    );
  }

  const {
    name,
    description,
    price,
    images,
    tags,
    favoriteCount,
    ownerNickname,
    createdAt,
  } = data;

  // api에서 상품 작성자 프로필이미지를 안보내고 있어서 디폴트 이미지 사용
  const defaultProfileImg = "/assets/default_profile.png";
  const formattedDate = formatDate(createdAt);
  const formattedPrice = `${new Intl.NumberFormat("ko-KR").format(price)}원`;

  const handleUpdate = () => {
    router.push(`/items/${itemId}/edit`);
    //TODO: 수정하기 페이지 추가하기
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteProduct({ productId: itemId });
      router.push("/items");
    }
  };

  return (
    <Stack sx={productDetailsSx}>
      <ProductImage images={images} />
      <Stack sx={productContentSx}>
        <ProductHeader
          name={name}
          formattedPrice={formattedPrice}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
        <ProductDesc description={description} tags={tags} />
        <ProductWriterInfo
          defaultProfileImg={defaultProfileImg}
          ownerNickname={ownerNickname}
          formattedDate={formattedDate}
          favoriteCount={favoriteCount}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </Stack>
    </Stack>
  );
};

const productDetailsSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: { xs: "16px", md: "24px" },
  paddingBottom: { xs: "24px", sm: "32px", md: "40px" },
  borderBottom: `1px solid ${colorChips.gray200}`,
};

const productContentSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};
