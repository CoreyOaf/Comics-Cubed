var viewCartButton = document.querySelector('.cart-button');//.style.cursor = "pointer" some reason messes with current year javascript?

  viewCartButton.addEventListener('click', function() {
    // Code to redirect user to cart page goes here
    window.location.href = "/Cart";
  });

  document.getElementById("year").innerHTML = new Date().getFullYear();


$( ".change" ).on("click", function() {
  if( $( "body" ).hasClass( "dark" )) {
      $( "body" ).removeClass( "dark" );
      $( ".change" ).text( "OFF" );
  } else {
      $( "body" ).addClass( "dark" );
      $( ".change" ).text( "ON" );
  }
});