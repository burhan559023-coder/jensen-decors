document.addEventListener("DOMContentLoaded", function () {

/* =====================
ADD TO CART
===================== */
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

button.addEventListener("click", function () {

const text = button.innerText.trim().toLowerCase();

if (text.includes("buy") || text.includes("shop")) {

const card = button.closest(".card");
if (!card) return;

const name =
card.querySelector("h3")?.innerText ||
card.querySelector("h2")?.innerText ||
"Product";

let price = 0;

const priceTag = card.querySelector(".price");

if (priceTag) {
price = parseInt(priceTag.innerText.replace(/[^\d]/g, "")) || 0;
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name: name,
price: price
});

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart!");

}

});

});


/* =====================
LOAD CART
===================== */
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function loadCart() {

if (!cartItems) return;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartItems.innerHTML = "";

let total = 0;

if (cart.length === 0) {
cartItems.innerHTML = "<p>Your cart is empty.</p>";
cartTotal.innerText = "0";
return;
}

cart.forEach((item, index) => {

total += item.price;

cartItems.innerHTML += `
<div class="cart-item">
<h3>${item.name}</h3>
<p>${item.price} PKR</p>
<button onclick="removeItem(${index})">Remove</button>
</div>
`;

});

cartTotal.innerText = total;

}

window.removeItem = function(index){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

loadCart();

}

loadCart();


/* =====================
CHECKOUT
===================== */
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

checkoutForm.addEventListener("submit", function(e){

e.preventDefault();

const name = document.getElementById("fullName").value;

const orderNo = Math.floor(Math.random()*9000)+1000;

alert("Thank you " + name + "\nYour Order #JD" + orderNo + " placed successfully!");

localStorage.removeItem("cart");

window.location.href = "index.html";

});

}


/* =====================
BRAND FILTER
===================== */
const brandFilter = document.getElementById("brandFilter");

if (brandFilter) {

brandFilter.addEventListener("change", function(){

const selected = this.value.toLowerCase();

const cards = document.querySelectorAll(".product-list .card");

cards.forEach(card => {

const brand = card.getAttribute("data-brand").toLowerCase();

if (selected === "all" || selected === brand) {
card.style.display = "block";
} else {
card.style.display = "none";
}

});

});

}


/* =====================
CONTACT FORM
===================== */
const contactForm = document.querySelector("#contact-form form");

if(contactForm){

contactForm.addEventListener("submit", function(e){

e.preventDefault();

alert("Message submitted successfully!");

});

}

});