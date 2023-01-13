const Card = ({foodName,options,imgSrc}) => {
   let pickOptions=options[0];
   let priceOptions=Object.keys(pickOptions);

   return (
      <div>
         <div>
            <div class="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
               <img class="card-img-top" src={imgSrc} alt="food"  style={{height:"200px",objectFit:"fill"}}/>
               <div class="card-body"> 
                  <h5 class="card-title">{foodName}</h5>
                  <div className="container w-100">
                     <select className="m-2 h-100 bg-success rounded">
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
                     <select className="m-2 h-100 bg-success rounded">
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
                        Total price
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Card;