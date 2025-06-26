// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !mobileMenuButton.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const productId = this.getAttribute("data-id");
      const productName = this.getAttribute("data-name");
      const productPrice = this.getAttribute("data-price");
      const productImage = this.getAttribute("data-image");

      addToCart(productId, productName, productPrice, productImage);

      // Show notification
      showNotification(`${productName} added to cart!`);
    });
  });

  // Quantity buttons in product detail
  const quantityInput = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increase-quantity");
  const decreaseBtn = document.getElementById("decrease-quantity");

  if (quantityInput && increaseBtn && decreaseBtn) {
    increaseBtn.addEventListener("click", function () {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decreaseBtn.addEventListener("click", function () {
      if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });
  }
});

// Cart functionality
function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;

    if (cartCount > 0) {
      cartCountElement.classList.remove("hidden");
    } else {
      cartCountElement.classList.add("hidden");
    }
  }
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fadeIn";
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});
