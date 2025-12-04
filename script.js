function openResumePopup() {
  document.getElementById("resumePopup").style.display = "flex";
}

function closeResumePopup() {
  document.getElementById("resumePopup").style.display = "none";
}

// Close popup if user clicks outside box
window.onclick = function(e) {
  const popup = document.getElementById("resumePopup");
  if (e.target === popup) popup.style.display = "none";
}
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



