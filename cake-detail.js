document.addEventListener('DOMContentLoaded', () => {
    // --- Cart functionality ---
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const overlay = document.getElementById('overlay');
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const cartLink = document.getElementById('cart-link');

    let cart = [];

    const openCart = () => {
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
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                    </div>
                    <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-name="${item.name}">
                    <button class="cart-item-remove" data-name="${item.name}">&times;</button>
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
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        openCart();
    };

    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });

    closeCartBtn.addEventListener('click', closeCart);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;
            addToCart({ name, price, image });
        });
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('cart-item-quantity')) {
            const name = e.target.dataset.name;
            const quantity = parseInt(e.target.value);
            const item = cart.find(i => i.name === name);
            if (item) {
                item.quantity = quantity > 0 ? quantity : 1;
            }
            updateCart();
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-item-remove')) {
            const name = e.target.dataset.name;
            cart = cart.filter(item => item.name !== name);
            updateCart();
        }
    });


    // --- Payment Modal functionality ---
    const paymentModal = document.getElementById('payment-modal');
    const buyNowBtn = document.querySelector('.btn-buy');
    const proceedToBuyBtn = document.querySelector('.buy-button');
    const closeModalBtn = document.querySelector('.close-modal');
    const paymentForm = document.getElementById('payment-form');
    const successModal = document.getElementById('success-modal');
    const closeSuccessModalBtn = document.getElementById('close-success-modal');

    const openPaymentModal = () => {
        if (cartSidebar.classList.contains('open')) {
            closeCart();
        }
        paymentModal.style.display = 'flex';
        overlay.classList.add('active');
    };

    // ==== THIS IS THE MISSING FUNCTION ====
    const closePaymentModal = () => {
        paymentModal.style.display = 'none';
        overlay.classList.remove('active');
    };
    // =====================================


    const closeSuccessModal = () => {
        successModal.style.display = 'none';
        overlay.classList.remove('active');
    };

    overlay.addEventListener('click', () => {
        closeCart();
        closePaymentModal();
        closeSuccessModal();
    });

    buyNowBtn.addEventListener('click', openPaymentModal);
    proceedToBuyBtn.addEventListener('click', openPaymentModal);
    closeModalBtn.addEventListener('click', closePaymentModal);
    closeSuccessModalBtn.addEventListener('click', closeSuccessModal);

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        closePaymentModal();
        openSuccessModal();

        cart = [];
        updateCart();
    });
});