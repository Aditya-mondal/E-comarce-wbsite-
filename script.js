let cart = [];

const darkModeToggle = document.getElementById('darkModeToggle');
const modal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.modal .close');
const modalCartItems = document.getElementById('modal-cart-items');
const modalTotal = document.getElementById('modal-total');
const modalCheckout = document.getElementById('modal-checkout');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const checkoutButton = document.getElementById('checkout');
const addToCartButtons = document.querySelectorAll('.product-card button');
const productImages = document.querySelectorAll('.product-image');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        const price = parseFloat(button.getAttribute('data-price'));
        addProductToCart(product, price);
        alert(`${product} added to cart!`);
    });
});

function addProductToCart(product, price) {
    cart.push({ product, price });
    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        checkoutButton.style.display = 'none';
    } else {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.textContent = `${item.product} - $${item.price.toFixed(2)}/lb`;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        const totalDisplay = document.createElement('p');
        totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
        cartItemsContainer.appendChild(totalDisplay);

        checkoutButton.style.display = 'block';
    }
}

checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        modal.style.display = 'block';
        updateModalCart();
    } else {
        alert('Your cart is empty. Please add items to your cart.');
        window.location.hash = '#products'; // Redirects to the product section
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

function updateModalCart() {
    modalCartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.product} - $${item.price.toFixed(2)}/lb`;
        modalCartItems.appendChild(cartItem);
        total += item.price;
    });

    modalTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

modalCheckout.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thank you for your purchase!');
        cart = [];
        updateCart();
        modal.style.display = 'none';
        window.location.hash = ''; // Redirects to the original page
    } else {
        alert('Your cart is empty. Please add items to your cart.');
        modal.style.display = 'none';
        window.location.hash = '#products'; // Redirects to the product section
    }
});
