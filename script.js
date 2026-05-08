let cart = JSON.parse(localStorage.getItem('dtech_cart')) || [];

function addToCart(name, price, image) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
        cart.push({ name, price, image, quantity: 1 }); 
    }

    localStorage.setItem('dtech_cart', JSON.stringify(cart));
    showToast();
    updateCartUI();
}


function showToast() {
    const toast = document.getElementById('toast-message');
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}


function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
    updateCartUI();
}


function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const totalDisplay = document.getElementById('total-amount');
    list.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = '<p class="empty-msg">Giỏ hàng đang trống.</p>';
    }

    cart.forEach((item, index) => {
        const priceValue = parseInt(item.price.replace(/\./g, ''));
        total += priceValue * item.quantity;

        list.innerHTML += `
            <div class="cart-item" style="display:flex; align-items:center; justify-content: space-between; margin-bottom:15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <div style="display:flex; align-items:center;">
                    <img src="${item.image}" width="50" style="margin-right:15px; border-radius:5px;">
                    <div>
                        <p style="font-weight:bold; margin:0">${item.name}</p>
                        <p style="color:#1a49db; margin:5px 0">${item.price}</p>
                    </div>
                </div>
                
                <div class="quantity-controls" style="display:flex; align-items:center; gap:10px;">
                    <button onclick="changeQuantity(${index}, -1)" class="qty-btn">-</button>
                    <span style="font-weight:bold; min-width:20px; text-align:center;">${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)" class="qty-btn">+</button>
                </div>
            </div>`;
    });
    totalDisplay.innerText = total.toLocaleString('vi-VN') + 'đ';
}
function changeQuantity(index, delta) {
    cart[index].quantity += delta;

    // Nếu số lượng giảm xuống 0 thì xóa luôn sản phẩm đó
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('dtech_cart', JSON.stringify(cart));
    updateCartUI();
}
