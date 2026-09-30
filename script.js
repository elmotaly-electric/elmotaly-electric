const products = [
  {
    id: 1,
    name: "مكواة كهربائية",
    category: "iron",
    price: 0,
    image: "images/Irons_.png"
  },
  {
    id: 2,
    name: "ميكروويف وأفران",
    category: "microwave",
    price: 0,
    image: "images/Microwaves_Ovens_.png"
  },
  {
    id: 3,
    name: "Air Fryer",
    category: "kitchen",
    price: 0,
    image: "images/Home-Appliances-Small-Kitchen-Appliances-Photo-Image-Picture-Menu-air-Fryers.jpg_300x300.jpg"
  },
  {
    id: 4,
    name: "موزع مياه كهربائي",
    category: "other",
    price: 0,
    image: "images/Whole-House-Water-Filter-with-Refrigerator-Chinese-Hot-and-Clod-Electric-Water-Dispenser.webp"
  },
  {
    id: 5,
    name: "جهاز كهربائي",
    category: "other",
    price: 0,
    image: "images/1707190558_3.png"
  },
  {
    id: 6,
    name: "جهاز منزلي",
    category: "other",
    price: 0,
    image: "images/81UVEfpRHAL.jpg"
  }
];

let cart = [];

function displayProducts(list = products) {
  const grid = document.getElementById("productsGrid");

  if (!list.length) {
    grid.innerHTML = "<p>لا توجد منتجات مطابقة للبحث.</p>";
    return;
  }

  grid.innerHTML = list.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      
      <div class="product-info">
        <h3>${product.name}</h3>

        <div class="product-price">
          ${product.price > 0 ? product.price + " جنيه" : "السعر عند الطلب"}
        </div>

        <button class="add-btn" onclick="addToCart(${product.id})">
          🛒 أضف إلى السلة
        </button>
      </div>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  cart.push(product);
  updateCart();

  alert("تمت إضافة المنتج إلى السلة ✅");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartCount.textContent = cart.length;

  if (!cart.length) {
    cartItems.innerHTML = "<p>السلة فارغة.</p>";
    cartTotal.textContent = "0";
    return;
  }

  cartItems.innerHTML = cart.map((product, index) => `
    <div class="cart-item">
      <h4>${product.name}</h4>
      <p>${product.price > 0 ? product.price + " جنيه" : "السعر عند الطلب"}</p>
      <button class="remove-btn" onclick="removeFromCart(${index})">
        حذف
      </button>
    </div>
  `).join("");

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  cartTotal.textContent = total;
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open");
}

function filterProducts(category) {
  if (category === "all") {
    displayProducts(products);
    return;
  }

  const filtered = products.filter(product => product.category === category);
  displayProducts(filtered);
}

function searchProducts() {
  const search = document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search)
  );

  displayProducts(filtered);
}

function orderWhatsApp() {
  if (!cart.length) {
    alert("السلة فارغة.");
    return;
  }

  let message = "السلام عليكم، أريد طلب المنتجات التالية:%0A%0A";

  cart.forEach((product, index) => {
    message += `${index + 1}- ${product.name}%0A`;
  });

  message += "%0Aمن متجر المتولي إليكتريك.";

  const phone = "201000000000";

  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
  );
}

displayProducts();
updateCart();
