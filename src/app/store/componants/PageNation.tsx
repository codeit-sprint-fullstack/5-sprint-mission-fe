import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

interface PageNationProps {
  page: number;
  count: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const PageNation: React.FC<PageNationProps> = ({
  page,
  count,
  setPage,
}) => {
  return (
    <PaginationRoot
      variant="solid"
      count={count}
      pageSize={2}
      page={page}
      onPageChange={(e) => setPage(e.page)}
    >
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </PaginationRoot>
  );
};
