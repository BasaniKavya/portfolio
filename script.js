/* 🌸 PRELOADER */
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

/* 🌸 MOBILE MENU */
const menuBtn = document.querySelector(".menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

menuBtn.addEventListener("click", () => {
  mobileNav.style.display =
    mobileNav.style.display === "flex" ? "none" : "flex";
});

/* 🌸 LIGHT / DARK THEME */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode")
    ? "🌙"
    : "☀️";
});

/* 🌸 REVEAL ON SCROLL */
function reveal() {
  document.querySelectorAll(".reveal").forEach((el) => {
    let elementTop = el.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 80) el.classList.add("active");
  });
}
window.addEventListener("scroll", reveal);
reveal();

/* 🌸 GITHUB PROJECTS FETCH */
fetch("https://api.github.com/users/basanikavya/repos")
  .then((res) => res.json())
  .then((repos) => {
    let projectsHTML = "";
    repos.forEach((repo) => {
      projectsHTML += `
        <div class="project-card">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <a href="${repo.html_url}" target="_blank">View Project →</a>
        </div>
      `;
    });
    document.getElementById("projectsContainer").innerHTML = projectsHTML;
  });

/* 🌸 CONTACT FORM POPUP */
const contactForm = document.getElementById("contactForm");
const successPopup = document.getElementById("successPopup");
const closePopup = document.querySelector(".close");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  successPopup.style.display = "flex";
  setTimeout(() => (successPopup.style.display = "none"), 2000);
  contactForm.reset();
});

closePopup.addEventListener("click", () => {
  successPopup.style.display = "none";
});
