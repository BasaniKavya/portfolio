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
const username = "basanikavya";
const projectsContainer = document.getElementById("projectsContainer");

projectsContainer.innerHTML = `
  <div class="loader-projects">
    <div class="spinner"></div>
    <p>Loading Projects...</p>
  </div>
`;

async function fetchProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    projectsContainer.innerHTML = "";

    const customThumbnails = {
      "todo-app": "thumbnailt.png",
      "DigitalPortfolio": "thumbnail.png"
    };

    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      const thumbnailURL = customThumbnails[repo.name]
        ? customThumbnails[repo.name]
        : `https://opengraph.githubassets.com/1/${username}/${repo.name}`;

      const tags = repo.language ? `<span class="tag">${repo.language}</span>` : "";

      card.innerHTML = `
        <img src="${thumbnailURL}" class="project-thumb" alt="${repo.name} Thumbnail">
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available."}</p>
        <div class="project-tags">${tags}</div>
        <div class="project-buttons">
          <a href="${repo.html_url}" target="_blank" class="btn-code">View Code →</a>
          <a href="https://${username}.github.io/${repo.name}/" target="_blank" class="btn-live">Live Demo →</a>
        </div>
      `;
      projectsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
  }
}

fetchProjects();

/* ---------------- CONTACT POPUP ---------------- */
function closePopup() {
  document.getElementById("successPopup").style.display = "none";
}

document.getElementById("contactForm").addEventListener("submit", () => {
  setTimeout(() => {
    document.getElementById("successPopup").style.display = "flex";
  }, 800);
});

/* ------------ MOBILE MENU ------------- */
const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("nav-active");
  hamburger.classList.toggle("open");
});
/* ================= SAFE PROJECT THUMBNAIL FALLBACK ================= */

function applyThumbnailFallback() {
  const images = document.querySelectorAll(".project-thumb");

  images.forEach(img => {
    img.onerror = () => {
      img.src = document.getElementById("defaultProjectThumb").src;
    };
  });
}

/* Wait until projects are loaded */
setTimeout(applyThumbnailFallback, 2000);


