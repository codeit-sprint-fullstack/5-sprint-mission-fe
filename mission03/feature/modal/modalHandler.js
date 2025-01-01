const dialog = document.querySelector("#dialog");
const dialogMessage = document.querySelector("#dialog-message");

// backdrop 클릭시 닫히는 이벤트 함수
dialog.addEventListener("click", function (event) {
  /**
   * target === this 조건으로 close를 한다면 dialog 상자 안에 빈 곳을 클릭해도 닫힌다.(this 바인딩에 주의)
   * 정확하게 dialog 바깥인 backdrop 클릭시에만 이벤트를 호출하려면 클릭 포인트가
   * 상자 내부에 있는지를 체크하기 위해 left right top bottom을 확인해야한다.
   */
  const target = event.target;
  const rect = target.getBoundingClientRect();
  if (
    rect.left > event.clientX ||
    rect.right < event.clientX ||
    rect.top > event.clientY ||
    rect.bottom < event.clientY
  ) {
    dialogOne.close();
  }
});

// ----------------------------------------------------

export const alertDialog = (message) => {
  dialogMessage.textContent = message;
  dialog.showModal();
};
