// time out for the buttons
let timeOut;
function generatePage() {
  const grid = document.querySelector(".products-grid");
  let items = "";
  products.forEach((product) => {
    items += ` <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class="js-select-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id='${
              product.id
            }'>
                Add to Cart
            </button>
            </div>`;
  });
  grid.innerHTML = items;
  totalQuantity();
}
generatePage();

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    // console.log(button.dataset.productName);
    addToCart(button.dataset.productId);
  });
});
function addToCart(product) {
  let result;
  cart.forEach((value) => {
    value.id === product && (result = value);
  });
  if (!result) {
    cart.push({
      id: product,
      quantity: Number(
        document.querySelector(`.js-select-quantity-${product}`).value
      ),
    });
  } else {
    result.quantity += Number(
      document.querySelector(`.js-select-quantity-${product}`).value
    );
  }
  totalQuantity();
  // added label above the button
  document
    .querySelector(`.added-to-cart-${product}`)
    .classList.add("added-to-cart-done");
  if (timeOut) {
    clearTimeout(timeOut);
  }

   timeOut = setTimeout(() => {
    document
      .querySelector(`.added-to-cart-${product}`)
      .classList.remove("added-to-cart-done");
  }, 800);
}

function totalQuantity() {
  let totalCount = 0;

  cart.forEach((value) => {
    totalCount += value.quantity;
  });
  document.querySelector(".cart-quantity").innerHTML = totalCount;
}
