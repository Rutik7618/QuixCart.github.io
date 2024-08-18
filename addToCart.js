import { getCartProductFromLS } from "./getCartProducts.js";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();


export const addToCart = (event, id, stock) => {
    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.querySelector(`#card${id}`);
    let quantity = currentProdElem.querySelector(".productQuantity").innerText;
    let price = currentProdElem.querySelector(".productPrice").innerText;

    //console.log(quantity, price);
    price = price.replace("₹", "");

    let existingProd = arrLocalStorageProduct.find(
        (curProd) => curProd.id === id
    );
    //console.log(existingProd);

    if (existingProd && quantity > 1) {
        //console.log(`quantity`, quantity);
        quantity = Number(existingProd.quantity) + Number(quantity);
        price = Number(price * quantity);
        let updatedCart = { id, quantity, price };

        updatedCart = arrLocalStorageProduct.map((curProd) => {
            return curProd.id === id ? updatedCart : curProd;
        });
        console.log(updatedCart);

        localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

        //show toast when product added to the cart
        showToast("add", id);
    }

    if (existingProd) {
        //alert("You have already this product in your cart !!");
        return false;
    }
    price = Number(price * quantity);
    quantity = Number(quantity);

    // let updateCart = { id, quantity, price };
    arrLocalStorageProduct.push({ id, quantity, price });
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    //update the cart button value
    updateCartValue(arrLocalStorageProduct);

    //show toast when product added to the cart
    showToast("add", id);



};