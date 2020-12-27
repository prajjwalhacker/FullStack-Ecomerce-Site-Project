import React from "react";
import ReactDOM from "react-dom";
import {data} from "./data.js";
import {BrowserRouter, Route, Link} from "react-router-dom";
import {HomeScreen} from "./Screens/HomeScreen"
import {ProductScreen} from "./Screens/ProductScreen"
import { ShoppingCart } from "./Screens/shoppingCart.js";
import { SignIn } from "./Screens/SignIn.js";
import {useDispatch, useSelector} from "react-redux";
import { createAccount } from "./Screens/createAccount.js";
import Cookie from "js-cookie"
import { USER_LOGOUT } from "./constants/actions.js";

export function App(){
    
    const data = Cookie.getJSON("userInfo") || null
    const temp = useSelector(state => state.signin);
    const { loading, userInfo, error } = temp;
    const dispatch = useDispatch();
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    const handle = ()=>{

    }

    return (
        <BrowserRouter>
        <div className = "grid-container">
        <header className = "header">
            <div className = "brand">
                <button onClick = {openMenu}>
                    &#9776;
                </button>
                <Link to="/">Eccomerce</Link>
            </div>
            <div className= "header-links">
            
              { !userInfo && <a href ="http://localhost:3000/signin">SignIn</a>}  
              {  userInfo && <a href = "/"  onClick = {handle}>Hello {userInfo.name}</a>}
               { data && <a href = "/cart">Cart</a>}
            </div>
        </header>
        <aside className = "sidebar">
            <h3>Shopping</h3>
            <button onClick = {closeMenu}>x</button>
            <ul>
               <li>
                   <a href="index.html">Pants</a>
               </li>
               <li>
                <a href="index.html">Shirt</a>
               </li>
            </ul>
        </aside>
        <main className = "main">
          <div className = "content">
          <Route exact path = "/products/:id" component = {ProductScreen}/>
          <Route exact path = "/" component = {HomeScreen} />
          <Route exact path = "/cart/:id?" component = {ShoppingCart}/>
          <Route exact path = "/signin" component = {SignIn}/>
          <Route exact path = "/createAccount" component = {createAccount}/>
          
        </div>
        </main>
        <footer className = "footer">
            All right reserved
        </footer>
    </div>
    </BrowserRouter>
    );
}