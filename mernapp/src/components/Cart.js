import { useCart, useDispatch } from "../contexts/cartContext";
import {FaTrashAlt} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
   const data=useCart();
   const dispatch=useDispatch();
   console.log([...data]);

   if(data.length===0){
      return (
         <div className="m-5 text-center w-100 fs-3">
            No items here, please select a product
         </div>
      )
   }

   const handleCheckOut=async()=>{
      const userEmail=localStorage.getItem('email');
      const resp=await fetch('http://localhost:5000/api/v1/orderData',{
         method:'POST',
         headers:{
            'Content-Type':'application/json',
         },
         body:JSON.stringify({
            order_data:data,
            email:userEmail,
            order_date:new Date().toDateString()
         })
      })
      const respP=await resp.json();
      if(respP.success){
         dispatch({type:'DROP'})
      }
      toast.success('Items successfully added to your order', {
         position: "top-right",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
      });
   }

   const handlePayment=()=>{
      console.log(data);
      fetch('http://localhost:5000/api/v1/create-session-checkout',{
         method:'POST',
         headers:{
            'Content-Type':'application/json',
         },
         body:JSON.stringify({
            items:data
         })
      }).then(res=>{
         if(res.ok) return res.json();
         return res.json().then(json=>Promise.reject(json));
      }).then(({url})=>{
         console.log(url);
         window.location=url;
      }).catch(err=>{
         console.log(err);
      })
   }

   let totalPrice=data.reduce((total,food)=>food.price+total,0)
   return (
      <div>
         <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
            <table className='table table-hover '>
               <thead className=' text-success fs-4'>
                  <tr>
                     <th scope='col' >#</th>
                     <th scope='col' >Name</th>
                     <th scope='col' >Quantity</th>
                     <th scope='col' >Option</th>
                     <th scope='col' >Amount</th>
                     <th scope='col' ></th>
                  </tr>
               </thead>
               <tbody>
                 {data.map((food, index) => (
                     <tr>
                        <th scope='row' >{index + 1}</th>
                        <td >{food.name}</td>
                        <td>{food.qty}</td>
                        <td>{food.size}</td>
                        <td>{food.price}</td>
                        <td ><button type="button" className="btn p-0"><FaTrashAlt onClick={() => dispatch({type:'REMOVE',index:index})} /></button> </td></tr>
                  ))} 
               </tbody>
            </table>
            {<div><h1 className='fs-2'>Total Price: {totalPrice}$</h1></div> }
            <div>
               <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
               <button className='btn bg-success mt-5' onClick={handlePayment}> Pay </button>
            </div>
         </div>
         <ToastContainer
               position="top-right"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"

            />
      </div>
   )
}

export default Cart;