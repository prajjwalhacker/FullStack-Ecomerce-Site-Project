import {PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/actions";


import axios from "axios";

export function productListReducer(state = {products : []}, action ){
    /////console.log("Hello")
     switch(action.type){
         case  PRODUCT_LIST_REQUEST:
             return {loading : true, products : []};
         case  PRODUCT_LIST_SUCCESS:
             return {loading : false, products : action.payload }
         case PRODUCT_LIST_FAIL:
             return {loading : false, error : action.payload}
        default:
            return state
     }
}

export function productDetailsReducer(state = {product : {}}, action ){
    /////console.log("Hello")
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
          return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
          return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
}


export function fetchdata(){
      return async (dispatch) => {
          try {
           dispatch({type : PRODUCT_LIST_REQUEST});
           const {data} = await axios.get("/api/products");
           /////console.log("hellolalal");
           setTimeout( ()=> {dispatch({type : PRODUCT_LIST_SUCCESS, payload : data});}, 1000);
           
          }
          catch(error){
              dispatch({type : PRODUCT_LIST_FAIL, payload : error.message});
          }
      }
}


export function fetchdetails(id){
    /////console.log("lalalla");
    return async (dispatch) => {
        try {
         dispatch({type : PRODUCT_DETAILS_REQUEST});
         const {data} = await axios.get("/api/products/" + id);
         /////console.log("hellolalal");
         dispatch({type : PRODUCT_DETAILS_SUCCESS, payload :data});
        }
        catch(error){
            dispatch({type : PRODUCT_DETAIL_FAILS, payload : error.message});
        }
    }
}


