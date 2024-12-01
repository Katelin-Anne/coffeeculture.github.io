// Initialize cart
let cart = {};

// Add product to cart
function addToCart(productName, price, quantityInputId) {
  const quantity = parseInt(document.getElementById(quantityInputId).value);

  // Add to cart or update existing product
  if (cart[productName]) {
    cart[productName].quantity += quantity;
  } else {
    cart[productName] = { price, quantity };
  }

  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`${quantity} ${productName}(s) added to cart!`);
}

// Load and display cart details on checkout page
function loadCart() {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || {};
  cart = storedCart;

  const cartSummary = document.getElementById('cart-summary');
  const totalAmountDisplay = document.getElementById('total-amount');

  let totalAmount = 0;
  cartSummary.innerHTML = '';

  // Display products in cart
  for (const product in cart) {
    const { price, quantity } = cart[product];
    const productTotal = price * quantity;
    totalAmount += productTotal;

    cartSummary.innerHTML += `<p>${product} - $${price} x ${quantity} = $${productTotal}</p>`;
  }

  totalAmountDisplay.textContent = `Total: $${totalAmount}`;
}

// Complete checkout
function completeCheckout() {
  const totalAmount = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (totalAmount > 0) {
    alert(`Thank you for your order! Your total is $${totalAmount}`);
    localStorage.clear(); // Clear cart
    cart = {}; // Reset cart
    window.location.href = "index.html"; // Redirect to Home
  } else {
    alert("Your cart is empty!");
  }
}

// Automatically load cart on checkout page
window.onload = function () {
  if (document.getElementById('cart-summary')) {
    loadCart();
  }
};

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send form data to the server using AJAX (or use fetch API to save it to your database)
    alert(`Thank you for your message, ${name}!`);


    // Reset form fields
    document.getElementById('contactForm').reset();

});