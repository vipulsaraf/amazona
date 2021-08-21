import React,{useState} from 'react';
import CheckOutSteps from '../components/checkOutSteps';
import {useDispatch,useSelector} from 'react-redux';
import {savePaymentMethod} from '../actions/cartActions';
export default function PaymentMethodScreen(props)
{
    const cart=useSelector(state=>state.cart);
    const [paymentMethod,setPaymentMethod]=useState('PayPal');
    const dispatch=useDispatch();
  const{shippingAddress}=cart;
  if(!shippingAddress.address)
  {
  props.history.push('/signin');
  }
    const submitHandler=(e)=>
    {
       e.preventDefault();
       dispatch(savePaymentMethod(paymentMethod));
       props.history.push('/placeorder');
    }
    return(
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div >
                    <h1>
                        Payment Method
                    </h1>
                </div>
                <div>
                    <div className="row" >
                        <input type="radio" id="paypal" value="paypal" name="paymentMethod" required
                       onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                        <label  htmlFor="paypal"><strong>PayPal</strong></label>
                     <img className="smalll" src="/images/paypal.png"></img>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required
                     onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="stripe"><strong>Stripe</strong></label>
                        <img className="smalll" src="/images/stripe.png"></img>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <input type="radio" id="googlepay" value="googlepay" name="paymentMethod" required
                       onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="goolgepay"><strong>GooglePay</strong></label>
                        <img className="smalll" src="/images/gpay.png"></img>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <input type="radio" id="paytm" value="paytm" name="paymentMethod" required
                        checked onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paytm"><strong>PayTm kro</strong></label>
                        <img className="smalll" src="/images/paytm.png"></img>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit" >Continue</button>
                </div>
            </form>
        </div>
    )
}