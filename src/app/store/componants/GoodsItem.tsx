import { GridItem, HStack, Image, Text } from "@chakra-ui/react";

interface GoodsItemProps {
  name: string;
  price: string;
  favoriteCount: number;
  images: string[];
}

export const GoodsItem: React.FC<GoodsItemProps> = ({
  name,
  price,
  favoriteCount,
  images,
}: GoodsItemProps) => {
  return (
    <GridItem w={221}>
      <Image
        w={221}
        h={221}
        borderRadius={16}
        src={`${images[0]}`}
        alt="No Image"
        onError={(e) => {
          e.currentTarget.src = "/no_image.png";
        }}
      />
      <Text>{name}</Text>
      <Text>{price}</Text>
      <HStack>
        <Image src="ic_heart.png" alt="favorit" />
        <Text>{favoriteCount}</Text>
      </HStack>
    </GridItem>
  );
};
