const eyeIcons = document.querySelectorAll(".eyeIcon");

// 이미지 경로를 생성하는 함수
const getImageSrc = (fileName) => `../img/${fileName}.png`;

// 파일 이름과 경로 정의
const [iconFileNameOff, iconFileNameOn] = [
  "btn_visibility_off",
  "btn_visibility_on",
];
const [iconSrcOff, iconSrcOn] = [
  getImageSrc(iconFileNameOff),
  getImageSrc(iconFileNameOn),
];

const toggleIcon = (event) => {
  const eyeIcon = event.target; // eyeIcon
  const passwordInput = eyeIcon.parentElement.querySelector("input"); // eyeIcon의 sibling input
  const isIconOff = eyeIcon.src.includes(`${iconFileNameOff}.png`); // eyeIcon이 off

  // 현재 이미지 소스를 확인하고 토글
  eyeIcon.src = isIconOff ? iconSrcOn : iconSrcOff;
  eyeIcon.alt = isIconOff ? "비밀번호 보이기" : "비밀번호 숨기기";
  passwordInput.type = isIconOff ? "text" : "password";
};

// 클릭할 때 아이콘 토글 이벤트
for (const eyeIcon of eyeIcons) {
  eyeIcon.addEventListener("click", (e) => toggleIcon(e));
}
