import Axios from "axios";
import { CREATE_FAIL, CREATE_REQUEST, CREATE_SUCCESS} from "../constants/actions";

export function createReducer(state = {}, action){
      if(action.type === CREATE_REQUEST){
           return {
               loading : true
           }
      }
      if(action.type === CREATE_SUCCESS){
          return {
              loading : false,
              data : action.payload
          }
      }
      if(action.type === CREATE_FAIL){
          return {
              loading : true,
              data : action.payload
          }
      }
      return state;
}

export function createaccount(name, email, password,repassword){
    ///console.log(name);
    return async (dispatch) => {
     
     dispatch({type : CREATE_REQUEST, payload : {name,email,password,repassword}});
        try{
          //console.log("heelloooo");
          const {data}  = await  Axios.post("http://localhost:5000/api/users/register", {name,email,password,repassword});
          dispatch({type : CREATE_SUCCESS, payload : data}); 
          }
        catch(error){
         dispatch({type : CREATE_FAIL, payload : error.message});
        }
    }
}
