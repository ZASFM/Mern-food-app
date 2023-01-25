import { Link } from "react-router-dom";
import {FaArrowCircleRight} from 'react-icons/fa';

const Restaurant=({_id,delivery,dishes,email,location,name,typeOfRestaurant,ratings})=>{
   const totalRating=ratings.reduce((total,rating)=>total+rating.rating);
   return (
      <div>
            <div className="card border border-secondary" style={{ width: "18rem" }}>
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdA6Fz0omLBkfpx1i90mlP9di5ZdxkJfpLew&usqp=CAU" className="card-img-top" alt="..." />
               <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">Evaluation: {totalRating/5}/5</p>
                  <Link to={`/become_a_member/my_restaurants/${_id}`}className="btn btn-primary">Go to restaurant <FaArrowCircleRight/></Link>
               </div>
            </div>        
      </div>
   )
}

export default Restaurant;