let cart = JSON.parse(localStorage.getItem('dtech_cart')) || [];

// 1. Hàm thêm vào giỏ
function addToCart(name, price, image) {
    cart.push({ name, price, image });
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

    cart.forEach((item, index) => {
        total += parseInt(item.price.replace(/\./g, ''));
        list.innerHTML += `
            <div class="cart-item" style="display:flex; align-items:center; margin-bottom:10px;">
                <img src="${item.image}" width="50" style="margin-right:15px">
                <div style="flex:1">
                    <p style="font-weight:bold; margin:0">${item.name}</p>
                    <p style="color:red; margin:0">${item.price}</p>
                </div>
            </div>`;
    });
    totalDisplay.innerText = total.toLocaleString('vi-VN') + 'đ';
}
