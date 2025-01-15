import { Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FilterOption } from "./FilterOption";

export interface GoodsGridProps {
  title: string;
  girdWidth: number;
  serch: { order: string; keyWord: string };
  setSerch: Dispatch<SetStateAction<{ order: string; keyWord: string }>>;
  children: ReactNode;
}

export const GoodsGrid: React.FC<GoodsGridProps> = ({
  title,
  girdWidth,
  serch,
  setSerch,
  children,
}) => {
  return (
    <VStack w={"full"} h={"full"} whiteSpace={"nowrap"}>
      <HStack
        w={"full"}
        fontWeight={700}
        fontSize={"20px"}
        justifyContent={"space-between"}
      >
        <Text>{title}</Text>
        <FilterOption girdWidth={girdWidth} setSerch={setSerch} serch={serch} />
      </HStack>
      <Grid
        templateColumns={
          girdWidth / 2 < 5 ? `repeat(${girdWidth / 2},1fr)` : "repeat(5,1fr)"
        }
        templateRows={"repeat(2,1fr)"}
        gap={6}
      >
        {children}
      </Grid>
    </VStack>
  );
};
