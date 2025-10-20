// Product data (customize with your supermarket items)
const products = [
    { id: 1, name: 'Fresh Milk', price: 3.99, image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23fff" width="200" height="200"/><text x="50%" y="50%" font-size="16" fill="%23666" text-anchor="middle" dy=".3em">Milk</text></svg>' },
    { id: 2, name: 'Whole Wheat Bread', price: 2.49, image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23fff" width="200" height="200"/><text x="50%" y="50%" font-size="16" fill="%23666" text-anchor="middle" dy=".3em">Bread</text></svg>' },
    { id: 3, name: 'Apples (Pack of 6)', price: 4.99, image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23fff" width="200" height="200"/><text x="50%" y="50%" font-size="16" fill="%23666" text-anchor="middle" dy=".3em">Apples</text></svg>' },
    { id: 4, name: 'Organic Eggs', price: 5.29, image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23fff" width="200" height="200"/><text x="50%" y="50%" font-size="16" fill="%23666" text-anchor="middle" dy=".3em">Eggs</text></svg>' },
    { id: 5, name: 'Banana Bunch', price: 1.99, image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23fff" width="200" height="200"/><text x="50%" y="50%" font-size="16" fill="%23666" text-anchor="middle" dy=".3em">Bananas</text></svg>' },
    { id: 6, name: 'Cereal Box', price: 4.50, image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23fff" width="200" height="200"/><text x="50%" y="50%" font-size="16" fill="%23666" text-anchor="middle" dy=".3em">Cereal</text></svg>' }
];

// Shopping cart array
let cart = [];

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Render products
function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
        count += item.quantity;
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);
}

// Checkout (simple alert for demo)
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Thank you for shopping at ATM-SUPERMART! Total: $${cartTotal.textContent}. Order placed successfully. (Integrate real payment here.)`);
        cart = [];
        updateCart();
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});