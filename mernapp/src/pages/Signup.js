import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
   const [credentials, setCredential] = useState({
      name: "",
      email: "",
      password: "",
      geoLocation: "",
   })

   const handleChange = (e) => {
      const { value, name } = e.target;
      setCredential(preVal => {
         return {
            ...preVal,
            [name]: value
         }
      })
   }

   const trackLocation = () => {

      const successCallBack = (position) => {
         const { latitude, longitude } = position.coords;
         fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=64fef5748dd54f26999838b54f723f4a`)
            .then(resp => resp.json())
            .then(data => setCredential(preVal => {
               return {
                  ...preVal,
                  geoLocation: data.results[0].formatted
               }
            }))
      }

      const errorCallBack = (err) => {
         console.log(err);
      }

      navigator.geolocation
         .getCurrentPosition(successCallBack, errorCallBack);
   }

   const navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const resp = await fetch('http://localhost:5000/api/v1/auth/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               name: credentials.name,
               email: credentials.email,
               password: credentials.password,
               location: credentials.geoLocation,
            })
         })
         const data = await resp.json();
         if (data.success) {
            setCredential({
               name: "",
               email: "",
               password: "",
               geoLocation: "",
            })
            setTimeout(() => {
               navigate('/login');
            }, 3000)
         }
      }
      catch (err) {
         console.log(err);
      }
   }

   const notify = () => toast.success('Your account was successfully created, now please login', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
   });

   return (
      <>
         <div className="container">
            <form onSubmit={handleSubmit}>
               <div className="mb-3">
                  <label htmlFor="name" className="form-label">Username</label>
                  <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={credentials.name} />
               </div>
               <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange} value={credentials.email} />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
               </div>
               <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={credentials.password} />
               </div>
               <div className="mb-3">
                  <label htmlFor="location" className="form-label">Address</label>
                  <input type="text" className="form-control" id="location" name="geoLocation" onChange={handleChange} value={credentials.geoLocation} />
                  <button onClick={trackLocation}>Locate me</button>
               </div>
               <button type="submit" className="m-3 btn btn-success" onClick={notify}>Create account</button>
               <Link className="m-3 btn btn-danger" to="/login">Login if you already have an account</Link>
            </form>
            <ToastContainer
               position="top-right"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"

            />
         </div>
      </>
   )
}

export default Signup;