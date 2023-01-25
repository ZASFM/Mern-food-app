import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { CartProvider } from "./contexts/cartContext";
import MyOrder from "./components/MyOrder";
import ProtectedRoute from "./utils/ProtectedRoute";
import Profile from "./pages/Profile";
import Member from "./pages/Member";
import CreateRestaurant from "./pages/res_components/CreateRes";
import MyRestaurants from "./pages/res_components/MyRes";
import MyRestaurant from "./pages/res_components/MyRestaurant";

function App() {
   return (
      <CartProvider>
         <Routes>
            <Route
               exact path="/"
               element={<Home />}
            />
            <Route
               path="/login"
               element={<Login />}
            />
            <Route
               path="/signup"
               element={<Signup />}
            />
            <Route
               path="/myOrders"
               element={<ProtectedRoute>
                  <MyOrder/>
               </ProtectedRoute>}
            />
            <Route
               path="/profile"
               element={
                  <ProtectedRoute>
                     <Profile/>
                  </ProtectedRoute>
               }
            />
            <Route path="/become_a_member">
               <Route
                  index
                  element={
                     <ProtectedRoute>
                        <Member/>
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/become_a_member/add_restaurant"
                  element={
                     <ProtectedRoute>
                        <CreateRestaurant/>
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/become_a_member/my_restaurants"
               >
                  <Route
                     index
                     element={
                        <ProtectedRoute>
                           <MyRestaurants/>
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="/become_a_member/my_restaurants/:id"
                     element={
                        <ProtectedRoute>
                           <MyRestaurant/>
                        </ProtectedRoute>
                     }
                  />
               </Route>
            </Route>
         </Routes>
      </CartProvider>
   );
}

export default App;
