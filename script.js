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

