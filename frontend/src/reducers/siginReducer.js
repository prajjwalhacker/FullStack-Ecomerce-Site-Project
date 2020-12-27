import Axios from "axios"
import { SIGN_IN_SUCCESS,SIGN_IN_REQUEST,SIGN_IN_FAIL} from "../constants/actions"
import Cookie from "js-cookie";

export function signInReducer(state={}, action){
      
      
      if(action.type === SIGN_IN_REQUEST){
          return {
              loading  :  true
          }
      }
      if(action.type === SIGN_IN_SUCCESS){
           return {
               loading : false,
               userInfo : action.payload
           }
      }
      if(action.type === SIGN_IN_FAIL){
          return {
              loading : false,
              error : action.payload
          }
      }
      return state;
}


export function signInUser(email,password){
       return async (dispatch) => {
        dispatch({type : SIGN_IN_REQUEST, payload : {email,password}});
           try{
             ///console.log("heelloooo");
             const {data}  = await  Axios.post("http://localhost:5000/api/users/signin", {email, password});
             ///console.log(data);

             console.log(data);

             dispatch({type : SIGN_IN_SUCCESS, payload : data}); 

             Cookie.set('userInfo', JSON.stringify(data));
             }
           catch(error){
            dispatch({type : SIGN_IN_FAIL, payload : error.message});
           }
       }
}