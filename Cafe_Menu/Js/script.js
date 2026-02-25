/* ==========================================================================
   SECTION 1: DATA SOURCE & STATE INITIALIZATION
   ========================================================================== */

// Mock Database: Array of all available products
// 'cat' refers to the category used for filtering (hot, cold, cake)
const products = [
    { id: 1, name: "اسپرسو دبل", price: 45000, cat: "hot", img: "https://images.unsplash.com/photo-1570968992193-6e584a94764e?w=400&q=80", desc: "۱۰۰٪ عربیکا" },
    { id: 2, name: "کاپوچینو", price: 65000, cat: "hot", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80", desc: "شیر گرم و فوم" },
    { id: 3, name: "آیس لته", price: 70000, cat: "cold", img: "https://images.unsplash.com/photo-1461023058943-716d1629796e?w=400&q=80", desc: "خنک و دلچسب" },
    { id: 4, name: "کیک شکلاتی", price: 85000, cat: "cake", img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?w=400&q=80", desc: "شکلات بلژیکی" },
    { id: 5, name: "قهوه ترک", price: 40000, cat: "hot", img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=80", desc: "سنتی و غلیظ" },
    { id: 6, name: "موکا سرد", price: 75000, cat: "cold", img: "https://images.unsplash.com/photo-1517701604599-bb29b5c73553?w=400&q=80", desc: "شکلات و اسپرسو" },
    { id: 7, name: "تیرامیسو", price: 95000, cat: "cake", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80", desc: "کلاسیک ایتالیایی" },
    { id: 8, name: "لاته کارامل", price: 68000, cat: "hot", img: "https://images.unsplash.com/photo-1599398054066-846f28917f38?w=400&q=80", desc: "سیروپ کارامل" },
];

/**
 * Cart State:
 * Retrieves cart data from LocalStorage to persist data across page reloads.
 * If no data exists, initializes an empty array [].
 */
let cart = JSON.parse(localStorage.getItem('cart')) || [];


/* ==========================================================================
   SECTION 2: CART LOGIC (CRUD Operations)
   ========================================================================== */

/**
 * Saves the current cart array to Browser's LocalStorage
 * and triggers a global UI update (badges, totals, etc).
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateGlobalUI();
}

/**
 * Adds a product to the cart.
 * If product exists: Increment quantity (qty).
 * If new: Add product object with qty = 1.
 * @param {number} id - Product ID
 */
function addToCart(id) {
    const exist = cart.find(c => c.id === id);
    if (exist) {
        exist.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    
    // اگر در صفحه اصلی هستیم و سایدبار وجود دارد، آن را باز کن
    const sidebar = document.getElementById('cart-sidebar'); // باید چک کنی توی HTML سایدبار کامل هست یا نه
    if (sidebar && sidebar.classList.contains('-translate-x-full')) {
         // کد باز کردن سایدبار (اگر سایدبار در HTML موجود باشد)
         // چون در کد home.html شما سایدبار کامل نیست، این بخش ممکن است ارور ندهد اما کار هم نکند
         // پیشنهاد: در home.html دکمه سبد را لینک کنید به checkout.html
         window.location.href = 'checkout.html';
    }
}

/**
 * Modifies the quantity of an item.
 * Removes the item if quantity drops to 0 or less.
 * @param {number} id - Product ID
 * @param {number} amount - (+1 or -1)
 */
function changeQty(id, amount) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += amount;
        if (item.qty <= 0) {
            cart = cart.filter(c => c.id !== id); // Remove item
        }
        saveCart();
    }
}

/**
 * Completely removes an item from the cart regardless of quantity.
 */
function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    saveCart();
}

/**
 * Finalizes the order.
 * Clears the cart, saves empty state, and redirects to Home.
 */
function submitOrder() {
    if (cart.length === 0) return alert('سبد خرید شما خالی است!');
    
    alert('سفارش شما با موفقیت ثبت شد!\nاز خرید شما متشکریم.');
<<<<<<< HEAD
    cart = []; // خالی کردن سبد
    saveCart(); // ذخیره سبد خالی
    window.location.href = 'home.html'; // بازگشت به صفحه اصلی
=======
    cart = []; // Reset cart
    saveCart(); // Sync with LocalStorage
    window.location.href = 'Home.html'; // Redirect
>>>>>>> e00c8afc (Added comment)
}


/* ==========================================================================
   SECTION 3: UI & DOM MANIPULATION
   ========================================================================== */

/**
 * Updates common UI elements across all pages (e.g., Cart Badge).
 * Also re-renders the checkout list if the user is on the Checkout page.
 */
function updateGlobalUI() {
    // 1. Update Cart Badge (Red circle on icon)
    const badge = document.getElementById('cart-count');
    if (badge) {
        const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
        badge.innerText = totalCount;
        
        // Toggle visibility based on count
        if (totalCount > 0) {
            badge.classList.remove('hidden');
            badge.classList.add('flex');
        } else {
            badge.classList.add('hidden');
            badge.classList.remove('flex');
        }
    }

    // 2. If we are on the Checkout Page, re-render the list
    if (document.getElementById('cart-page-items')) {
        renderCheckoutPage();
    }
<<<<<<< HEAD
    
    // 3. اگر در صفحه Home هستیم (و سایدبار داریم)
    /* با توجه به کد home.html شما، سایدبار کامل نیست، پس اینجا کدی نمیذاریم
       که باعث ارور نشه. تمرکز رو میذاریم روی صفحه checkout.html */
=======
>>>>>>> e00c8afc (Added comment)
}


/* ==========================================================================
   SECTION 4: RENDER FUNCTIONS (Generating HTML)
   ========================================================================== */

/**
 * Renders the product grid on the Home Page.
 * @param {Array} list - Array of product objects to display
 */
function renderProducts(list) {
    const container = document.getElementById('products-container');
    if (!container) return; // Exit if element doesn't exist (e.g., on Checkout page)

    container.innerHTML = '';
    
    // Handle "No Result" message
    const noResult = document.getElementById('no-result');
    if(list.length === 0) {
        if(noResult) { noResult.classList.remove('hidden'); noResult.classList.add('flex'); }
    } else {
        if(noResult) { noResult.classList.add('hidden'); noResult.classList.remove('flex'); }
    }

    // Generate HTML Cards
    list.forEach(p => {
        container.innerHTML += `
        <div class="bg-white rounded-2xl p-3 border border-stone-100 shadow-sm hover:shadow-xl transition group flex flex-col">
            <div class="relative bg-stone-100 rounded-xl overflow-hidden h-48 mb-3">
                <img src="${p.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
            </div>
            <div class="flex-1">
                <h3 class="font-bold text-stone-800 mb-1">${p.name}</h3>
                <p class="text-xs text-stone-500 line-clamp-2 mb-3">${p.desc}</p>
            </div>
            <div class="mt-auto pt-3 border-t border-stone-100">
                <div class="flex items-center gap-2 mb-3">
                    <span class="text-lg font-bold text-stone-900">${p.price.toLocaleString()}</span>
                    <span class="text-xs text-stone-500">تومان</span>
                </div>
                <button onclick="addToCart(${p.id})" class="w-full bg-stone-900 text-white font-bold py-2.5 rounded-xl hover:bg-amber-500 hover:text-stone-900 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-stone-900/10">
                    افزودن به سبد
                </button>
            </div>
        </div>`;
    });
}

/**
 * Renders the list of selected items on the Checkout Page.
 * Calculates total price and updates the summary.
 */
function renderCheckoutPage() {
    const container = document.getElementById('cart-page-items');
    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    // Handle Empty Cart
    if (cart.length === 0) {
        container.innerHTML = `<p class="text-center text-stone-400 py-10">سبد خرید شما خالی است</p>`;
        document.getElementById('summary-total').innerText = "0 تومان";
        document.getElementById('cart-page-count').innerText = "0";
        return;
    }

    // Generate List Rows
    cart.forEach(item => {
        total += item.price * item.qty;
        container.innerHTML += `
        <div class="flex items-center gap-4 bg-stone-50 p-3 rounded-xl border border-stone-100">
            <img src="${item.img}" class="w-16 h-16 rounded-lg object-cover bg-white">
            <div class="flex-1">
                <h4 class="font-bold text-stone-800">${item.name}</h4>
                <div class="text-amber-600 font-bold text-sm">${item.price.toLocaleString()} تومان</div>
            </div>
            <div class="flex items-center gap-2 bg-white rounded-lg px-2 py-1 border border-stone-200">
                <button onclick="changeQty(${item.id}, 1)" class="text-green-600 cursor-pointer font-bold px-1 hover:scale-110">+</button>
                <span class="font-bold w-6 text-center text-sm">${item.qty}</span>
                <button onclick="changeQty(${item.id}, -1)" class="text-red-500 cursor-pointer font-bold px-1 hover:scale-110">-</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-stone-400 cursor-pointer hover:text-red-500 transition">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            </button>
        </div>`;
    });

    // Update Summary Footer
    document.getElementById('summary-total').innerText = total.toLocaleString() + ' تومان';
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById('cart-page-count').innerText = totalCount;
}

// --- Filtering & Searching ---

function filterCategory(cat) {
    if (cat === 'all') renderProducts(products);
    else renderProducts(products.filter(p => p.cat === cat));
}

function handleSearch(query) {
    const filtered = products.filter(p => p.name.includes(query) || p.desc.includes(query));
    renderProducts(filtered);
}


/* ==========================================================================
   SECTION 5: INITIALIZATION (DOMContentLoaded)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Always sync UI with stored cart data on page load
    updateGlobalUI();

    // --- CASE 1: HOME PAGE ---
    if (document.getElementById('products-container')) {
        renderProducts(products);
        
        // Update Sidebar Counts (Note: HTML IDs for counts need to be unique)
        const countAll = document.getElementById('count-all');
        if(countAll) {
            countAll.innerText = products.length;
            document.getElementById('count-hot').innerText = products.filter(p => p.cat === 'hot').length;
            document.getElementById('count-cold').innerText = products.filter(p => p.cat === 'cold').length;
        }
        
        // Auto-focus search bar if present
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.focus();
    }

    // --- CASE 2: CHECKOUT PAGE ---
    if (document.getElementById('cart-page-items')) {
        renderCheckoutPage();
    }

    // --- CASE 3: LANDING PAGE TRANSITION ---
    // Handles the "Enter" button animation on the Landing page
    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            const body = document.body;
            const card = document.querySelector('.glass-card');
            
            // 1. Animate card upwards and fade out
            if(card) {
                card.style.transition = 'all 0.6s ease-in';
                card.style.transform = 'translateY(50px)';
                card.style.opacity = '0';
            }
            // 2. Fade out body background
            setTimeout(() => {
                body.style.transition = 'opacity 0.5s ease';
                body.style.opacity = '0';
            }, 200);
            // 3. Navigate to Home
            setTimeout(() => {
                window.location.href = 'home.html'; 
            }, 800);
        });
    }

<<<<<<< HEAD
});
=======
});

// --- Navigation Helper ---
function CheckoutPage() {
    window.location.href = 'checkout.html';
}

// --- Cart Button Transition Event ---
var cart_btn = document.getElementById('cart');
if (cart_btn) {
    cart_btn.addEventListener('click', function() {
        const body = document.body;
        
        // Fade effect before navigating to checkout
        setTimeout(() => {
            body.style.transition = 'opacity 0.5s ease';
            body.style.opacity = '0.5';
        }, 300);
        setTimeout(() => {
            CheckoutPage();
        }, 800);
    });
}
>>>>>>> e00c8afc (Added comment)
