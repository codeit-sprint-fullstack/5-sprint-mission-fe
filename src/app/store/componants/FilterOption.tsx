import { InputGroup } from "@/components/ui/input-group";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  Button,
  createListCollection,
  HStack,
  Image,
  Input,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { LuSearch } from "react-icons/lu";

interface FilterOptionProps {
  girdWidth: number;
  serch: { order: string; keyWord: string };
  setSerch: Dispatch<SetStateAction<{ order: string; keyWord: string }>>;
}

export const FilterOption: React.FC<FilterOptionProps> = ({
  girdWidth,
  serch,
  setSerch,
}) => {
  const selectItems = createListCollection({
    items: [
      { label: "최신순", value: "recent" },
      { label: "좋아요순", value: "favorite" },
    ],
  });

  return (
    <HStack justifyItems={"end"} gap={3}>
      <InputGroup
        bgColor={"#F3F4F6"}
        borderRadius={"12px"}
        startElement={<LuSearch />}
        px={4}
        py={"9px"}
        fontWeight={400}
      >
        <Input
          w={"212px"}
          h={"full"}
          focusRingColor={"transparent"}
          border={0}
          placeholder="검색할 상품을 입력해주세요"
          onChange={(e) => {
            setSerch({ order: serch.order, keyWord: e.target.value });
          }}
        />
      </InputGroup>
      <Button
        px={6}
        py={2}
        borderRadius={8}
        bgColor={"#3692FF"}
        fontWeight={600}
      >
        상품 등록하기
      </Button>

      <SelectRoot
        h={"full"}
        defaultValue={["recent"]}
        border={0}
        collection={selectItems}
        onValueChange={(e) => {
          setSerch({ order: e.value[0], keyWord: serch.keyWord });
        }}
      >
        <SelectTrigger
          w={girdWidth < 3 ? "full" : 130}
          justifyItems={"center"}
          alignItems={"center"}
        >
          {girdWidth < 3 ? (
            <Image src="ic_sort.png" alt="" />
          ) : (
            <SelectValueText px={5} py={"9px"} />
          )}
        </SelectTrigger>
        <SelectContent w={"full"}>
          {selectItems.items.map((sort) => (
            <SelectItem item={sort} key={sort.value} w={130} px={5} py={"9px"}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </HStack>
  );
};
