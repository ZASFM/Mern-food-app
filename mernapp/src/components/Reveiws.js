import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from 'react';

const Review = ({ restaurantId }) => {
   const [ratings,setRating]=useState([]);

   const fetchRatings=async()=>{
      try{
         const resp=await fetch(`http://localhost:5000/api/v1/restaurants/restaurant/${restaurantId}`);
         const data=await resp.json();
         if(data.success){
            setRating(data.ratingLists);
         }
      }
      catch(err){
         console.log(err);
      }
   }
  
   useEffect(()=>{
      fetchRatings();
   },[])

   return (
      <div>
         <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={6100}
         >
            {ratings.map(rating => {
               return (
                  <div>
                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoPFcRkAqMAGJIp6WziylvyYaVfnI59XYK8Q&usqp=CAU" alt="testimony"/>
                     <div className="myCarousel">
                        <h3>From: {rating.name?rating.name:'Anonymous'}</h3>
                        <p>
                           Message: {rating.message}
                        </p>
                        <p>
                           Rating: {rating.rating}/5
                        </p>
                     </div>
                  </div>
               )
            })}
         </Carousel>
      </div>
   )
}

export default Review;