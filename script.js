/* ================= PRELOADER ================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
});

/* ================= RESUME POPUP ================= */
function openResumePopup() {
  document.getElementById("resumePopup").style.display = "flex";
}
function closeResumePopup() {
  document.getElementById("resumePopup").style.display = "none";
}
window.addEventListener("click", function (e) {
  const popup = document.getElementById("resumePopup");
  if (e.target === popup) popup.style.display = "none";
});

/* ================= SCROLL REVEAL ================= */
function reveal() {
  let reveals = document.querySelectorAll(".reveal");
  for (let r of reveals) {
    let windowHeight = window.innerHeight;
    let revealTop = r.getBoundingClientRect().top;
    let revealPoint = 120;
    if (revealTop < windowHeight - revealPoint) r.classList.add("active");
    else r.classList.remove("active");
  }
}
window.addEventListener("scroll", reveal);
reveal();

/* ================= ACTIVE NAV ON SCROLL ================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    let top = window.scrollY;
    if (top >= sec.offsetTop - 150) current = sec.getAttribute("id");
  });
  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(current)) a.classList.add("active");
  });
});

/* ================= TYPING ANIMATION ================= */
const roles = ["Web Developer", "ECE Student", "Programmer"];
let roleIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.innerHTML += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 120);
  } else setTimeout(eraseEffect, 1300);
}
function eraseEffect() {
  if (charIndex > 0) {
    typingElement.innerHTML = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 80);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 400);
  }
}
typeEffect();

/* ================= MOBILE NAVIGATION ================= */
const mobileNavPanel = document.querySelector(".mobile-nav");
function toggleMenu() {
  mobileNavPanel.classList.toggle("active");
}
document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => mobileNavPanel.classList.remove("active"));
});

/* ================= PROJECT POPUP ================= */
function openProject(title, desc, tech, live = "", code = "") {
  document.getElementById("projTitle").innerText = title;
  document.getElementById("projDesc").innerText = desc;
  document.getElementById("projLive").href = live;
  document.getElementById("projCode").href = code;

  document.getElementById("projLive").style.display = live ? "inline-block" : "none";
  document.getElementById("projCode").style.display = code ? "inline-block" : "none";

  document.getElementById("projectPopup").style.display = "flex";
}
function closeProjectPopup() {
  document.getElementById("projectPopup").style.display = "none";
}

/* ================= CERTIFICATE POPUP ================= */
function openCertPopup(title, link) {
  document.getElementById("certTitle").innerText = title;
  document.getElementById("certFrame").src = link;
  document.getElementById("certPopup").style.display = "flex";
}
function closeCertPopup() {
  document.getElementById("certPopup").style.display = "none";
}

/* ================= SUCCESS POPUP ================= */
function openSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "flex";
  setTimeout(() => popup.style.display = "none", 3000);
}
function closeSuccessPopup() {
  document.getElementById("successPopup").style.display = "none";
}

/* ================= CONTACT FORM (WEB3FORMS) ================= */
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
  const result = await response.json();
  if (result.success) {
    openSuccessPopup();
    form.reset();
  } else alert("❌ Something went wrong. Try again later.");
});

/* ================= AUTO FETCH GITHUB PROJECTS ================= */
document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projectsContainer");

  fetch("https://api.github.com/users/BasaniKavya/repos")
    .then(res => res.json())
    .then(repos => {
      const filtered = repos
        .filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);

      filtered.forEach(repo => {
        const card = document.createElement("div");
        card.className = "project-card reveal";
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : "No description provided"}</p>
          <div class="project-links">
            <a href="${repo.html_url}" target="_blank">💻 Code</a>
            ${repo?.homepage ? `<a href="${repo.homepage}" target="_blank">🔗 Live</a>` : ""}
          </div>
        `;
        projectsContainer.appendChild(card);
      });
      reveal();
    });
});

/* ================= THEME SWITCH (LIGHT / DARK MODE) ================= */
const toggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  toggle.textContent = "🌙";
}

toggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    toggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    toggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
});
// 🔥 Scroll Progress Bar
window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  let docHeight = document.body.scrollHeight - window.innerHeight;
  let progress = (scrollTop / docHeight) * 100;
  document.getElementById("scrollProgress").style.width = progress + "%";
});

