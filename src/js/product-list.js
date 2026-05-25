import { getParam } from "./utils.mjs";
import productList from "./productList.mjs";

const category = getParam("category");

productList(".product-list", category);
