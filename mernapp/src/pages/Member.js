import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Member = () => {
   return (
      <div>
         <Navbar/>
      <div className="d-flex justify-content-center align-items-center w-100 gap-5 mt-5">
            <div className="card border border-secondary" style={{ width: "18rem" }}>
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdA6Fz0omLBkfpx1i90mlP9di5ZdxkJfpLew&usqp=CAU" className="card-img-top" alt="..." />
               <div className="card-body">
                  <h5 className="card-title">Add a new restaurant</h5>
                  <p className="card-text">Here you will be redirected to create your won restaurant for free and start recieving orders</p>
                  <Link to="/become_a_member/add_restaurant" className="btn btn-primary">Add Restaurants</Link>
               </div>
            </div>
            <div>
               <div className="card border-secondary" style={{ width: "18rem" }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdA6Fz0omLBkfpx1i90mlP9di5ZdxkJfpLew&usqp=CAU" className="card-img-top" alt="..." />
                  <div className="card-body">
                     <h5 className="card-title">Manage my restaurants</h5>
                     <p className="card-text">Here you will be redirected to manage all your restaurants and have a glance of them</p>
                     <Link to="/become_a_member/my_restaurants" className="btn btn-primary">My Restaurants</Link>
                  </div>
               </div>
            </div>
      </div>
      <Footer/>
      </div>
   )
}

export default Member;