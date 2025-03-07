import { Stack } from "@mui/material";

export const ProductImage = ({ images }: { images: string[] }) => {
  return (
    <Stack sx={productImageContainerSx}>
      <Stack sx={productImageWrapperSx}>
        <img
          src={images[0]}
          alt="product"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "16px",
          }}
        />
      </Stack>
    </Stack>
  );
};

const productImageContainerSx = {
  width: "100%",
  maxWidth: { xs: "100%", sm: "340px", md: "486px" },
} as const;

const productImageWrapperSx = {
  width: "100%",
  position: "relative",
  paddingBottom: "100%", // 1:1 비율 유지
} as const;
