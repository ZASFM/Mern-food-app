import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/authContext";
import Badge from 'react-bootstrap/Badge';
import { useState } from "react";
import Modal from '../Modal';
import Cart from "./Cart";
import { useCart } from "../contexts/cartContext";
import { RiAccountCircleLine } from 'react-icons/ri';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Navbar = () => {
   const [cartView, setCartView] = useState(false);
   const { dispatch } = useAuthProvider();
   const data = useCart();
   const navigate = useNavigate();
   const handleLogout = (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('mongoJWT');
      dispatch({ type: 'LOGOUT' })
      navigate('/login');
   }

   const handleProfile = (e) => {
      e.preventDefault();
      navigate('/profile');
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
                        <>
                           <li className="nav-item">
                              <Link className="nav-link active fs-5" aria-current="page"
                                 to="/myOrders"
                              >
                                 My orders
                              </Link>
                           </li>
                           <li className="nav-item">
                              <Link className="nav-link active fs-5" aria-current="page"
                                 to="/become_a_member"
                              >
                                 Become a member
                              </Link>
                           </li>
                        </> : ''}
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
                        <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                           My cart{" "}
                           <Badge pill bg="danger">{data.length}</Badge>
                        </div>
                        {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ''}
                        <div className="btn mx-2 dropdown">
                           <DropdownButton id="dropdown-basic-button" title={<RiAccountCircleLine />} >
                              <Dropdown.Item onClick={handleProfile}>My profile</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                           </DropdownButton>
                        </div>
                     </div>}
               </div>
            </div>
         </nav>
      </div>
   )
}

export default Navbar;