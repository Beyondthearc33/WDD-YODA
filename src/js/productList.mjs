import { getData } from "./productData.mjs"

// productList.mjs
function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
    </li>`;
} 

export default async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    const element = document.querySelector(selector);
    
    // get the list of products 
    const products = await getData(category);

    // render out the product list to the element
    renderList(products, element, productCardTemplate);
}

// Reusable renderList
function renderList(productList, element, templateFn) {
    const html = productList.map(templateFn).join("");
    element.innerHTML = html;
};

