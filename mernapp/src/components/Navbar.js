import { Link,useNavigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/authContext";
import Badge from 'react-bootstrap/Badge';
import { useState } from "react";
import Modal from '../Modal';
import Cart from "./Cart";
import { useCart } from "../contexts/cartContext";

const Navbar = () => {
   const [cartView,setCartView]=useState(false);
   const {dispatch}=useAuthProvider();
   const data=useCart();
   const navigate=useNavigate();
   const handleLogout=()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({type:'LOGOUT'})
      navigate('/login');
   } 

   return (
      <div>
         <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
               <Link
                  className="navbar-brand fs-1 fst-italic"
                  to="/"
               >
                  My food app
               </Link>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav me-auto mb-2">
                     <li className="nav-item">
                        <Link className="nav-link active fs-5" aria-current="page"
                           to="/"
                        >
                           Home
                        </Link>
                     </li>
                     {localStorage.getItem('token') ?
                        <li className="nav-item">
                           <Link className="nav-link active fs-5" aria-current="page"
                              to="/"
                           >
                              My orders
                           </Link>
                        </li> : ''}
                  </ul>
                  {!localStorage.getItem('token') ?
                     <div className="d-flex">
                        <Link className="btn bg-white text-success mx-1"
                           to="/login"
                        >
                           Login
                        </Link>


                        <Link className="btn bg-white text-success mx-1"
                           to="/signup"
                        >
                           Signup
                        </Link>
                     </div> : 
                     <div>
                        <div className="btn bg-white text-success mx-2" onClick={()=>setCartView(true)}>
                           My cart{" "}
                           <Badge pill bg="danger">{data.length}</Badge>
                        </div>
                        {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:'' }
                        <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                           Log out
                        </div>
                     </div>}
               </div>
            </div>
         </nav>
      </div>
   )
}

export default Navbar;