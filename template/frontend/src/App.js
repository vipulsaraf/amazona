import './App.css';
import Homescreen from './screen/Homescreen';
import  {useSelector} from 'react-redux';
import ProductScreen from './screen/Productscreen';
import{BrowserRouter,Route} from 'react-router-dom';
import CartScreen from './screen/CartScreen';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {signout} from './actions/userActions'
import RegisterScreen from './screen/RegisterScreen'
import SigninScreen from './screen/SigninScreen';
import shippingAddressScreen from './screen/shippingAddressScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
function App() {
  const cart=useSelector(state=>state.cart);
  const userSignin=useSelector((state)=>state.userSignin);
  const {userInfo} =userSignin;
  const dispatch=useDispatch();
  const signoutHandler=()=>
  {
    dispatch(signout());
  }
  const {cartItems}=cart;
  return (
    <BrowserRouter>
    <div className="App">
       <div className="grid-container">
        <header className="row">
           <div>
        <Link className="brand" to="/">Amazona</Link>
           </div>
           <div >
               <Link to="/cart">Cart
               {
                 cartItems.length>0&&(
                   <span className="badge">{cartItems.length}</span>
                 )
               }
               </Link>
                {
                  userInfo?(
                    <div className="dropdown">
                    <Link to ="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                    <ul className="dropdown-content">
                      <Link to="#signout "onClick={signoutHandler}>Sign Out</Link>
                    </ul>
                    </div>
                  ):
                  (
                    <Link to="/signin">Sign In</Link>
                  )
                } 
           </div>
            </header>
            <main>
             
              <Route path="/cart/:id?" component ={CartScreen}></Route>
            <Route path="/"component={Homescreen} exact ></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={shippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            </main>
            <footer className="row center">
           All right reserved!
            </footer>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
