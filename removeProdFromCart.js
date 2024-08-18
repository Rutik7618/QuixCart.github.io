import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) => {
    let cartProducts = getCartProductFromLS();
    cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

    // update the localStorage after removing the item
    localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));


    //   to remove the div onclick
    let removeDiv = document.getElementById(`card${id}`);
    if (removeDiv) {
        removeDiv.remove();
        //shw toast when product delete from the cart
        showToast("delete", "id");

    }

    updateCartValue(cartProducts);
};