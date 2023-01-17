const Second = ({ handleChange, handleLocation, credentials }) => {
   return (
      <div>
         <div className="mb-3">
            <label htmlFor="location" className="form-label">Address</label>
            <input type="text" className="form-control" id="location" name="geoLocation" onChange={handleChange} value={credentials.geoLocation} />
            <button onClick={handleLocation}>Locate me</button>
         </div>
         <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={credentials.password} />
         </div>
      </div>
   )
}

export default Second;