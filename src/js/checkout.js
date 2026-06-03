import { loadHeaderFooter } from "../js/utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();
checkoutProcess.init("so-cart", ".order-summary");

document.forms["checkout-form"].addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.checkout(e.target);
});