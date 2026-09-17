document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const buttons = document.querySelectorAll(".button");

  // Smooth navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Simple button interaction
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.blur();
    });
  });
});
***
script
