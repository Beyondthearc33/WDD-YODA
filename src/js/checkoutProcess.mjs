import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function calculateShipping(acc, _, i) {
  if (i === 0) {
    return acc + 10;
  }
  return acc + 2;
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => (convertedJSON[key] = value));

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const list = items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1,
    };
  });

  return list;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,

  // key: 'so-cart'
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
    this.calculateOrdertotal();
  },

  calculateItemSummary: function () {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const numItems = this.list.length;
    const subtotal = this.list.reduce((acc, item) => acc + item.FinalPrice, 0);
    //acc = accumulator, item = current item in the array. This will give us the total price of all items in the cart.

    document.querySelector("#item-count").textContent = numItems;
    document.querySelector("#item-subtotal").textContent = "$" + subtotal;
    this.itemTotal = subtotal;
  },
  calculateOrdertotal: function () {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06;
    // reduce(func, initialValue); initialValue is inital value of accumulator
    this.shipping = this.list.reduce(calculateShipping, 0);

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    // once the totals are all calculated display them in the order summary page
    document.querySelector("#tax").textContent = "$" + this.tax.toFixed(2);
    document.querySelector("#shipping").textContent =
      "$" + this.shipping.toFixed(2);
    document.querySelector("#orderTotal").textContent =
      "$" + this.orderTotal.toFixed(2);
  },

  checkout: async function (form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const order = formDataToJSON(form);

    order.items = packageItems(this.list);
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    // call the checkout method in our externalServices module and send it our data object.
    try {
      const res = await checkout(order);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default checkoutProcess;
