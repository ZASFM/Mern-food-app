import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import First from "./signup_components/First";
import Second from "./signup_components/Second";
import Third from "./signup_components/Thrid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
   const [credentials, setCredential] = useState({
      name: "",
      email: "",
      password: "",
      account_usage: "",
      geoLocation: "",
   })
   const [page, setPage] = useState(0);

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
               for: credentials.account_usage,
            })
         });
         const data = await resp.json();
         if (data.success) {
            setCredential({
               name: "",
               email: "",
               password: "",
               geoLocation: "",
               account_usage: "",
            })
            setTimeout(() => {
               navigate('/login');
            }, 3005)
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

   const conditionalComponent = () => {
      switch (page) {
         case 0:
            return <First handleChange={handleChange} credentials={credentials} />;
         case 1:
            return <Second handleChange={handleChange} handleLocation={trackLocation} credentials={credentials} />;
         case 2:
            return <Third handleChange={handleChange} credentials={credentials} handleSubmit={handleSubmit} />;
         default:
            return <First handleChange={handleChange} credentials={credentials} />;
      }
   }

   const addPage = () => {
      setPage(preVal => preVal + 1);
   }

   const reducePage = () => {
      setPage(preVal => preVal - 1);
   }

   return (
      <>
         <div className="container">
            <form onSubmit={handleSubmit}>
               {conditionalComponent()}
               <div className="d-flex justify-content-center mt-3">
               {page !== 0 && <button onClick={reducePage} className="m-3 btn bg-warning" >Previous</button>}
               {page <= 1 && <button onClick={addPage} className="m-3 btn btn-success" >Next</button>}
               {page === 2 && <button type="submit" className="m-3 btn btn-success" onClick={notify}> Create Account </button>}
               <Link className="m-3 btn btn-danger" to="/login">Login if you already have an account</Link>
               </div>
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