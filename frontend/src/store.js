import {createStore , combineReducers, applyMiddleware} from "redux";
import thunk from  "redux-thunk"
import {productListReducer,productDetailsReducer} from "./reducers/productReducer";
import {cartDetailsReducer} from "./reducers/cartReducer"
import {signInReducer} from "./reducers/siginReducer";
import Cookie from "js-cookie";
import { createReducer } from "./reducers/createaccountReducer";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;


const initialState = { cart : {cartItems} , signin : {userInfo}};



const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart: cartDetailsReducer,
    signin :  signInReducer,
    create : createReducer
});


export const store =  createStore(reducer,initialState, applyMiddleware(thunk));





