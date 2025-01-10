import styled from "styled-components";
import BtnLeft from "./img/btn_left.png";
import BtnRight from "./img/btn_right.png";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPagesShow = 5; // 한 번에 보여줄 페이지 수
  const startPage = Math.max(currentPage - 2, 1); // 현재 페이지 기준 시작 페이지
  const endPage = Math.min(startPage + maxPagesShow - 1, totalPages);

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <>
      <Container>
        <PageBtnContent>
          <BtnImg
            src={BtnRight}
            alt="Previous"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          />

          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
            const page = startPage + idx;
            return (
              <PageBtn
                key={page}
                active={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PageBtn>
            );
          })}
          <BtnImg
            src={BtnLeft}
            alt="Next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
        </PageBtnContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 304px;
  padding: 40px 0;
  @media (min-width: 1024px) {
    width: 152px;
  }

  @media (max-width: 767px) {
    width: 76px;
  }
`;

const PageBtnContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PageBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.active ? "#f9fafb" : "#6b7280")};
  background-color: ${(props) => (props.active ? "#2f80ed" : "#ffffff")};
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#2f80ed" : "#f3f4f6")};
  }
`;

const BtnImg = styled.img`
  width: 40px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
