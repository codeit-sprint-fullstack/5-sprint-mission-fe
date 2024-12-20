const path = {
  HOME: "main.html",
  LOGIN: "login.html",
  SIGNUP: "signup.html",
  PRIVACY: "privacy.html",
  FQA: "fqa.html",
  ITEMS: "items.html",
};

document.addEventListener("DOMContentLoaded", () => {
  const pw = document.getElementById("pw");
  const pwCheck = document.getElementById("pwCheck");
  const pwView = document.getElementById("pwView");
  const pwCheckView = document.getElementById("pwCheckView");

  if (pwView) {
    pwView.addEventListener("click", () => {
      if (pw.type === "password") {
        pw.type = "text";
        pwView.src = "../assets/btn_visibility_on_24px.png";
      } else {
        pw.type = "password";
        pwView.src = "../assets/btn_visibility_off_24px.png";
      }
    });

    pwCheckView.addEventListener("click", () => {
      if (pwCheck.type === "password") {
        pwCheck.type = "text";
        pwCheckView.src = "../assets/btn_visibility_on_24px.png";
      } else {
        pwCheck.type = "password";
        pwCheckView.src = "../assets/btn_visibility_off_24px.png";
      }
    });
  }

  const home = document.getElementById("home");
  const login = document.getElementById("login");

  home.addEventListener("click", () => {
    location.href = path.HOME;
  });
  login.addEventListener("click", () => {
    location.href = path.LOGIN;
  });
});
