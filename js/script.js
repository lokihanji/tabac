// Get your free Access Key at https://web3forms.com/
// <<<<<<< HEAD
const WEB3FORMS_ACCESS_KEY = "e8f9002e-1f5b-4094-b5aa-bfe28a4f7434";
// =======
// const WEB3FORMS_ACCESS_KEY = "b89c42a2-3075-4246-b872-633c553e86dc";
// >>>>>>> d01af4bf80014a2588a0f2d84d098430369837b8

async function sendEmail(event) {
  event.preventDefault();
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  // <<<<<<< HEAD
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
    // =======
    //   if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "b89c42a2-3075-4246-b872-633c553e86dc") {
    // >>>>>>> d01af4bf80014a2588a0f2d84d098430369837b8
    showNotification('Set your Web3Forms access key in js/script.js', true);
    console.warn('To receive emails, please get a free access key at https://web3forms.com/ and paste it into js/script.js.');
    return;
  }

  const email = form.querySelector('[name="email"]').value;
  const subject = form.querySelector('[name="subject"]').value;
  const message = form.querySelector('[name="message"]').value;

  // Disable button and show sending status
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        email: email,
        subject: subject,
        message: message,
        from_name: email
      })
    });

    const result = await response.json();

    if (response.status === 200) {
      showNotification('Email sent successfully!', false);
      form.reset();
      setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('emailBtnContainer').style.display = 'flex';
      }, 500);
    } else {
      showNotification(result.message || 'Failed to send email. Please try again.', true);
    }
  } catch (error) {
    console.error('Error sending email:', error);
    showNotification('An error occurred. Please try again.', true);
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
}

function showNotification(message, isError = false) {
  const toast = document.getElementById('toastNotification');
  // Update icon and message
  toast.innerHTML = isError
    ? `<span style="font-size: 1.2rem;">✗</span> ${message}`
    : `<span style="font-size: 1.2rem;">✓</span> ${message}`;

  // Style according to state
  if (isError) {
    toast.style.background = 'rgba(239, 68, 68, 0.9)'; // Red
    toast.style.boxShadow = '0 10px 30px rgba(239,68,68,0.3)';
  } else {
    toast.style.background = 'rgba(34, 197, 94, 0.9)'; // Green
    toast.style.boxShadow = '0 10px 30px rgba(34,197,94,0.3)';
  }

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

function scrollProjects(direction) {
  const carousel = document.getElementById('projectsCarousel');
  const scrollAmount = carousel.clientWidth;
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}
