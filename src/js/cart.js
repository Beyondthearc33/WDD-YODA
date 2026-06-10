import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();

const parentElement = document.querySelector(".product-list");
shoppingCart(parentElement);
