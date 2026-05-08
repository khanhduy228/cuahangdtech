
let cart = JSON.parse(localStorage.getItem('dtech_cart')) || [];

document.addEventListener('DOMContentLoaded', updateCartUI);


function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    saveAndRefresh();
    showToast();
}


function changeQuantity(index, delta) {
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveAndRefresh();
    }
}


function removeFromCart(index) {
    {
        cart.splice(index, 1);
        saveAndRefresh();
    }
}


function saveAndRefresh() {
    localStorage.setItem('dtech_cart', JSON.stringify(cart));
    updateCartUI();
}


function showToast() {
    const toast = document.getElementById('toast-message');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }
}


function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
    }
}


function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const totalDisplay = document.getElementById('total-amount');
    if (!list || !totalDisplay) return;

    list.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align:center; padding:20px;">Giỏ hàng đang trống.</p>';
    } else {
        cart.forEach((item, index) => {
            const priceValue = parseInt(item.price.replace(/\./g, '').replace('đ', ''));
            total += priceValue * item.quantity;

            list.innerHTML += `
                <div class="cart-item" style="display:flex; align-items:center; justify-content: space-between; margin-bottom:15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                    <div style="display:flex; align-items:center;">
                        <img src="${item.image}" width="50" style="margin-right:15px; border-radius:5px;">
                        <div>
                            <p style="font-weight:bold; margin:0;">${item.name}</p>
                            <p style="color:#1a49db; margin:5px 0;">${item.price}</p>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <button onclick="removeFromCart(${index})" class="remove-btn"><i class="fa-solid fa-trash-can"></i></button>
                        <button onclick="changeQuantity(${index}, -1)" class="qty-btn">-</button>
                        <span style="font-weight:bold;">${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)" class="qty-btn">+</button>
                    </div>
                </div>`;
        });
    }
    totalDisplay.innerText = total.toLocaleString('vi-VN') + 'đ';
}
