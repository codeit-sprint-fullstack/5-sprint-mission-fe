const mediaQuery = window.matchMedia("(max-width: 743px)");
const footerContent = document.querySelector("#footer-content");
const addr = document.querySelector("#addr");

const handleMediaQueryChange = (e) => {
    const isMobile = e.matches
    const hasNextElementSibling = footerContent.nextElementSibling;

    //모바일 혹은 태블릿,PC 사이즈에서 각각 알맞은 상태가 이미 적용되어있다면 함수 실행하지 않고 빠져나가기
    if ((isMobile && hasNextElementSibling)  || (!isMobile && !hasNextElementSibling)) {
        return
    }

    //모바일 사이즈에서 #addr을 footerContent 형제요소로 추가
    if (isMobile) {
        footerContent.firstElementChild.remove();

        const addFooterContent = document.createElement("div");
        addFooterContent.classList.add("addr-style");
        addFooterContent.innerHTML = addr.innerHTML;
        footerContent.parentElement.append(addFooterContent);
    }
    //모바일 사이즈를 벗어났을 때 형제요소는 삭제하고, footerContent의 첫 자식 노드로 다시 추가하기
    else {
        if (footerContent.nextElementSibling){
            footerContent.nextElementSibling.remove();
        }
        footerContent.prepend(addr);
    }
}

/* 초기 상태 확인
: 코드 실행될 때 처음부터 조건이 만족되는지 확인*/
handleMediaQueryChange(mediaQuery);

// 미디어 쿼리 변화 감지 이벤트 등록
mediaQuery.addEventListener("change", handleMediaQueryChange);