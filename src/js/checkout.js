import { loadHeaderFooter } from "../js/utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();
checkoutProcess.init("so-cart", ".order-summary");