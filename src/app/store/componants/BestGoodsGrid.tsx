import { Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface BestGoodsGridProps {
  title: string;
  girdWidth: number;
  children: ReactNode;
}

export const BestGoodsGrid: React.FC<BestGoodsGridProps> = ({
  title,
  girdWidth,
  children,
}) => {
  return (
    <VStack w={"full"} h={"full"} whiteSpace={"nowrap"}>
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        fontWeight={700}
        fontSize={"20px"}
      >
        <Text>{title}</Text>
      </HStack>
      <Grid
        templateColumns={
          girdWidth < 4 ? `repeat(${girdWidth},1fr)` : "repeat(4,1fr)"
        }
        gap={6}
      >
        {children}
      </Grid>
    </VStack>
  );
};
