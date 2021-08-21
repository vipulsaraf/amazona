import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import CheckOutSteps from '../components/checkOutSteps';
import {detailsOrder} from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
export default function OrderScreen(props)
{
    const orderId=props.match.params.id;
    const orderDetails=useSelector(state=>state.orderDetails);

    const {order,loading,error}=orderDetails;
    console.log(error);
   
    const dispatch=useDispatch();  
    const placeOrderHandler=()=>
    {

    }
    useEffect(()=>
    {
       dispatch(detailsOrder(orderId));
       
    },[dispatch,orderId,props.history]);
    return loading?(<LoadingBox></LoadingBox>):
    error?(<MessageBox variant ="danger">{error}</MessageBox>): (
        <div>
          <h1>Order {order._id}</h1>
           <CheckOutSteps step1 step2 step3 step4></CheckOutSteps> 
           <div className="row top">
               <div className="col-2">
               <ul>
                   <li>
                       <div className="card card-body">
                           <h2>Shippping</h2>
                      <p>
                          <strong>
                              Name:</strong>{order.shippingAddress.fullName}<br/>
                          <strong>Address: </strong>
                          {order.shippingAddress.address} 
                          , {order.shippingAddress.city} , 
                          {order.shippingAddress.postalCode}, 
                          {order.shippingAddress.country}
                      </p>
                      {order.isDelivered?
                      (
                    <MessageBox variant ="success">Delivered</MessageBox>
                     ):(<MessageBox variant ="danger"><strong>Not Delivered</strong></MessageBox>) 
                    }
                       </div>
                   </li>
                   <li>
                       <div className="card card-body">
                           <h2>Payment</h2>
                      <p>
                        <strong>Method:</strong> {order.paymentMethod}
                      </p>
                      {order.isPaid?
                      (
                    <MessageBox variant ="success">Paid At {order.paidAt}</MessageBox>
                     )
                     :(<MessageBox variant ="danger"><strong>Not paid</strong></MessageBox>) 
                    }
                       </div>
                   </li>
                   <li>
                       <div className="card card-body">
                           <h2>Order Items</h2>
                           <ul>
             {
                 order.orderItems.map((item)=>
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
                                <div>${order.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping Price</div>
                                <div>${order.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax</div>
                                <div>${order.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>
                                    <strong>Order Total</strong></div>
                                <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                            </div>
                        </li>
                        <li>
                            <button type="button" onClick={placeOrderHandler} className="primary block" >
                                Place Order
                            </button>
                        </li>
                    </ul>
                </div>
               </div>
           </div>
        </div>
    )
}