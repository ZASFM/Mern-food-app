import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/authContext";
import { Link } from "react-router-dom";
import {FaArrowLeft} from 'react-icons/fa';

const Profile = () => {
   const jwt = localStorage.getItem('token');
   const [user, setUser] = useState({});
   const {dispatch}=useAuthProvider();
   useEffect(() => {
      const fetchUser = async () => {
         try {
            const resp = await fetch(`http://localhost:5000/api/v1/users/profile/${jwt}`);
            const data = await resp.json();
            if (data.success) {
               setUser({
                  email:data.user.email,
                  name:data.user.name,
                  location:data.user.location,
                  image:data.user.image,
               });
            }
         }
         catch (err) {
            console.log(err);
         }
      }
      fetchUser();
   }, [])

   const handleChange=(e)=>{
      const {name,value}=e.target;
      setUser(preVal=>{
         return {
            ...preVal,
            [name]:value
         }
      })
   }

   const navigate=useNavigate();
   const handleSubmit=(e)=>{
      e.preventDefault();
   }

   const updateUser=async()=>{
      try{
         const resp=await fetch(`http://localhost:5000/api/v1/users/profile/${jwt}`,{
            method:'PUT',
            headers:{
               'Content-type':'application/json'
            },
            body:JSON.stringify({
               ...user
            })
         });
         const data=await resp.json();
         if(data.success){
            navigate('/');
         }
      }
      catch(err){
         console.log(err);
      }
   }

   const deleteUser=async()=>{
      try{
         const resp=await fetch(`http://localhost:5000/api/v1/users/profile/${jwt}`,{
            method:'DELETE'
         });
         const data=await resp.json();
         if(data.success){
            dispatch({type:'LOGOUT'});
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('mongoJWT');
            navigate('/');
         }
      }
      catch(err){
         console.log(err);
      }
   }

   const setProfile=(e)=>{
      setUser(preVal=>{
         return {
            ...preVal,
            image:URL.createObjectURL((e.target.files[0]))
         }
      })
   }

   return (
      <div>
         <Link to="/"><FaArrowLeft/> Back</Link>
         {user !== {} ?
            <form onSubmit={handleSubmit} className="form-el">
               <div>
               <div>
                  <div className="profile-pic-container">
                     <img src={user.image?user.image:null} alt="profile" className="profile-pic"/>
                  </div>
                  <input type="file" onChange={setProfile}/>
               </div>
               </div>
               <div className="profile-el-2">
               <div className="mb-3">
                  <label htmlFor="name" className="form-label">Username</label>
                  <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={user.name} />
               </div>
               <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={user.email} readOnly/>
               </div>
               <div>
                  <div className="mb-3">
                     <label htmlFor="location" className="form-label">Address</label>
                     <input type="text" className="form-control" id="location" name="location" onChange={handleChange} value={user.location} />
                  </div>
               </div>
               <button className="m-3 btn btn-success" type="submit" onClick={updateUser}>Save</button>
               <button className="m-3 btn btn-success" type="submit" onClick={deleteUser}>Delete</button>
               </div>
            </form> :
            <div>Sorry, something bad occurred, please try again later</div>}
      </div>
   )
}

export default Profile