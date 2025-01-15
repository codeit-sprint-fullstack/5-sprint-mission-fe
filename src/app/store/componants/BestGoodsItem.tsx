import { GridItem, HStack, Image, Text } from "@chakra-ui/react";

interface BestGoodsItemProps {
  name: string;
  price: string;
  favoriteCount: number;
  images: string[];
}

export const BestGoodsItem: React.FC<BestGoodsItemProps> = ({
  name,
  price,
  favoriteCount,
  images,
}: BestGoodsItemProps) => {
  return (
    <GridItem w={282} h={378}>
      <Image h={282} borderRadius={16} src={`${images[0]}`} alt="" />
      <Text>{name}</Text>
      <Text>{price}</Text>
      <HStack>
        <Image
          src="ic_heart.png"
          alt="favorit"
          onError={(e) => {
            e.currentTarget.src = "/no_image.png";
          }}
        />
        <Text>{favoriteCount}</Text>
      </HStack>
    </GridItem>
  );
};
