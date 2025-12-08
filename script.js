// ===== Resume Popup =====
function openResumePopup() {
  document.getElementById("resumePopup").style.display = "flex";
}
function closeResumePopup() {
  document.getElementById("resumePopup").style.display = "none";
}

// Close popup when clicking outside
window.addEventListener("click", function (e) {
  const popup = document.getElementById("resumePopup");
  if (e.target === popup) popup.style.display = "none";
});


// ===== Scroll Reveal Animation =====
function reveal() {
  let reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 120;
    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal();


// ===== Active Nav Highlight on Scroll =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    let top = window.scrollY;
    if (top >= section.offsetTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(a => {
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
const mobileNavPanel = document.querySelector(".mobile-nav");

function toggleMenu() {
  mobileNavPanel.classList.toggle("active");
}

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNavPanel.classList.remove("active");
  });
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


// ===== SUCCESS POPUP =====
function openSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "flex";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}
function closeSuccessPopup() {
  document.getElementById("successPopup").style.display = "none";
}


// ===== WEB3FORMS SUBMIT HANDLER =====
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  if (result.success) {
    openSuccessPopup();
    form.reset();
  } else {
    alert("❌ Something went wrong. Try again later.");
  }
});


// ===== AUTO FETCH GITHUB PROJECTS =====
document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projectsContainer");

  fetch("https://api.github.com/users/BasaniKavya/repos")
    .then(res => res.json())
    .then(repos => {
      const filtered = repos
        .filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6); // Load 6 latest repos

      filtered.forEach(repo => {
        const card = document.createElement("div");
        card.className = "project-card reveal";
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : "No description provided"}</p>
          <div class="project-links">
            <a href="${repo.html_url}" target="_blank">💻 Code</a>
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">🔗 Live</a>` : ""}
          </div>
        `;
        projectsContainer.appendChild(card);
      });
      reveal();
    });
});
