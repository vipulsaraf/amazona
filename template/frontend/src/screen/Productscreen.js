import React,{useEffect,useState} from 'react'
import Rating  from '../components/rating'
import {Link }from 'react-router-dom'
import '../index.css'
import LoadingBox from '../components/LoadingBox';
import { detailsProduct} from '../actions/productAction';
import{useSelector,useDispatch} from 'react-redux';

import MessageBox from '../components/MessageBox';
 
    function Productscreen(props){
        const dispatch=useDispatch();
        const productId=props.match.params.id;
        const [qty,setQty]=useState(1);
        const productDetails=useSelector(state=>state.productDetails);
        const{loading,error,product}=productDetails;
        useEffect(()=>  
        {
         dispatch(detailsProduct(productId));
        },[dispatch,productId]);
        const addToCartHandler=()=>
        {
            props.history.push(`/cart/${productId}?qty=${qty}`);
        }
    return (
        <div>
               <div class="large"><Link to ="/">Back to result</Link></div>
            {loading?(
                <LoadingBox></LoadingBox>
            ):error?(
                <MessageBox>{error}</MessageBox>
            ):( <div className="row center ">
            {
                  <div >
                    <div className="row top">
                    <div class="large"><Link to ="/">Back to result</Link></div>
                       <div className="col-2">
                      <img  className="large" src={product.images} alt={product.name}/>
                       </div>
                       <div className="col-1">
                      <ul>
                          <li>
                              <h1 >{product.name}</h1>
                          </li>
                          <li>
                              <Rating 
                              rating={product.rating}
                              numReviews={product.numReviews}
                              ></Rating>
                          </li>
                          <li>
                              PRICE:${product.price}
                          </li>
                          <li>
                           DESCRIPTION:<span>{product.description}</span> 
                          </li>
                      </ul>
                       </div>
                       <div className="col-1">
                         <div className="card card-body">
                             <ul>
                                 <li>
                                     <div className="row">
                                         <div>Price</div>
                                         <div className="price">${product.price}</div>
                                     </div>
                                 </li>
                                 <li>
                                 <div className="row">
                                     <div>Status</div>
                                     <div>{product.countInStock>0?
                                     (<span className="success">In stock</span>
                                     )
                                     :(<span className="error">Unavailable</span>)}</div>
                                 </div>
                                 </li>
                                 {
                                     product.countInStock>0?(
                                         <>
                                          <li>
                                              <div className="row">
                                                  <div>Qty</div>
                                                  <div>
                                                      <select value={qty} onChange={e=>setQty(e.target.value)}>
                                                          {
                                                              [...Array(product.countInStock).keys()].map(x=>(
                                                                 <option Key={x+1
                                                                } value={x+1}>{x+1}</option> 
                                                              ))
                                                          }
                                                      </select>
                                                  </div>
                                              </div>
                                     <button onClick={addToCartHandler}className="primary block">Add to Cart</button>
                                   </li>
                                         </>
                                    ):
                                   <li></li>}
                                 
                                
                             </ul>
            
                         </div>
                       </div>
                    </div>
                    </div>
            }
          </div>)}     
        </div>
     
    )}

                        export default Productscreen;

