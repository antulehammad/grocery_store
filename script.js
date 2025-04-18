let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, qtyInputId) {
  const qty = parseInt(document.getElementById(qtyInputId).value) || 1;
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${qty} x ${name} added to cart!`);
}

function renderCart() {
  const itemsContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  itemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} (x${item.qty}) - $${(item.price * item.qty).toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    itemsContainer.appendChild(div);
    total += item.price * item.qty;
  });

  totalEl.textContent = total.toFixed(2);
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thanks for your purchase!");
  localStorage.removeItem('cart');
  cart = [];
  renderCart();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const icon = document.getElementById("cart-count");
  if (icon) icon.textContent = count;
}

if (location.pathname.endsWith("cart.html")) {
  renderCart();
} else {
  updateCartCount();
}
