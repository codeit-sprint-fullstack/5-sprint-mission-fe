// document.addEventListener("DOMContentLoaded", function () {
//     const mainCSS = document.querySelector("#main-css"); // 기본 CSS 파일
//     const tabletCSS = document.createElement("link"); // 태블릿 CSS 파일
//     const mobileCSS = document.createElement("link"); // 모바일 CSS 파일

//     // tablet.css 설정
//     tabletCSS.rel = "stylesheet";
//     tabletCSS.id = "tablet-css";
//     tabletCSS.href = "tablet.css"; // tablet.css 파일 경로

//     // mobile.css 설정
//     mobileCSS.rel = "stylesheet";
//     mobileCSS.id = "mobile-css";
//     mobileCSS.href = "mobile.css"; // mobile.css 파일 경로

//     // 초기 스타일 설정
//     updateStyles();

//     // 화면 크기 변경 시 업데이트
//     window.addEventListener("resize", updateStyles);

//     function updateStyles() {
//         const screenWidth = window.innerWidth;

//         // 모바일 화면 (375px ~ 743px)
//         if (screenWidth >= 375 && screenWidth <= 743) {
//             if (!document.querySelector("#mobile-css")) {
//                 document.head.appendChild(mobileCSS); // mobile.css 추가
//             }
//             if (document.querySelector("#tablet-css")) {
//                 document.querySelector("#tablet-css").remove(); // tablet.css 제거
//             }
//         }
//         // 태블릿 화면 (744px ~ 1100px)
//         else if (screenWidth >= 744 && screenWidth <= 1199) {
//             if (!document.querySelector("#tablet-css")) {
//                 document.head.appendChild(tabletCSS); // tablet.css 추가
//             }
//             if (document.querySelector("#mobile-css")) {
//                 document.querySelector("#mobile-css").remove(); // mobile.css 제거
//             }
//         }
//         // 데스크톱 또는 다른 화면
//         else {
//             if (document.querySelector("#tablet-css")) {
//                 document.querySelector("#tablet-css").remove(); // tablet.css 제거
//             }
//             if (document.querySelector("#mobile-css")) {
//                 document.querySelector("#mobile-css").remove(); // mobile.css 제거
//             }
//         }
//     }
// });
