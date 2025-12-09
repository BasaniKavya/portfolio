/* -----------------------------------------------
   🌸 PREMIUM JS FOR KAVYA PORTFOLIO
--------------------------------------------------*/

/* ---------------- PRELOADER ---------------- */
window.addEventListener("load", () => {
  document.getElementById("preloader").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 500);
});

/* ---------------- REVEAL ANIMATION ---------------- */
function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal();

/* ---------------- THEME TOGGLE ---------------- */
let isPinkTheme = true;

document.getElementById("themeToggle").addEventListener("click", () => {
  isPinkTheme = !isPinkTheme;

  if (isPinkTheme) {
    document.documentElement.style.setProperty("--pink", "#ff67b3");
    document.body.style.background = "#000";
  } else {
    document.documentElement.style.setProperty("--pink", "#00eaff");
    document.body.style.background = "#0a0f1a";
  }
});

/* ---------------- FETCH GITHUB PROJECTS ---------------- */
const username = "basanikavya"; // Your GitHub username
const projectsContainer = document.getElementById("projectsContainer");

async function fetchProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available."}</p>
        <a href="${repo.html_url}" target="_blank">View Project →</a>
      `;

      projectsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("GitHub API Error:", error);
  }
}

fetchProjects();

/* ---------------- CONTACT FORM SUCCESS POPUP ---------------- */
function closePopup() {
  document.getElementById("successPopup").style.display = "none";
}

document.getElementById("contactForm").addEventListener("submit", () => {
  setTimeout(() => {
    document.getElementById("successPopup").style.display = "flex";
  }, 800);
});
