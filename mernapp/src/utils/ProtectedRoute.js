import {Navigate} from 'react-router-dom';
import { useAuthProvider } from '../contexts/authContext';

const ProtectedRoute=({children})=>{
   const {user}=useAuthProvider();
   if(!user){
      return <Navigate to="/"/>
   }
   return children;
}

export default ProtectedRoute;