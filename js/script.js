function sendEmail(event) {
  event.preventDefault();
  const form = document.getElementById('contactForm');
  
  const email = form.querySelector('[name="email"]').value;
  const subject = form.querySelector('[name="subject"]').value;
  const message = form.querySelector('[name="message"]').value;
  
  const body = `From: ${email}\n\n${message}`;
  const mailtoLink = `mailto:edizontabac1996@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  window.location.href = mailtoLink;
  
  showNotification();
  setTimeout(() => {
    form.reset();
    form.style.display = 'none';
    document.getElementById('emailBtnContainer').style.display = 'flex';
  }, 500);
}

function showNotification() {
  const toast = document.getElementById('toastNotification');
  toast.style.transform = 'translateX(0)';
  setTimeout(() => {
    toast.style.transform = 'translateX(150%)';
  }, 4000);
}

window.addEventListener('scroll', function () {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (window.scrollY > 300) {
    backToTopBtn.style.opacity = '1';
    backToTopBtn.style.pointerEvents = 'auto';
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.pointerEvents = 'none';
  }
});
