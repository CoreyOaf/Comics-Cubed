var viewCartButton = document.querySelector('.cart-button');//.style.cursor = "pointer" some reason messes with current year javascript?

  viewCartButton.addEventListener('click', function() {
    // Code to redirect user to cart page goes here
    window.location.href = "/Cart";
  });

  document.getElementById("year").innerHTML = new Date().getFullYear();

  // Get the newsletter link and the modal overlay
const newsletterLink = document.getElementById('newsletter-link');
const modalOverlay = document.querySelector('.modal-overlay');
const modalCloseButton = document.querySelector('.modal-close');
// Add a click event listener to the newsletter link
newsletterLink.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default link behavior
  $('.modal-overlay').show(); // Show the modal
});

// Add a click event listener to the close button
modalCloseButton.addEventListener('click', function() {
  modalOverlay.style.display = 'block'; // Hide the modal
});

function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailValue = emailInput.value.trim();

  if (!emailValue) {
    alert('Please enter an email address');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    alert('Please enter a valid email address');
    return false;
  }

  return true;
}

function openModal() {
  var modal = document.querySelector('.modal-overlay');
  modal.style.display = "block";
}
