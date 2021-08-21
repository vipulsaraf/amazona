import{useDispatch,useSelector} from 'react-redux';
import React,{useState,useEffect} from 'react'
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from "../components/checkOutSteps";
export default function ShippingAddressScreen(props) {
  const userSignin=useSelector(state=>state.userSignin);
  const cart=useSelector(state=>state.cart);
  const {userInfo}=userSignin;
  const{shippingAddress}=cart;
  if(!userInfo)
  {
    props.history.push('/signin');
  }
    const [fullName,setFullName]=useState(shippingAddress.fullName);
    const [address,setAddress]=useState(shippingAddress.address);
    const [city,setCity]=useState(shippingAddress.city);
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode);
    const [country,setCountry]=useState(shippingAddress.country);
    const dispatch=useDispatch();
    const submitHandler=(e)=>
    {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName,address,city,postalCode,country}));
        props.history.push('/payment');
    }
    return (
        <div>
        <div>
            <CheckOutSteps step1 step2 ></CheckOutSteps>
            </div>
            <form className="form" onSubmit={submitHandler}>
               <div>
               <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter full Name"
                onChange={(e)=>setFullName(e.target.value)} required></input>
               </div>
              
                  <div>
                  <label htmlFor="address">shipping address</label>
                <input type="text" id="address" placeholder="Enter full address" value={address} 
                onChange={(e)=>setAddress(e.target.value)} required></input>
                 
                </div>
              
                  <div>
                  <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="Enter city name" value={city} 
                onChange={(e)=>setCity(e.target.value)} required></input>
                </div>
              
                  <div>
                  <label htmlFor="postalCode">postal code</label>
                <input type="text" id="postalCode" placeholder="Enter postal code" value={postalCode} 
                onChange={(e)=>setPostalCode(e.target.value)} required></input>
                  <div>
                  <label htmlFor="country">Country</label>
                </div>
              
                <input type="text" id="country" placeholder="Enter country Name" value={country} 
                onChange={(e)=>setCountry(e.target.value)} required></input>
                </div>
              
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    );
}
