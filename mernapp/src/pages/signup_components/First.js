const First = ({ handleChange, credentials }) => {
   return (
      <div>
            <div className="mb-3">
               <label htmlFor="name" className="form-label">Username</label>
               <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={credentials.name} />
            </div>
            <div className="mb-3">
               <label htmlFor="email" className="form-label">Email address</label>
               <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange} value={credentials.email} />
               <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
      </div>
   )
}

export default First;