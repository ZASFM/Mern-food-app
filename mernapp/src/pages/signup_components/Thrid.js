const Third = ({ handleChange, credentials }) => {
   return (
      <div>
            <div className="d-flex mt-5 mb-3 justify-content-center w-100 fs-4">And our last question is: For what purpose are you creating this account:</div>
            <div className="d-flex justify-content-center mt-3">
            <label htmlFor="order">To order food</label>
            <input
               id="order"
               type="radio"
               name="account_usage"
               onChange={handleChange}
               value="order"
               checked={credentials.account_usage === "order"}
            />

            <label htmlFor="sell">To sell food</label>
            <input
               id="sell"
               type="radio"
               name="account_usage"
               onChange={handleChange}
               value="sell"
               checked={credentials.account_usage === "sell"}
            />
            </div>
      </div>
   )
}

export default Third;