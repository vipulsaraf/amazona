import React,{useEffect} from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { listProducts } from '../actions/productAction';
import{useSelector,useDispatch} from 'react-redux';

function Homescreen(props) {
    const dispatch=useDispatch();
  const productList = useSelector(state =>state.productList);
  const {products,loading ,error}=productList;
    useEffect(()=>  
    {
     dispatch(listProducts());
    },[dispatch]);
    return ( 
        <div>
            {loading?(
                <LoadingBox></LoadingBox>
            ):error?(
                <MessageBox>{error}</MessageBox>
            ):( <div className="row center ">
            {
                products.map((product)=>
                    <Product  key={product._id} product={product}></Product>)}
          </div>)}     
        </div>
    )
}
export default Homescreen
