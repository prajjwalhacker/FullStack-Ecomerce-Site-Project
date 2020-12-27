import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import {useSelector , useDispatch} from "react-redux";
import {fetchdata} from "../reducers/productReducer";

export function HomeScreen(){
  
  const productList = useSelector((state) => state.productList);
  ////console.log(productList);
  const { products, loading, error } = productList;
     const dispatch = useDispatch();
     useEffect( () => {
      dispatch(fetchdata());
      return () =>{

      };

     }, []);
     if(loading){
         return(
            <div><center>Loading .....</center></div>
         )
     }
      return (
         <ul className = "products">
        {  
          products.map( product => 
          <li className = "product">
               <Link to={"/products/"+product._id}>
               <img className = "product-image"  src = {product.image} alt = "products" />
               </Link>
               <div className = "product-name"><a href="#">{product.name}</a></div>
               <div className = "product-brand">{product.brand}</div>
               <div className = "product-price">{product.price}</div>
               <div className = "product-rating">{product.rating}stars ({product.numReviews} reviews)</div>
          </li>  
        )
        }
      </ul>
       
      );
   
}