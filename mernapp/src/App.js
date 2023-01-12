import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  return (
     <Routes>
       <Route
          exact path="/"
          element={<Home/>}
       />
       <Route
          path="/login"
          element={<Login/>}
       />
       <Route
          path="/signup"
          element={<Signup/>}
       />
     </Routes>
  );
}

export default App;
