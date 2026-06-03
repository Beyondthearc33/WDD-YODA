import { getLocalStorage, renderWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function cartListTemplate(cartItems) {
  return cartItems.map(cartItemTemplate).join("");
}

export default function shoppingCart(parentElement) {
  const cartItems = getLocalStorage("so-cart") || [];
  renderWithTemplate(cartListTemplate, parentElement, cartItems);

  if (cartItems.length > 0) {
    document.querySelector(".list-footer").classList.remove("hide");
    const total = cartItems.reduce((acc, product) => acc + product.FinalPrice, 0);
    document.querySelector(".list-total").textContent = `Total: $${total}`;
  }
  else {
    document.querySelector(".list-footer").classList.add("hide");
  }
}
