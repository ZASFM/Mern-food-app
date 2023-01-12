const Carousel = ({search,setSearch}) => {
   return (
      <div>
         <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" id="carousel" >
               <div className="carousel-caption" style={{"zIndex":"10"}}>
                  <div className="d-flex justify-content-center">
                     <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={e=>setSearch(e.target.value)}/>
                     {/* <button className="btn btn-outline-success" type="submit" style={{backgroundColor:"black"}}>Search</button> */}
                  </div>
               </div>
               <div className="carousel-item active">
                  <img src="https://source.unsplash.com/random/300x300?pizza" style={{"filter":"brightness(30%)"}} className="d-block w-100" alt="..." />
               </div>
               <div className="carousel-item">
                  <img src="https://source.unsplash.com/random/300x300?burger" style={{"filter":"brightness(30%)"}} className="d-block w-100" alt="..." />
               </div>
               <div className="carousel-item">
                  <img src="https://source.unsplash.com/random/300x300?fries" style={{"filter":"brightness(30%)"}} className="d-block w-100" alt="..." />
               </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
               <span className="carousel-control-prev-icon" aria-hidden="true"></span>
               <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
               <span className="carousel-control-next-icon" aria-hidden="true"></span>
               <span className="visually-hidden">Next</span>
            </button>
         </div>
      </div>
   )
}

export default Carousel