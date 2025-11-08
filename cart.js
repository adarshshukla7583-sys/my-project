document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selections ---
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const overlay = document.getElementById('overlay');
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    // Use a more generic selector to find the cart link/icon in the nav
    const cartLink = document.querySelector('a[href="#"], a[id="cart-link"]');


    // --- Cart State ---
    let cart = [];

    // --- Functions ---
    const openCart = () => {
        // Use a consistent class name for opening the cart
        cartSidebar.classList.add('open');
        overlay.classList.add('active');
    };

    const closeCart = () => {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('active');
    };

    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                // Updated to use a unique ID for better item management
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <p class="cart-item-title">${item.name}</p>
                        <p class="cart-item-price">₹${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                    <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="cart-item-remove" data-id="${item.id}">&times;</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
        updateCartTotal();
    };

    const updateCartTotal = () => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalPriceEl.textContent = `₹${total.toFixed(2)}`;
    };

    const addToCart = (product) => {
        // Check if item already exists by name
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            // Add a unique ID based on timestamp
            cart.push({ ...product, quantity: 1, id: Date.now() });
        }
        updateCart();
        openCart();
    };

    // --- Event Listeners ---
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (overlay) {
        overlay.addEventListener('click', closeCart);
    }


    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            // Ensure price is parsed as a number from the start
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;

            // Only add to cart if the price is a valid number
            if (name && !isNaN(price) && image) {
                addToCart({ name, price, image });
            } else {
                console.error("Could not add item to cart. Product data is invalid.", { name, price, image });
            }
        });
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('cart-item-quantity')) {
            const id = parseInt(e.target.dataset.id);
            const quantity = parseInt(e.target.value);
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity = quantity > 0 ? quantity : 1;
            }
            updateCart();
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-item-remove')) {
            const id = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
    });

    // Optional: Payment Modal functionality from cake-detail.js
    // If you have payment modals on your pages, keep this section.
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        const buyNowBtn = document.querySelector('.btn-buy');
        const proceedToBuyBtn = document.querySelector('.buy-button');
        const closeModalBtn = document.querySelector('.close-modal');
        const paymentForm = document.getElementById('payment-form');
        const successModal = document.getElementById('success-modal');
        const closeSuccessModalBtn = document.getElementById('close-success-modal');

        const openPaymentModal = () => {
            if (cartSidebar.classList.contains('open')) closeCart();
            paymentModal.style.display = 'flex';
            overlay.classList.add('active');
        };

        const closePaymentModal = () => {
            paymentModal.style.display = 'none';
            if (!successModal || successModal.style.display !== 'flex') {
                overlay.classList.remove('active');
            }
        };

        const openSuccessModal = () => {
            successModal.style.display = 'flex';
            overlay.classList.add('active');
        };

        const closeSuccessModal = () => {
            successModal.style.display = 'none';
            overlay.classList.remove('active');
        };

        overlay.addEventListener('click', () => {
            closeCart();
            closePaymentModal();
            closeSuccessModal();
        });

        if (buyNowBtn) buyNowBtn.addEventListener('click', openPaymentModal);
        if (proceedToBuyBtn) proceedToBuyBtn.addEventListener('click', openPaymentModal);
        if (closeModalBtn) closeModalBtn.addEventListener('click', closePaymentModal);
        if (closeSuccessModalBtn) closeSuccessModalBtn.addEventListener('click', closeSuccessModal);

        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                closePaymentModal();
                openSuccessModal();
                cart = []; // Empty the cart after successful purchase
                updateCart();
            });
        }
    }
});