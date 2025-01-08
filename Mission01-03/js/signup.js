import { USER_DATA } from './userDatabase.js';
import { inputEmail, inputPW, inputAlias, inputConfirmPW, confirmButton } from './eventListener.js';
import { createModal } from './modal.js';

// 중복 이메일 확인 함수
const checkEmailExists = (email) => {
  return USER_DATA.some(user => user.email === email);
};

// 회원가입 함수
const handleSignUp = (event) => {
  event.preventDefault(); // Prevent form submission

  const email = inputEmail.value;

  // 이메일 중복 확인
  if (checkEmailExists(email)) {
    createModal('이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.', '확인');
    return;
  }

  // 회원가입 성공 로직 (예: USER_DATA에 사용자 추가)
  USER_DATA.push({
    email,
    password: inputPW.value,
    alias: inputAlias.value
  });

  // 성공 메시지 모달 표시 및 로그인 페이지로 리다이렉트
  createModal('회원가입 성공!', '확인', () => {
    window.location.href = '../login.html'; // 로그인 페이지로 이동
  });
};

// 회원가입 버튼 클릭 이벤트 등록
confirmButton.addEventListener('click', handleSignUp);



