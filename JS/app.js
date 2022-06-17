//Project Logic

// 1) Create the Shopping Cart, I used an object in the object.js file to manage all in one central place.

// 2) The product list is created by object.js file and stored to the local storage

// 3) Retrieve the product list from the constructor function
const productsListReturned = JSON.parse(localStorage.getItem("productsList"));
const totalSum_before = JSON.parse(localStorage.getItem("totalcost"));
const couponRandomValue = JSON.parse(localStorage.getItem("coupon"));

// // 4) The productsList returned from storage is used to render the items on the home page. Any changes to the products can be made in object.js

// // Function used to render the items from the object.js through the local storage
function addItemsHTML() {
    productsListReturned.forEach((product) =>
        $('#shoppingItems').append(
            `
    <div id="${product.id}" data-id="${product.id}" class= "card">
    <i class ="bi bi-heart"></i> 
    <img class = "item-image" src = "${product.image}" alt = "${product.description}">
    <h2 class = "item-price card-title" >${product.unitprice}</h2>
    <button class = "btn-add2Cart btn btn-primary" type ="submit" onclick ="addToCart(event)">Add to Cart</button>
    </div>`
        )
    )
}

addItemsHTML();

// 5) This function compares the item id in the object array and the item clicked on. The event returns the object of the product matching the id from the object array.
// This new object returned will be used to add the item to the cart

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Any products stored in the cart will first be added if the session is closed or the cart will just be an empty array
$('#checkoutQty').html(JSON.parse(localStorage.getItem("qty"))); // The existing quantity will be displayed on the shopping cart in red.

function addToCart(event) {
    const parentEl = event.target.parentElement // Return the parent div of the item selected by clicking on the add to cart button
    const productid = parentEl.dataset.id; //Return the item id of the product selected
    const itemAdded = productsList.find((product) => product.id === productid) // Return the item object selected 


    // This function check if the product exist in the cart, if yes it will alert the user, else the product will be added to the cart. 
    if (cart.some((checkItem) => checkItem.id == productid)) {
        alert('product already in cart');
    } else {

        cart.push(itemAdded); // Items selected are pushed into the empty array or added to the parsed items already in the cart
        localStorage.setItem("cart", JSON.stringify(cart)) // Add the items in the cart to the local storage
    }

    const total = 0;
    itemsSelected = JSON.parse(localStorage.getItem("cart"));
    const priceArray = itemsSelected.map((price) => parseFloat(price.unitprice.replace('R', ' '))); // Returns the price of the items in the cart, removed the 'R' in the text and convert to integer.
    const qty = priceArray.length

    localStorage.setItem("qty", JSON.stringify(qty))
    totalcost = total + (priceArray.reduce((a, b) => a + b)) // Adding all the item prices in the cart array for the totalcost
    totalcost_incl = parseFloat((totalcost * 1.15).toFixed(2)); // Calculating the Vat at 15% the totalcost
    vat = parseFloat((totalcost_incl - totalcost).toFixed(2)); // The value of the Vat
    alert(`You have ${qty} items in your cart.                  
    The total is: R${totalcost}`) // Alert the user how many items they have in the cart and the value on each 'add to cart' click

    $('#checkoutQty').html(qty);

    // The calculated values are stored in the local storage
    localStorage.setItem("totalcost", JSON.stringify(totalcost_incl))
    localStorage.setItem("subtotal", JSON.stringify(totalcost))
    localStorage.setItem("vat", JSON.stringify(vat))
}

x = []; // The empty array for the cart items to be used for the checkout page. The items will be parsed from the local storage.

$('#qty').html(JSON.parse(localStorage.getItem('qty'))); // Display the quantity of items added to cart on the checkout page

// 6) Function to render the items in the cart on the checkout page
$(document).ready(function () {
    function addItemstoCheckOut() {
        let x = JSON.parse(localStorage.getItem('cart')) //items added to the empty array
        $('#subtotal').html(Math.round(JSON.parse(localStorage.getItem('subtotal')))); // Total amount of the items purchased excl vat
        $('#vat').html(Math.round(JSON.parse(localStorage.getItem('vat'))));
        $('#totalSum').html(Math.round(JSON.parse(localStorage.getItem('totalcost')))); // The total value of the items purchased  plus VAT
        x.forEach((item) =>
            $('#cartItems').append(`<p class = "item-checkout">${item.description}<span class = "price">${item.unitprice}</span></p>`) // This function add the items to the checkout page with the variables as per the object function in object.js
        )
    }
    emptyCart()
    addItemstoCheckOut()
})

$('#subtotal').html(JSON.parse(localStorage.getItem('subtotal')))
$('#vat').html(JSON.parse(localStorage.getItem('vat')));
$('#totalSum').html(JSON.parse(localStorage.getItem('totalcost')))

// ------------------------------------------------------------------- Coupon Code Flow -------------------------------------------------------------------- //
// 7) Show and Hide Coupon Form by selecting the coupon checkbox
function showHideCoupon(checked) {
    if (checked == true) {
        $('#couponInput').fadeIn();
    } else $('#couponInput').fadeOut();
}

