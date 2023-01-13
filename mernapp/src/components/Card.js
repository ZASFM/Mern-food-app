import { useState, useRef, useEffect } from "react";
import { useDispatch, useCart } from "../contexts/cartContext";

const Card = ({foodItem,options}) => {
   let pickOptions=options[0];
   let priceOptions=Object.keys(pickOptions);
   let dispatch=useDispatch();
   let data=useCart();
   let priceRef=useRef();
   const [qty,setQty]=useState(1);
   const [size,setSize]=useState('');
   useEffect(()=>{
      setSize(priceRef.current.value);
   },[])
   let finalPrice=qty*parseInt(options[0][size]);
   const handleAddToCart=async()=>{
      await dispatch({type:'ADD',
         id:foodItem._id,
         name:foodItem.name,
         price:finalPrice,
         qty:qty,
         size:size,
         img:foodItem.img,
      })
   }

   return (
      <div>
         <div>
            <div class="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
               <img class="card-img-top" src={foodItem.img} alt="food"  style={{height:"200px",objectFit:"fill"}}/>
               <div class="card-body"> 
                  <h5 class="card-title">{foodItem.name}</h5>
                  <div className="container w-100">
                     <select className="m-2 h-100 bg-success rounded" onChange={e=>setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                           return (
                              <option
                                 key={i + 1}
                                 value={i + 1}
                              >
                                 {i + 1}
                              </option>
                           )
                        })}
                     </select>
                     <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={e=>setSize(e.target.value)}>
                        {priceOptions.map(option=>{
                           return (
                              <option key={option} value={option}>
                                 {option}
                              </option>
                           )
                        })}
{/*                         <options>Full</options>
                        <options>Half</options> */}
                     </select>
                     <div className="d-inline h-100 fs-5">
                        {`${finalPrice}$`}
                     </div>
                  </div>
                  <hr/>
                  <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to cart</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Card;