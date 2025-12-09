// ========================
// 🔥 PRELOADER
// ========================
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 700);
});

// ========================
// 🌗 THEME TOGGLE
// ========================
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "☀️";
  }
});

// ========================
// 📱 MOBILE MENU
// ========================
function toggleMenu() {
  document.querySelector(".mobile-nav").classList.toggle("active");
}

// ========================
// 📝 TYPING EFFECT
// ========================
const typingText = document.querySelector(".typing");
const words = ["Web Developer", "Frontend Designer", "ECE Student"];
let wordIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < words[wordIndex].length) {
    typingText.innerHTML += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 120);
  } else {
    setTimeout(deleteText, 1000);
  }
}

function deleteText() {
  if (charIndex > 0) {
    typingText.innerHTML = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteText, 80);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 200);
  }
}

type();

// ========================
// 👇 REVEAL ON SCROLL
// ========================
function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    let windowHeight = window.innerHeight;
    let elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", reveal);
reveal();

// ========================
// 📌 POPUP HANDLERS
// ========================

// Resume
function openResumePopup() {
  document.getElementById("resumePopup").style.display = "flex";
}
function closeResumePopup() {
  document.getElementById("resumePopup").style.display = "none";
}

// Certificate
function openCertPopup(title, link) {
  document.getElementById("certTitle").innerText = title;
  document.getElementById("certFrame").src = link;
  document.getElementById("certPopup").style.display = "flex";
}
function closeCertPopup() {
  document.getElementById("certPopup").style.display = "none";
}

// Project Popup
function openProjectPopup(name, desc, live, code) {
  document.getElementById("projTitle").innerText = name;
  document.getElementById("projDesc").innerText = desc;
  document.getElementById("projLive").href = live;
  document.getElementById("projCode").href = code;

  document.getElementById("projectPopup").style.display = "flex";
}
function closeProjectPopup() {
  document.getElementById("projectPopup").style.display = "none";
}

// Success Popup
function closeSuccessPopup() {
  document.getElementById("successPopup").style.display = "none";
}

// ========================
// 📬 CONTACT FORM - WEB3FORMS
// ========================
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    document.getElementById("successPopup").style.display = "flex";
    this.reset();
  } else {
    alert("❌ Something went wrong. Try again!");
  }
});

// ========================
// 🔥 AUTO FETCH GITHUB PROJECTS
// ========================
async function loadGitHubProjects() {
  const username = "BasaniKavya"; // 👉 your GitHub username
  const container = document.getElementById("projectsContainer");

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    container.innerHTML = "";

    repos.forEach((repo) => {
      if (repo.name.toLowerCase().includes("portfolio")) return;

      const project = document.createElement("div");
      project.classList.add("project-card");

      project.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <button class="project-btn" onclick="openProjectPopup(
          '${repo.name}',
          '${repo.description || "No description"}',
          '${repo.homepage || "#"}',
          '${repo.html_url}'
        )">View Details</button>
      `;

      container.appendChild(project);
    });
  } catch (error) {
    container.innerHTML = "<p>Failed to load projects 😢</p>";
  }
}

loadGitHubProjects();
