import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const MyOrder = () => {
   const [orderData, setOrderData] = useState([]);

   const fetchMyOrder = async () => {
      const resp = await fetch('http://localhost:5000/api/v1/orderData/getMyOrder', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            email: localStorage.getItem('email')
         })
      })
      const data = await resp.json();
      if (data.success) {
         setOrderData(data.orderData.order_data);
      }
   }

   useEffect(() => {
      fetchMyOrder();
   }, [])

   return (
      <div>
         <div>
            <Navbar />
         </div>
         <div className="container">
            <div className="row">
               {orderData !== [] ?
                  <div>
                     {orderData.map(item => {
                        if (item.length === undefined || item.length === 0) {
                           if ('Order_date' in item) {
                              return (
                                 <>
                                    <div className="m-auto mt-5">Ordered on: {item.Order_date}</div>
                                    <hr />
                                 </>
                              )
                           } else {
                              return (
                                 <div className="col-12 col-md-6 col-lg-3">
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                       <h5 className="card-title">Name: {item.name}</h5>
                                       <span className='m-1'>Size: {item.size}</span>
                                       <span className='m-1'>Quantity: {item.qty}</span>
                                       <div className="d-inline ms-2 h-100 w-20 fs-5'">Price: {item.price}</div>
                                    </div>
                                 </div>
                              )
                           }
                        } else if (item.length > 0) {
                           return item.map(subItem => {
                              if ('Order_date' in subItem) {
                                 return (
                                    <>
                                       <div className="m-auto mt-5">{subItem.Order_date}</div>
                                       <hr />
                                    </>
                                 )
                              } else {
                                 return (
                                    <div className="col-12 col-md-6 col-lg-3">
                                       <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                          <h5 className="card-title">Name: {subItem.name}</h5>
                                          <span className='m-1'>Size: {subItem.size}</span>
                                          <span className='m-1'>Quantity: {subItem.qty}</span>
                                          <div className="d-inline ms-2 h-100 w-20 fs-5'">Price: {subItem.price}</div>
                                       </div>
                                    </div>
                                 )
                              }
                           })
                        }
                        return ''
                     })}
                  </div> : ''}
            </div>
         </div>

         <Footer />
      </div>
   )
}

export default MyOrder;