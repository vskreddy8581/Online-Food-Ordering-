let searchBox = document.getElementById("searchinput");

let items = document.querySelectorAll(".card");

let notfound = document.getElementById("notfound");

searchBox.addEventListener("input", () => {

    let value = searchBox.value.toLowerCase().trim();

    let found = false;

    items.forEach((item) => {

        let text = item.textContent.toLowerCase();

        if (text.includes(value)) {

            item.style.display = "block";

            found = true;

        } else {

            item.style.display = "none";

        }

    });

    if (found) {

        notfound.style.display = "none";

    } else {

        notfound.style.display = "block";

    }

});


// CART
let cart = [];
let finalAmount = 0;


// ELEMENTS
let buttons = document.querySelectorAll(".add");
let cartCount = document.querySelector(".cart-count");
let cartItems = document.querySelector(".cartItems");
let total = document.getElementById("total");

let cartPanel = document.getElementById("cartpannel");
let openCart = document.getElementById("opencart");
let closeCart = document.getElementById("closeCart");

let clear = document.getElementById("clear");
let pay = document.getElementById("pay");


// OPEN / CLOSE CART
openCart.onclick = () => {
    cartPanel.classList.add("active");
};

closeCart.onclick = () => {
    cartPanel.classList.remove("active");
};


// ADD TO CART
buttons.forEach((btn) => {

    btn.addEventListener("click", () => {

        let item = btn.closest(".card");

        let name = item.querySelector("h3").textContent;

        let price = parseInt(
            item.querySelector(".price")
                .textContent
                .replace("₹", "")
        );
        let existingItem = cart.find(
            product => product.name == name
        );
        if (existingItem) {
            existingItem.quantity++
        }
        else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

    });

});
function increaseQty(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQty(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

// REMOVE ITEM
function removefromcart(index) {

    cart.splice(index, 1);

    updateCart();

}


function updateCart() {

    cartCount.textContent = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    cartItems.innerHTML = "";

    let sum = 0;

    if (cart.length === 0) {

        total.style.visibility = "hidden";
        clear.style.visibility = "hidden";
        pay.style.visibility = "hidden";

        cartItems.innerHTML = `
            <p class="cartempty">
                Your Cart is Empty
            </p>
        `;

        return;
    }

    total.style.visibility = "visible";
    clear.style.visibility = "visible";
    pay.style.visibility = "visible";

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        sum += itemTotal;

        cartItems.innerHTML += `
        <div class="cart-item">

            <div class="item-details">
                <h4>${item.name}</h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                    =
                    ₹${itemTotal}
                </p>
            </div>

            <div class="qty-controls">

                <button
                    onclick="decreaseQty(${index})"
                    class="btn-cart"
                >
                    −
                </button>

                <span>${item.quantity}</span>

                <button
                    onclick="increaseQty(${index})"
                    class="btn-cart"
                >
                    +
                </button>

            </div>

        </div>
        `;
    });

    finalAmount = sum;

    total.textContent = "Total : ₹" + finalAmount;
}


// CLEAR CART
clear.addEventListener("click", () => {

    cart = [];

    updateCart();

});


// PAYMENT
pay.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Cart is Empty");

        return;
    }
    let name = prompt("Enter Customer Name:")
    let num = prompt("Enter Mobile Number:") 
    let add = prompt("Enter Your Address:")
    alert(`
    Name: ${name}
    Mobile: ${num}
    Address:${add}
    Total Amount Paid Successfully: ₹${finalAmount}`
    );
    cartPanel.classList.remove("active");
    cart = [];

    updateCart();

});


// INITIAL STATE
updateCart();