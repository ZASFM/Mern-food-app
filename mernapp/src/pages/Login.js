import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

const Login = () => {
   const [credentials, setCredential] = useState({
      email: "",
      password: "",
   })
   const [error,setError]=useState('');

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
         console.log(err);
      }
   }
   return (
      <>
         <div className="container">
            <div className="bg-danger m-3 w-100">{error && error}</div>
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
               <Link className="m-3 btn btn-danger" to="/signup">Don´t have an account?</Link>
            </form>
         </div>
      </>
   )
}

export default Login;