// Get your free Access Key at https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = "b89c42a2-3075-4246-b872-633c553e86dc";

async function sendEmail(event) {
  event.preventDefault();
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOURE_ACCES_KEY") {
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
