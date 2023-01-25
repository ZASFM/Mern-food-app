import { useState, useEffect, useCallback } from "react";

const Dishes = ({ restaurantId }) => {
   const [restaurant, setRestaurant] = useState({});
   const [data] = useState([
      {
         categoryName: "Biryani/Rice",
         name: "Biryani",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdA6Fz0omLBkfpx1i90mlP9di5ZdxkJfpLew&usqp=CAU",
         description: "Lorem ipsium dozum shawusum askel",
      },
      {
         categoryName: "Biryani/Rice",
         name: "Biryani",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdA6Fz0omLBkfpx1i90mlP9di5ZdxkJfpLew&usqp=CAU",
         description: "Lorem ipsium dozum shawusum askel",
      }
   ])

   const fetchRestaurant = useCallback(async () => {
      try {
         const resp = await fetch(`http://localhost:5000/api/v1/restaurants/${restaurantId}`);
         const data = await resp.json();
         if (data.success) {
            setRestaurant(data.restaurant);
         }
      }
      catch (err) {
         console.log(err);
      }
   }, [restaurantId])

   /*    useEffect(()=>{
         fetchRestaurant();
      },[fetchRestaurant]) */

   return (
      <div>
         <div class="accordion accordion-flush" id="accordionFlushExample">
            {data.map(item => {
               return (
                  <div class="accordion-item h-25">
                     <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                           {item.name}
                        </button>
                     </h2>
                     <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                              <div class="row">
                                 <div class="col border border-secondary">
                                    <img className="col rounded-circle w-10 h-25" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdA6Fz0omLBkfpx1i90mlP9di5ZdxkJfpLew&usqp=CAU" alt="dish"/>
                                 </div>
                                 <div class="col-4 border border-secondary">
                                    Type of dish: {item.categoryName}
                                 </div>
                                 <div class="col-4 border border-secondary">
                                    Description: {item.description}
                                 </div>
                              </div>
                        </div>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default Dishes;