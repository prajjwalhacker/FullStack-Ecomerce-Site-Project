import React ,{useEffect, useState}from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchdetails} from "../reducers/productReducer";
import Cookie from "js-cookie"
export function ProductScreen(props){
      
    ////let product = {};
      ////const [product, setProduct] = useState({});
      const userInfo = Cookie.getJSON("userInfo") || null

      const [qty, setQty] = useState(1);
      const productDetails = useSelector((state) => state.productDetails);
      
      //console.log(productDetails);
      const { product, loading, error } = productDetails;
      const dispatch = useDispatch();
     useEffect( () => {
          dispatch(fetchdetails(props.match.params.id));
         /*
           const fetchData = async () => {
           const {data} = await axios.get("/api/products");
           const temp = data.find( x => x._id === props.match.params.id);
           setProduct(temp);
         }
         ///fetchData();
         //console.log(product);
        */
        
      return () =>{

      };

     }, []);

     function handleAddtoCart(){
          if(userInfo)
          props.history.push("/cart/" + props.match.params.id + `?qty=${qty}`);
          else{
              props.history.push("/signin");
          }
     }
      
     if(loading){
        return (
           <div><center>Loading .....</center></div>
        )
    }
    else{
      return (
             <div>
              <div>
                  <Link to = "/">Back to result</Link>
              </div>
               <div className = "details">
                    <div className = "details-image">
                         <img src = {product.image} alt = "product"/>
                    </div>
                    <div className = "details-info">
                         <ul>
                             <li>
                                 <h4>{product.name}</h4>
                             </li>
                             <li>
                                 <h4>{product.rating}</h4>
                             </li>
                             <li>
                                 <b>{product.price}</b>
                             </li>
                             <li>
                                 Description:
                                 <div>
                                     {product.description}
                                 </div>
                             </li>
                         </ul>
                    </div>
                    <div className ="details-action">
                        <ul>
                            <li>
                               Price: ${product.price}
                            </li>
                            <li>
                               {product.status ? <div>Status: In Stock</div> : <div>Status: Out of Stock</div>}
                            </li>
                            {product.status === 1 && <div>
                            <li>
                                Qty : <select value = {qty} onChange = {(e) => {setQty(e.target.value)}}>
                                   {[...Array(product.quantity).keys()].map(x => <option key = {x+1} value = {x+1}>{x+1}</option>)}
                                </select>
                            </li>
                            <li>
                                <button className = "button primary" onClick = {handleAddtoCart}>Add to Cart</button>
                            </li>
                            </div>
                            
                            }
                        </ul>
                    </div>
               </div>
               </div>
          
      )
    }
}


