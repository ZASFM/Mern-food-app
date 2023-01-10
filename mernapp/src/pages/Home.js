import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
   return (
      <div>
         <div>
            <Navbar />
         </div>
         <div>
            <div class="card mt-3" style={{"width": "18rem","maxHeight":"360px"}}>
               <img class="card-img-top" src="..." alt="Card image cap"/>
                  <div class="card-body">
                     <h5 class="card-title">Card title</h5>
                     <p class="card-text">Text</p>
                     <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded">
                           {Array.from(Array(6),(e,i)=>{
                              return (
                                 <option
                                    key={i+1}
                                    value={i+1}
                                 >
                                    {i+1}
                                 </option>
                              )
                           })}
                        </select>
                        <select className="m-2 h-100 bg-success rounded">
                           <option value="half">Half</option>
                           <option value="full">Full</option>
                        </select>
                        <div className="d-inline h-100 fs-5">
                           Total price
                        </div>
                     </div>
                  </div>
            </div>
         </div>
         <div>
            <Footer />
         </div>
      </div>
   )
}

export default Home;