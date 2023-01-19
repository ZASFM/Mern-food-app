const Third = ({ handleChange, credentials }) => {
   return (
      <div>
         <div className="d-flex mt-5 mb-3 justify-content-center w-100 fs-4">And our last question is: For what purpose are you creating this account:</div>
         <div className="d-flex justify-content-center mt-3">
            <div className="m-3">
            <label htmlFor="order" className="btn btn-secondary">To order food</label>
            <input
               id="order"
               type="radio"
               name="account_usage"
               onChange={handleChange}
               value="order"
               checked={credentials.account_usage === "order"}
               className="btn-check"
               autoComplete="off"
            />
            </div>

            <div className="m-3"> 
            <label htmlFor="sell" className="btn btn-secondary">To sell food</label>
            <input
               id="sell"
               type="radio"
               name="account_usage"
               onChange={handleChange}
               value="sell"
               checked={credentials.account_usage === "sell"}
               className="btn-check"
               autoComplete="off"
            />
            </div>
         </div>
      </div>
   )
}

export default Third;