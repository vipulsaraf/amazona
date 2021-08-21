import React,{useState,useEffect} from 'react'
import {Link}  from  'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {register} from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'
const RegisterScreen = props => {
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const[password,setPassword]=useState('');
const [confirmPassword,setConfirmPassword]=useState('');
const redirect=props.location.search?props.location.search.split('=')[1]:'/';
const userRegister=useSelector((state)=>state.userRegister);
const {userInfo,loading,error}=userRegister;
console.log(userInfo)
const dispatch=useDispatch();
const submitHandler=(e)=>
{
    e.preventDefault();
    if(password!==confirmPassword)
    {
    alert('password are not match');
    }
    else
    {
    dispatch(register(name,email,password))
    }
};
useEffect(() => {
   if(userInfo)
   {
       props.history.push(redirect);
   }
}, [props.history,redirect,userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
            {loading &&<LoadingBox></LoadingBox>}
                <div>
                    <h1>Register</h1>
                </div>

                {error&&<MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">name</label>
                    <input type="text"
                     id="name"
                     placeholder="Enter Name" required
                    onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email"
                     id="email"
                     placeholder="Enter Email" required
                    onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                     id="password"
                     placeholder="Enter password" required
                    onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmpassword">Password</label>
                    <input type="password"
                     id="confirmpassword"
                     placeholder="confirm password" required
                    onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Register
                    </button>
                </div>
                <label/>
                <div>
              Already have an account?
                 <Link  to={`/signin?redirect=${redirect}`}>Sign-In </Link>
                </div>
            </form>
            
        </div>
    )
}
export default RegisterScreen;