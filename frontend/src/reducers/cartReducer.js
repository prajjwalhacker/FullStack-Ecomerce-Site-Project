import React from "react";
import axios from "axios";
import Cookie from "js-cookie";

import {
    ADD_TO_CART,
    REMOVE_FROM_CART
} from "../constants/actions";

export function cartDetailsReducer(state = {cartItems : []}, action){
      if(action.type === ADD_TO_CART){
        const item = action.payload;
        const product = state.cartItems.find(x => x.product === item.product);
        if (product) {
          return {
            cartItems:
              state.cartItems.map(x => x.product === product.product ? item : x)
          };
        }
        return { cartItems: [...state.cartItems, item] };
      }
      if(action.type === REMOVE_FROM_CART){
           ////console.log("sdgfgdf");
           const Arr = state.cartItems;
           let index = -1;
           for(let i=0;i<(Arr.length);i++){
               if(Arr[i].product === action.payload.product){
                   index = i;
                   ////console.log(index);
                   break;
               }
           }
           if (index > -1) {
                 for(let i=index;i<(Arr.length-1);i++){
                      let temp = Arr[i];
                      Arr[i] = Arr[i+1];
                      Arr[i+1] = temp;
                 }
                 Arr.pop();
                
                 return {
                     cartItems : [...Arr]
                 }
           }
           else{
               return state;
           }
      }
      return state;
}

export function addToCart(qty,productId){
    ////console.log("flfl");
       return async (dispatch, getState) => {
            const {data} = await axios.get("/api/products/" + productId);
            
            dispatch({type : ADD_TO_CART, payload : {
                product : data._id,
                name : data.name,
                image : data.image,
                price : data.price,
                qty
            }})
    ////console.log(getState());
            const {cart:{cartItems}} = getState();
    ////console.log(JSON.stringify(cartItems));
            Cookie.set("cartItems", JSON.stringify(cartItems));
       }
}

export function RemoveFromCart(qty, productId){
    /////console.log("flfl");
       return async (dispatch, getState) => {
            /////console.log("lalala");
            /////console.log(productId);
            const {data} = await axios.get("/api/products/" + productId);
            //console.log(data);
            dispatch({type : REMOVE_FROM_CART, payload : {
                product : data._id,
                name : data.name,
                image : data.image,
                price : data.price,
                qty
            }})
            const {cart:{cartItems}} = getState();
            /////console.log(cartItems);
            Cookie.set("cartItems", JSON.stringify(cartItems));
       }
}