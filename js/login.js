
import { USER_DATA } from './userDatabase.js';
import { inputEmail, inputPW, confirmButton } from './eventListener.js'
import { createModal } from './modal.js';

const loginErrorMsg= "이메일 또는 비밀번호가 잘못 되었습니다."


// Login 함수
const handleLogin = (event) => {
  event.preventDefault(); // Prevent form submission

  const email = inputEmail.value;
  const password = inputPW.value;

  // Find user from USER_DATA
  const user = USER_DATA.find(user => user.email === email);

  if (!user || user.password !== password) {
    // If user is not found or password doesn't match, show login error modal
    createModal(loginErrorMsg, '확인');
    return;
  }


  // 성공 메시지 모달 표시 및 items 페이지로 리다이렉트
  createModal('로그인 성공!', '확인', () => {
    window.location.href = '../items.html'; 
  });
};

// Add event listener to the login button
confirmButton.addEventListener('click', handleLogin);