import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import CheckOutSteps from '../components/checkOutSteps';
import {createOrder} from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
export default function PlaceOrderScreen(props)
{
    const cart =useSelector((state)=>state.cart);
    if(!cart.paymentMethod)
    {
        props.history.push('/payment');
    }
    const orderCreate=useSelector(state=>state.orderCreate)
    const {loading,success,error,order}=orderCreate;

    const dispatch=useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
      }
    const toPrice=(num)=>Number(num.toFixed(2));
    cart.itemsPrice=toPrice(
        cart.cartItems.reduce((a,c)=>a+c.qty*c.price,0)
    );
    cart.shippingPrice=cart.itemsPrice>100?toPrice(0):toPrice(10);
    cart.taxPrice=toPrice(0.15*cart.itemsPrice.toFixed(2));
    cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice;
   
    useEffect(()=>
    {
        if(success)
        {
            props.history.push(`/order/${order._id}`);
            dispatch({type:ORDER_CREATE_RESET})
        }
    },[order,props.history,success])
    return (
        <div>
           <CheckOutSteps step1 step2 step3 step4></CheckOutSteps> 
           <div className="row top">
               <div className="col-2">
               <ul>
                   <li>
                       <div className="card card-body">
                           <h2>Shippping</h2>
                      <p>
                          <strong>
                              Name:   </strong>{cart.shippingAddress.fullName}<br/>
                          <strong>Address: </strong>{cart.shippingAddress.address} , {cart.shippingAddress.city} , {cart.shippingAddress.postalCode} , {cart.shippingAddress.country}
                      </p>
                       </div>
                   </li>
                   <li>
                       <div className="card card-body">
                           <h2>Payment</h2>
                      <p>
                        <strong>Method:</strong> {cart.paymentMethod}
                      </p>
                       </div>
                   </li>
                   <li>
                       <div className="card card-body">
                           <h2>Order Items</h2>
                           <ul>
             {
                 cart.cartItems.map((item)=>
                 (
                     <li key={item.product}>
                         <div class="row">
                             <div>
                             <img  className="small" src={item.images} alt={item.name}/>
                        
                             </div>
                             <div className="min-30">
                              {item.name}
                             </div>
                            
                             <div>
                                 <strong>
                              {item.qty}x ${item.price}=${item.qty*item.price}
                              </strong>
                             </div>
                          
                         </div>
                     </li>
                 ))
             }
         </ul>
                       </div>
                   </li>
               </ul>
               </div>
               <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Order Summary</h2>
                        </li>
                        <li>
                            <div className="row">
                                <div>Items</div>
                                <div>${cart.itemsPrice}</div>

                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping Price</div>
                                <div>${cart.shippingPrice}</div>

                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax</div>
                                <div>${cart.taxPrice}</div>

                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>
                                    <strong>Order Total</strong></div>
                                <div><strong>${cart.totalPrice}</strong></div>

                            </div>
                        </li>
                        <li>
                            <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length===0}>
                                Place Order
                            </button>
                        </li>
                        {loading&&<LoadingBox></LoadingBox>}
                        {error&&<MessageBox variant="danger">{error}</MessageBox>}
                    </ul>
                </div>
               </div>
           </div>
        </div>

    )
}