import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect, useCallback } from "react";
import Restaurant from "../../components/Restaurant";

const MyRestaurants = () => {
   const [loading, setLoading] = useState(true);
   const [restaurants, setRestaurants] = useState([]);
   const [err, setErr] = useState('');
   const email = localStorage.getItem('email');

   const fetchRestaurants = useCallback(async () => {
      setLoading(true);
      try {
         const resp = await fetch(`http://localhost:5000/api/v1/restaurants?email=${email}`)
         const data = await resp.json();
         if(data.success){
            setRestaurants(data.restaurants);
         }
      }
      catch (err) {
         setErr(err);
      }
      setLoading(false);
   },[email])

      useEffect(()=>{
         fetchRestaurants();
      },[fetchRestaurants]) 

   if (loading) {
      return (
         <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
         </div>
      )
   }

   return (
      <div>
         <Navbar />
         <h4>Restaurant List</h4>
         <div className="d-flex justify-content-center align-items-center w-100 gap-5 mt-5">
            {restaurants===[]?
               <div>Not restaurants yet</div>:
               restaurants.map(restaurant=>{
                  return (
                     <Restaurant
                        key={restaurant._id}
                        {...restaurant}
                     />
                  )
               })
            }
         </div>
         <Footer />
      </div>
   )
}

export default MyRestaurants;