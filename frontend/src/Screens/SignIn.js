import React ,{useEffect, useState}from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { signInUser } from "../reducers/siginReducer";
export function SignIn(props){
     const [email , setEmail] = useState('');
     const [password, setPassword] = useState('');
     const temp = useSelector(state => state.signin);
     console.log(temp);
     const{loading, userInfo, error} = temp;
     const dispatch = useDispatch();
     const submitHandler = (e) => {
           e.preventDefault();
           dispatch(signInUser(email, password));
     }
     const createHandler = () => {
           props.history.push("/createAccount");
     }
     useEffect( () => {
           if(userInfo){
               props.history.push("/");
           }
      return () =>{

      };

     }, [userInfo]);

     return (
          <div className = "form">
              <form onSubmit = {submitHandler}>
                  <ul className = "form-container">
                     <li>
                        {error && <div>Email or username is incorrect !</div>}
                     </li>
                      <li>
                          <label for = "email">
                              Email
                          </label>
                          <input type = "email" name = "email" id = "email" onChange = {(e) => {setEmail(e.target.value)}} />
                      </li>
                      <li>
                          <label for = "password">Password</label>
                          <input type =  "password" name = "password" id = "password" onChange = {(e) => setPassword(e.target.value)} />
                      </li>
                      <li>
                          <button type = "submit" className = "button primary">
                             Signin
                          </button>
                      </li>
                      <li>
                          New User?
                      </li>
                      <li>
                          <button className = "button primary" onClick = {createHandler}>Create your Account</button>
                      </li>
                  </ul>
              </form>
          </div>
     );
}


