var viewCartButton = document.querySelector('.cart-button');//.style.cursor = "pointer" some reason messes with current year javascript?

  viewCartButton.addEventListener('click', function() {
    // Code to redirect user to cart page goes here
    window.location.href = "/Cart";
  });

  document.getElementById("year").innerHTML = new Date().getFullYear();

 // Get the modal
var modal = document.getElementById("modal-overlay");

// Get the link that opens the modal
var btn = document.getElementById("myLink");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal-close")[0];

// When the user clicks the button, open the modal 
if (btn != null) {
btn.onclick = function() {
  modal.style.display = "block";
}
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
