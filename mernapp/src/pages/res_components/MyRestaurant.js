import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Container } from 'react-bootstrap';
import Dishes from '../../components/Dishes';
import Review from '../../components/Reveiws';

const MyRestaurant = () => {
   const { id } = useParams();
   const [restaurant, setRestaurant] = useState({});
   const [loading, setLoading] = useState(false);
   const [err, setErr] = useState('');

   const fetchRestaurant = useCallback(async () => {
      setLoading(true);
      try {
         const resp = await fetch(`http://localhost:5000/api/v1/restaurants/${id}`);
         const data = await resp.json();
         if (data.success) {
            setRestaurant(data.restaurant);
         }
      }
      catch (err) {
         setErr(err.msg);
      }
      setLoading(false);
   }, [id])

   useEffect(() => {
      fetchRestaurant();
   }, [fetchRestaurant])

   return (
      <div>
         <Navbar />
         <div>
            <Container>
               <div class="row">
                  <div class="col">
                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdA6Fz0omLBkfpx1i90mlP9di5ZdxkJfpLew&usqp=CAU" alt="restaurant" />
                  </div>
                  <div class="col">
                     <div>Name: {restaurant.name} </div>
                     <div>Location: {restaurant.location}</div>
                     <div>Delivery: {restaurant.delivery}</div>
                     <div>Type: {restaurant.typeOfRestaurant}</div>
                  </div>
               </div>
               <div>
                  Dishes
                  <Dishes
                     restaurantId={id}
                  />
               </div>
               <div>
                  Reviews
                  <Review
                     restaurantId={id}
                  />
               </div>
            </Container>
         </div>
         <Footer />
      </div>
   )
}

export default MyRestaurant; 