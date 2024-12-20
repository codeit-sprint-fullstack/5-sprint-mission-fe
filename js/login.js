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
  const pwView = document.getElementById("pwView");

  pwView.addEventListener("click", () => {
    if (pw.type === "password") {
      pw.type = "text";
      pwView.src = "../assets/btn_visibility_on_24px.png";
    } else {
      pw.type = "password";
      pwView.src = "../assets/btn_visibility_off_24px.png";
    }
  });

  const home = document.getElementById("home");
  const signUp = document.getElementById("signUp");

  home.addEventListener("click", () => {
    location.href = path.HOME;
  });
  signUp.addEventListener("click", () => {
    location.href = path.SIGNUP;
  });
});
