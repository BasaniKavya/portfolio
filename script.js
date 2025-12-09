/* ========== script.js (full) ========== */

/* ===== Helpers ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ===== Preloader ===== */
window.addEventListener('load', () => {
  const pre = $('#preloader');
  if (pre) {
    pre.style.opacity = '0';
    setTimeout(() => pre.style.display = 'none', 300);
  }
});

/* ===== Theme toggle ===== */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('site-theme') || 'dark';
if (savedTheme === 'light') document.documentElement.classList.add('light-mode');

function updateThemeIcon() {
  themeToggle.textContent = document.documentElement.classList.contains('light-mode') ? '🌙' : '☀️';
}
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light-mode');
  const isLight = document.documentElement.classList.contains('light-mode');
  localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
  updateThemeIcon();
});

/* ===== Mobile menu ===== */
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

function toggleMenu() {
  if (!mobileNav) return;
  mobileNav.classList.toggle('active');
  mobileNav.setAttribute('aria-hidden', mobileNav.classList.contains('active') ? 'false' : 'true');
}
menuBtn && menuBtn.addEventListener('click', toggleMenu);
$$('.mobile-nav a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('active');
  mobileNav.setAttribute('aria-hidden', 'true');
}));

/* ===== Resume popup ===== */
function openResumePopup() { showPopup('resumePopup'); }
function closeResumePopup() { hidePopup('resumePopup'); }

/* ===== Utility to show/hide popup ===== */
function showPopup(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'flex';
  el.setAttribute('aria-hidden', 'false');
}
function hidePopup(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'none';
  el.setAttribute('aria-hidden', 'true');
}

/* close popup clicking outside content */
window.addEventListener('click', (e) => {
  const popups = $$('.popup');
  popups.forEach(p => {
    if (e.target === p) p.style.display = 'none';
  });
});

/* ===== Reveal on scroll ===== */
function reveal() {
  const reveals = $$('.reveal');
  const windowH = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const revealPoint = 120;
    if (top < windowH - revealPoint) el.classList.add('active');
  });
}
window.addEventListener('scroll', reveal);
document.addEventListener('DOMContentLoaded', reveal);

/* ===== Typing animation ===== */
const roles = ["Web Developer", "ECE Student", "Programmer"];
let roleIndex = 0, charIndex = 0;
const typingEl = document.querySelector('.typing');
function typeEffect() {
  if (!typingEl) return;
  if (charIndex < roles[roleIndex].length) {
    typingEl.textContent += roles[roleIndex].charAt(charIndex++);
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1100);
  }
}
function eraseEffect() {
  if (!typingEl) return;
  if (charIndex > 0) {
    typingEl.textContent = roles[roleIndex].substring(0, --charIndex);
    setTimeout(eraseEffect, 60);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 300);
  }
}
typeEffect();

/* ===== Active nav highlight ===== */
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('nav a'));
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href').includes(current));
  });
});

/* ===== Project popup open/close ===== */
function openProject(title, desc, tech, live = '', code = '') {
  $('#projTitle').innerText = title || 'Project';
  $('#projDesc').innerText = desc || '';
  $('#projTech').innerText = tech || '';
  const liveLink = $('#projLive'), codeLink = $('#projCode');
  if (live) { liveLink.style.display = 'inline-block'; liveLink.href = live; } else liveLink.style.display = 'none';
  if (code) { codeLink.style.display = 'inline-block'; codeLink.href = code; } else codeLink.style.display = 'none';
  showPopup('projectPopup');
}
function closeProjectPopup() { hidePopup('projectPopup'); }

/* ===== Certificate popup ===== */
function openCertPopup(title, link) {
  $('#certTitle').innerText = title;
  $('#certFrame').src = link;
  showPopup('certPopup');
}
function closeCertPopup() { hidePopup('certPopup'); }

/* ===== Success popup ===== */
function openSuccessPopup() {
  const s = $('#successPopup');
  showPopup('successPopup');
  setTimeout(() => hidePopup('successPopup'), 3000);
}
function closeSuccessPopup() { hidePopup('successPopup'); }

/* ===== WEB3FORMS SUBMIT HANDLER =====
   Using your hidden access_key placed in the form.
   Endpoint: https://api.web3forms.com/submit
*/
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const fd = new FormData(contactForm);
      // optional: add redirect param if desired: fd.append('_next', 'https://.../?success=true')
      const resp = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd
      });
      const data = await resp.json();
      if (data.success) {
        contactForm.reset();
        openSuccessPopup();
      } else {
        alert('Submission failed. Please try again later.');
        console.error('Web3Forms response:', data);
      }
    } catch (err) {
      alert('Network error. Please try again later.');
      console.error(err);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}

/* ===== Auto-fetch GitHub projects ===== */
async function loadGitHubProjects(username = 'BasaniKavya') {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  container.innerHTML = '<p style="color:#ffb6d9">Loading projects...</p>';

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await res.json();
    if (!Array.isArray(repos)) throw new Error('Invalid GitHub response');

    container.innerHTML = ''; // clear
    const list = repos
      .filter(r => !r.fork)
      .sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    if (list.length === 0) {
      container.innerHTML = '<p style="color:#ffb6d9">No projects found on GitHub.</p>';
      return;
    }

    list.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      const desc = repo.description ? repo.description : 'No description provided';
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${escapeHtml(desc)}</p>
        <div class="project-links">
          <a href="${repo.html_url}" target="_blank" rel="noopener">💻 Code</a>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener">🔗 Live</a>` : ''}
        </div>
      `;
      // When clicking the card, open the project popup with details & links
      card.addEventListener('click', () => {
        openProject(repo.name, repo.description || 'No description', repo.language || '—', repo.homepage || '', repo.html_url || '');
      });
      container.appendChild(card);
    });

    // trigger reveal in case items appended after load
    setTimeout(reveal, 150);
  } catch (err) {
    console.error('GitHub error', err);
    container.innerHTML = '<p style="color:#ffb6d9">Unable to load GitHub projects.</p>';
  }
}
loadGitHubProjects();

/* ===== small helper to escape HTML in descriptions ===== */
function escapeHtml(str = '') {
  return str.replace(/[&<>"'`]/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'}[m]));
}

/* ===== keyboard close with ESC for popups ===== */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    $$('.popup').forEach(p => p.style.display = 'none');
  }
});

/* expose some functions to global to be callable from inline HTML */
window.openProject = openProject;
window.openResumePopup = openResumePopup;
window.closeResumePopup = closeResumePopup;
window.openCertPopup = openCertPopup;
window.closeCertPopup = closeCertPopup;
window.toggleMenu = toggleMenu;
