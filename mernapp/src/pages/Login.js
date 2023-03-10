import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useAuthProvider } from "../contexts/authContext";
import {FaArrowLeft} from 'react-icons/fa';
const Login = () => {
   const [credentials, setCredential] = useState({
      email: "",
      password: "",
   })
   const [error,setError]=useState('');
   const {loading,dispatch}=useAuthProvider();

   const handleChange = (e) => {
      const { value, name } = e.target;
      setCredential(preVal => {
         return {
            ...preVal,
            [name]: value
         }
      })
   }

   const navigate=useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({type:'LOGIN_STARTED'})
      try {
         const resp = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email: credentials.email,
               password: credentials.password,
            })
         })
         const data = await resp.json();
         if (data.success) {
            //console.log(data.token);
            dispatch({type:'LOGIN_SUCCESSFUL',payload:data.user});
            localStorage.setItem('token',data.token);
            localStorage.setItem('email',credentials.email);
            if(!localStorage.getItem('mongoJWT')){
               try{
                  await fetch(`http://localhost:5000/api/v1/users/addJWT/${credentials.email}`,{
                     method:'PUT',
                     headers:{
                        'Content-Type':'application/json'
                     },
                     body:JSON.stringify({
                        jwtToken:localStorage.getItem('token')
                     })
                  });
                  localStorage.setItem('mongoJWT',JSON.stringify('true'))
               }
               catch(err){
                  console.log(err);
               }
            }
            setCredential(
               {      
                  email: "",
                  password: ""
               }
            )
            navigate('/');
         }else {
            setError(data.msg);
         }
      }
      catch (err) {
         dispatch({type:'LOGIN_FAILED',payload:err})
         localStorage.clear();
         console.log(err);
      }
   }
   return (
      <>
         <div className="container">
            <Link to="/"><FaArrowLeft/> Back home</Link>
            <div className="bg-danger m-3 w-100 text-center w-100 m-auto mt-3">{error && error}</div>
            <form onSubmit={handleSubmit}>
               <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange} value={credentials.email} />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
               </div>
               <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={credentials.password} />
               </div>
               <button type="submit" className="m-3 btn btn-success">Log In</button>
               <Link className="m-3 btn btn-danger" to="/signup">Don??t have an account?</Link>
            </form>
         </div>
      </>
   )
}

export default Login;