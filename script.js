// Fetch cart data from API (replace with your actual API endpoint)
fetch('https://your-api-endpoint.com/cart') 
    .then(response => response.json())
    .then(data => {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalsContainer = document.getElementById('cart-totals');

        let total = 0;

        data.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>Price: ₹${item.price.toFixed(2)}</p>
                <div>
                    <label for="quantity-${item.id}">Quantity:</label>
                    <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1">
                </div>
                <p>Subtotal: ₹${item.line_price.toFixed(2)}</p>
                <button class="remove-item">Remove</button>
            `;

            const quantityInput = cartItem.querySelector('input[type="number"]');

            quantityInput.addEventListener('change', () => {
                const newQuantity = parseInt(quantityInput.value);
                if (newQuantity > 0) { 
                    const newSubtotal = item.price * newQuantity;
                    cartItem.querySelector('p:last-of-type').textContent = `Subtotal: ₹${newSubtotal.toFixed(2)}`;
                    calculateTotal();
                } else {
                    // Handle invalid quantity (e.g., show an error message)
                    quantityInput.value = 1; 
                }
            });

            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                cartItem.remove();
                calculateTotal();
            });

            cartItemsContainer.appendChild(cartItem);

            total += item.line_price;
        });

        cartTotalsContainer.innerHTML = `
            <h3>Cart Totals</h3>
            <p>Subtotal: ₹${total.toFixed(2)}</p>
            <p>Total: ₹${total.toFixed(2)}</p>
            <button>Check Out</button>
        `;
    })
    .catch(error => {
        console.error('Error fetching cart data:', error);
        // Handle error gracefully (e.g., display error message to user)
        // For example:
        cartItemsContainer.innerHTML = '<p>Error loading cart items.</p>';
    });

function calculateTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;

    cartItems.forEach(item => {
        const subtotalElement = item.querySelector('p:last-of-type');
        const subtotalText = subtotalElement.textContent;
        const subtotal = parseFloat(subtotalText.split('₹')[1]);
        total += subtotal;
    });

    const cartTotalsContainer = document.getElementById('cart-totals');
    cartTotalsContainer.querySelector('p:nth-child(2)').textContent = `Subtotal: ₹${total.toFixed(2)}`;
    cartTotalsContainer.querySelector('p:nth-child(3)').textContent = `Total: ₹${total.toFixed(2)}`;
}