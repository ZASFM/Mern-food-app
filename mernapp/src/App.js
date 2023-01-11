import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
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
     </Routes>
  );
}

export default App;
