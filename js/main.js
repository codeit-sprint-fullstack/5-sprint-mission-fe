const path = {
  HOME: "main.html",
  LOGIN: "login.html",
  SIGNUP: "signup.html",
  PRIVACY: "privacy.html",
  FQA: "fqa.html",
  ITEMS: "items.html",
};

document.addEventListener("DOMContentLoaded", () => {
  const home = document.getElementById("home");
  const login = document.getElementById("login");
  const privacy = document.getElementById("privacy");
  const fqa = document.getElementById("fqa");
  const items = document.getElementById("items");

  home.addEventListener("click", () => {
    location.href = path.HOME;
  });
  login.addEventListener("click", () => {
    location.href = path.LOGIN;
  });
  items.addEventListener("click", () => {
    location.href = path.ITEMS;
  });
  privacy.addEventListener("click", () => {
    location.href = path.PRIVACY;
  });
  fqa.addEventListener("click", () => {
    location.href = path.FQA;
  });
});
