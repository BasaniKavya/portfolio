// ===== Resume Popup =====
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

// ===== Scroll Reveal Animation =====
function reveal() {
  let reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    let windowHeight = window.innerHeight;
    let revealTop = el.getBoundingClientRect().top;
    let revealPoint = 120;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", reveal);
reveal();

// ===== Active Nav Highlight on Scroll =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(current)) {
      a.classList.add("active");
    }
  });
});

// ===== Typing Animation =====
const roles = ["Web Developer", "ECE Student", "Programmer"];
let roleIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.innerHTML += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 120);
  } else {
    setTimeout(eraseEffect, 1300);
  }
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

// ===== Mobile Navigation =====
const menuBtn = document.querySelector(".menu-btn");
const navUl = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
  navUl.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => navUl.classList.remove("active"));
});

// ===== Project Popup =====
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

// ===== Certificate Popup =====
function openCertPopup(title, link) {
  document.getElementById("certTitle").innerText = title;
  document.getElementById("certFrame").src = link;
  document.getElementById("certPopup").style.display = "flex";
}
function closeCertPopup() {
  document.getElementById("certPopup").style.display = "none";
}

// ===== Success Popup =====
function openSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "flex";
  setTimeout(() => (popup.style.display = "none"), 3000);
}
function closeSuccessPopup() {
  document.getElementById("successPopup").style.display = "none";
}

// ===== Contact Form Submit =====
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  if (result.success) {
    openSuccessPopup();
    this.reset();
  } else {
    alert("❌ Something went wrong. Try again later.");
  }
});

// ===== Auto Fetch GitHub Projects =====
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projectsContainer");
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
          <p>${repo.description || "No description available"}</p>
          <a href="${repo.html_url}" target="_blank">💻 View Code</a>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">&nbsp; 🔗 Live</a>` : ""}
        `;
        container.appendChild(card);
      });

      reveal();
    })
    .catch(() => {
      container.innerHTML = "<p>⚠ Unable to load GitHub projects right now.</p>";
    });
});

// ===== Page Loader =====
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});
