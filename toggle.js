const btntheme = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

btntheme.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});

// to make inputs don't accept the letters!
price.addEventListener('keypress',validateNumber);
tax.addEventListener('keypress',validateNumber);
ads.addEventListener('keypress',validateNumber);
discount.addEventListener('keypress',validateNumber);
count.addEventListener('keypress',validateNumber);
function validateNumber(event) {
  let charCode = event.which ? event.which : event.keyCode;

  if (charCode < 48 || charCode > 57) {
      event.preventDefault();
  }
}
//copyRights
function toggleParagraph() {
  let toggleRecht = document.getElementById('toggleRecht');
  if (toggleRecht.style.display === "none") {
    toggleRecht.style.display = "inline";
}else{
  toggleRecht.style.display = "none";
}
}