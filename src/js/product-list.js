import { loadHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import productList from "./productList.mjs";

loadHeaderFooter();

const category = getParam("category");

function unslug(str) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

document.querySelector("#top-products").textContent =
  `Top Products - ${unslug(category)}`;

productList(".product-list", category);
