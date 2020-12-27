import React ,{useEffect, useState}from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { signInUser } from "../reducers/siginReducer";
import { createaccount} from "../reducers/createaccountReducer";
export function createAccount(props){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const temp = useSelector(state => state.create);
    ///console.log(temp);
     const dispatch = useDispatch();

     const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createaccount(name,email,password,repassword));
     }
    
     useEffect( () => {
          
        

      return () =>{

      };

     },[]);

     return (
          <div className = "form">
              <form onSubmit = {(e) => {submitHandler(e)} }>
                  <ul className = "form-container">
                    <li>
                        <h2>Create Your Account!</h2>
                    </li>
                     <li>
                          <label for = "name">
                              Name
                          </label>
                          <input type = "name" name = "name" id = "name" onChange = {(e) => {setName(e.target.value)}} />
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
                          <label for = "password">Reenter Password</label>
                          <input type =  "password" name = "password" id = "password" onChange = {(e) => setRepassword(e.target.value)} />
                      </li>
                     
                      <li>
                          <button className = "button primary">Create your Account</button>
                      </li>
                  </ul>
              </form>
          </div>
     );
}


