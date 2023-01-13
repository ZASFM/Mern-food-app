import { useCart, useDispatch } from "../contexts/cartContext";
import {FaTrashAlt} from 'react-icons/fa';

const Cart = () => {
   const data=useCart();
   const dispatch=useDispatch();

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
            </div>
         </div>



      </div>
   )
}

export default Cart;