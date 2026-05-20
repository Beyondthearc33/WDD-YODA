import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

const parentElement = document.querySelector(".product-list");

shoppingCart(parentElement);

renderCartContents();
