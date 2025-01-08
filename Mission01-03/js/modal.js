// modal.js
export const createModal = (message, buttonText, buttonCallback = null) => {
  // Remove existing modal if any
  const existingModal = document.querySelector('#customModal');
  if (existingModal) {
    existingModal.remove();
  }

  // 모달 컨테이너 생성
  const modal = document.createElement('div');
  modal.id = 'customModal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.zIndex = '1000'; // Ensure the modal is above other elements

  // 모달 콘텐트 생성
  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = 'white';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '5px';
  modalContent.style.textAlign = 'center';
  modalContent.style.width = '540px';
  modalContent.style.height = '250px';
  modalContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  modalContent.style.position = 'relative';
  modalContent.style.display = 'flex';
  modalContent.style.flexDirection = 'column';
  modalContent.style.justifyContent = 'center';
  modalContent.style.alignItems = 'center';

  // 메시지 추가
  const messageParagraph = document.createElement('p');
  messageParagraph.textContent = message;
  messageParagraph.style.fontSize = '1.6rem';
  messageParagraph.style.fontWeight = '500';
  modalContent.appendChild(messageParagraph);

  // 버튼 추가
  const closeButton = document.createElement('span');
  closeButton.textContent = buttonText;
  closeButton.style.position = 'absolute';
  closeButton.style.bottom = '28px';
  closeButton.style.left = '83%';
  closeButton.style.transform = 'translateX(-50%)';
  closeButton.style.width = '120px';
  closeButton.style.height = '48px';
  closeButton.style.fontSize = '1.6rem';
  closeButton.style.fontWeight = '600';
  closeButton.style.cursor = 'pointer';
  closeButton.style.backgroundColor = '#3692FF';
  closeButton.style.color = '#ffffff';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '8px';
  closeButton.style.display = 'flex';
  closeButton.style.alignItems = 'center';
  closeButton.style.justifyContent = 'center';

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none'; // 클릭시 숨시시
    if (buttonCallback) {
      buttonCallback(); // 콜백
    }
  });

  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modal);
};
