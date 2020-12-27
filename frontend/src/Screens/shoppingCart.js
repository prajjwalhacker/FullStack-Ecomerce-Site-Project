import React , {useEffect, useState} from "react"
import {useDispatch,useSelector} from "react-redux"
import { ADD_TO_CART } from "../constants/actions";
import { addToCart, RemoveFromCart } from "../reducers/cartReducer";
import StripeCheckout from "react-stripe-checkout"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function ShoppingCart(props){
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    
    ///console.log(cartItems.length);
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removefromcart = (productId,qtyy) => {
          /////console.log(productId);
          if(cartItems.length === 1){
              setTimeout( ()=> {props.history.push("/");}, 2000);
          }
          dispatch(RemoveFromCart(qtyy,productId));    
    }
    
    async function handleToken(token, addresses) {
      const response = await axios.post(
        "http://localhost:5000/checkout",
        { token, product }
      );
      const { status } = response.data;
      console.log("Response:", response.data);
      if (status === "success") {
        toast("Success! Check email for details", { type: "success" });
      } else {
        toast("Something went wrong", { type: "error" });
      }
    }
    ///console.log(cartItems);
   useEffect ( () => {
        if(productId){  
           dispatch(addToCart(qty,productId));
        }
   }, []);

    return (
       <div className = "cart">
           <div className = "cart-list">
               <ul className = "cart-list-container">
                   <li>
                       <h3>Shopping Cart</h3>
                   </li>
                   <li>
                       <div>
                           Price
                       </div>
                   </li>
                  
                       {cartItems.length === 0 ? <div>Cart is empty</div> : cartItems.map(item =>
                        <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                      {item.name}

                  </div>
                  <div>
                    Qty: {item.qty}
                    <br/>
                    <button type="button" className="btnn" onClick = {()=> {removefromcart(item.product,item.qty); }}>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )}
               </ul>
           </div>
           <div className ="cart-action">
           Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
           :
           $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}

                <br/>
                <StripeCheckout
                           stripekey = "pk_test_51I2qtVIRjomGEzPfuaRYYmSnP2m45uvrZ3WfxtAHztTZY5KHDcuyVioRpvWYhVq6WPH9eAo2bwlT7i6X22bMoTnM00oot9dxbR"
                           token = {handleToken}
                           billingAddress
                           shippingAddress
                           amount = {cartItems.reduce((a, c) => a + c.price * c.qty, 0)*100}
                />
           </div>
       </div>
    );
}