import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { CircularProgress, Stack } from "@mui/material";
import {
  useDeleteCodeitProduct,
  useGetCodeitProductDetail,
} from "../../core/hooks/useProductDetailQuery";
import { EditEllipsis } from "@/shared/components/EditEllipsis";
import { formatDate } from "@/shared/utils/getFormattedDate";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ProductDetails = ({ itemId }: { itemId: string }) => {
  const router = useRouter();
  const { data, isLoading } = useGetCodeitProductDetail(itemId);
  const { mutate: deleteProduct } = useDeleteCodeitProduct();

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
    isFavorite,
    name,
    description,
    price,
    images,
    tags,
    favoriteCount,
    ownerNickname,
    createdAt,
  } = data;

  const defaultProfileImg = "/assets/default_profile.png";
  const formattedDate = formatDate(createdAt);

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
      <Stack sx={productHeaderSx}>
        <Stack sx={productTitleSx}>
          <Typo
            className="text20Bold"
            content={name}
            color={colorChips.gray800}
          />
          <EditEllipsis onUpdate={handleUpdate} onDelete={handleDelete} />
        </Stack>
        <Stack sx={userInfoSx}>
          <Stack
            sx={{ flexDirection: "row", alignItems: "center", gap: "16px" }}
          >
            <Image
              src={defaultProfileImg}
              alt="profile"
              width={40}
              height={40}
            />
            <Stack
              sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}
            >
              <Typo
                className="text14Medium"
                content={ownerNickname}
                color={colorChips.gray600}
                customStyle={{ whiteSpace: "nowrap" }}
              />
              <Typo
                className="text14Regular"
                content={formattedDate}
                color={colorChips.gray400}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: { xs: "16px", md: "32px" },
              height: "40px",
              marginRight: { xs: "16px", md: "32px" },
              borderRight: `1px solid ${colorChips.gray200}`,
            }}
          />
          <Stack sx={favoriteCountSx}>
            <Image
              src="/assets/ic_heart_gray5.svg"
              alt="favorite"
              width={32}
              height={32}
              style={{ cursor: "pointer" }}
            />
            <Typo
              className="text16Medium"
              content={favoriteCount.toString()}
              color={colorChips.gray500}
            />
          </Stack>
        </Stack>
      </Stack>
      <Typo
        className="text18Regular"
        content={description}
        color={colorChips.gray900}
      />
    </Stack>
  );
};

const productDetailsSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "24px",
};

const productHeaderSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "16px",
  paddingBottom: "16px",
  borderBottom: `1px solid ${colorChips.gray200}`,
};

const productTitleSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
};

const userInfoSx = {
  width: "100%",
  height: "40px",
  flexDirection: "row",
  alignItems: "center",
};

const favoriteCountSx = {
  width: "fit-content",
  height: "40px",
  borderRadius: "35px",
  border: `1px solid ${colorChips.gray200}`,
  padding: "4px 12px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};
