import {useParams} from 'react-router-dom';

const MyRestaurant=()=>{
   const {id}=useParams();
   return (
      <div>
         My restaurant
      </div>
   )
}

export default MyRestaurant; 