// Generate Random Coupon Value between R500 and R2000. In theory this will be linked to a vouncher number, for the task I will just use a dummy random value in this range.
$('#btn-confirm-coupon').on('click', function () {
    const couponRandomValue = Math.floor(Math.random() * 2000) + 500;
    localStorage.setItem("coupon", JSON.stringify(couponRandomValue)); // The coupon value will be added to the storage in case page refreshes. A new number will be generated in such a case which is not what we want to happen.

    if ($('.coupon-number-input').val() == false) { // Check if anyhting was added to the voucher number input, if not request you to do so.             
        alert('Please enter a valid Coupon Number')
        return // Stop the function from continuing if nothing was added.

    } else {
        $('#coupon-checkout-number').html($('.coupon-number-input').val()); // Assign the value that was added into the form to the checkout box for the coupon number
        $('#coupon-checkout-discount').html(Math.round(couponRandomValue)).css('color', 'red'); // Assign the value that was randomly created above to the checkout
        $('#totalSum').html(Math.floor(totalSum_before - couponRandomValue));
        $('#btn-confirm-coupon').off(); // Remove EventListner once the coupon was added to prevent continuously generating values when the button is clicked.
    }

    // If the user decides to remove the coupon before checkout the below code will add the value back and change the values to default
    $('#coupon-label').on('change', function () {
        $('.coupon-number-input').val(' ');
        $('#totalSum').html(Math.floor(totalSum_before))
        $('#coupon-checkout-discount').html(0).css('color', 'black');
        $('#coupon-checkout-number').html(0);
    })
})

// 8) ------------------------------------------------------------------- Collection Option Checkout Code Flow ----------------------------------------------------------- //
// // Show and Hide Collect Form to continue the check out
function showBtn(checked) {
    if (checked == true) {
        $('#delivery-checkout-price').css('visibility', 'visible').html(0)
        $('.btn-continue').fadeIn();
        $('.delivery_checkout').hide();
        $('#delivery').not(this).prop('checked', false) // The delivery checkbox cannot be ticked if the collect checkbox is checked and vice versa
    } else {
        $('.btn-continue').fadeOut();
        $('#delivery-checkout-price').css('visibility', 'hidden')
    }
}

// Credit Card Payment
$('#btn-collect-continue').on('click', function () {
    $('#checkout').hide();
    $('.payment').css('visibility', 'visible').fadeIn();
})

// Collect Order Summary (Generate order number and hide/show elements)
$('#btn-confirm-checkout').on('click', function () {
    $('.payment').hide();
    $('#orderConfirmed').css('visibility', 'visible').fadeIn();
    $('#orderNumber').html(Math.floor((1 + Math.random()) * 0x10000).toString(5).substring(1)); //Generate a random order number, in theory we will follow some logic for a order number e.g. order12343
    $('#checkout-vat').html(JSON.parse(localStorage.getItem('vat')));
    if ($('#delivery').checked == true) {
        $('#checkout-total').html(Math.floor(totalSum_before - JSON.parse(localStorage.getItem("coupon"))));
    } else {
        $('#checkout-total').html(Math.floor(totalSum_before - JSON.parse(localStorage.getItem("coupon"))));
    }
})

// 9) ------------------------------------------------------------------- Delivery Option Checkout Code Flow ----------------------------------------------------------- //
// Show and Hide the Delivery Form to continue to the checkout. I used a standard delivery cost of R500 if this option is selected. The cost will be added to the total.
function showHideDelivery(checked) {
    if (checked == true) {
        $('#delivery-checkout-price').css('visibility', 'visible').html(500)
        $('.delivery_checkout').fadeIn();
        $('#collect').not(this).prop('checked', false) // The collect checkbox cannot be ticked if the collect checkbox is checked
        $('#totalSum').html(Math.round(parseFloat(JSON.parse(localStorage.getItem('totalcost')) - 500)))

        $('#btn-collect-continue').on('click', function () {
            $('.payment').css('display', 'none');
            $('.delivery_checkout').css('display', 'block');
        })
    } else {
        $('#delivery-checkout-price').css('visibility', 'hidden')
        $('#totalSum').html(Math.round(parseFloat(JSON.parse(localStorage.getItem('totalcost')))));
    }
}

$('#btn-confirm-order').on('click', function () {
    $('.delivery_checkout').css('display', 'none'); // Delivery Form
    $('#checkout').css('display', 'none'); // Order Successfull Element
    $('.payment').css('display', 'block'); // Credit Card Payment Element
    return false
})


$('#coupon-value').html($('#coupon-checkout-number'));
$('#coupon-checkout-number').html = $('#coupon-checkout-discount');
$('#totalSum').html(JSON.parse(localStorage.getItem('totalcost')) - couponRandomValue);

// 10) ------------------------------------------------------------------- Close Order ----------------------------------------------------------- //
// Clear All Order Information except the productList Close button is clicked. This will also redirect back to main page.
$('#btn-close').on('click', function () {
    localStorage.clear('coupon', 'cart', 'totalcost', 'subtotal', 'vat', 'qty');
})


// 11) I want the option to go to the cart to be unavailable unless you add items to the cart. 
// Disable the checkout Cart Link if the cart is emptyCart, the user will not be able to enter the checkout section.
function emptyCart() {
    if (cart.length == 0) {
        $('.nav-cart-link').attr('href', ' ');
    } else if (cart.length > 0) {
        $('.nav-cart-link').attr('href', './cart.html')
    }
}

// 12) ------------------------------------------------------------------- Animation ----------------------------------------------------------- //
// Slide Go to Cart Button on hover

$('.card').on('mouseenter', function () {
    $(this).find('.btn-add2Cart').css('visibility', 'visible', 'opacity', '0.85').fadeIn()
})

$('.card').on('mouseleave', function () {
    $(this).find('.btn-add2Cart').fadeOut(700)
})

// Generate Unique Order Number, refence only to display once checkout complete.
$('#btn-confirm-order').on('click', function () {
    $('#checkout-total').html(JSON.parse(localStorage.getItem('totalcost')))
    $('#checkout-subtotal').html(totalSum_before - JSON.parse(localStorage.getItem('subtotal')));
})
