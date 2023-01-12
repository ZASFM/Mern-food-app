import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import { useState, useEffect} from "react";

const Home = () => {
   const [items, setItems] = useState([]);
   const [categories, setCategories] = useState([]);
   const [search,setSearch]=useState('');

   const fetchItems = async () => {
      try {
         const resp = await fetch('http://localhost:5000/api/v1/foodItems');
         const data = await resp.json();
         setItems(data.items)
      }
      catch (err) {
         console.log(err);
      }
   }

   const fetchCategories = async () => {
      try {
         const resp = await fetch('http://localhost:5000/api/v1/foodCategory');
         const data = await resp.json();
         setCategories(data.categories)
      }
      catch (err) {
         console.log(err);
      }
   }
   useEffect(() => {
      fetchCategories();
      fetchItems();
   }, [])

   return (
      <div>
         <div>
            <Navbar />
         </div>
         <div>
            <Carousel 
               search={search}
               setSearch={setSearch}
            />
         </div>
         <div className="container">
            {
               categories !== [] ? categories.map(category => {
                  return (
                     <div className="row mb-3">
                        <div key={category._id} className="fs-3 m-3">
                           {category.categoryName}
                        </div>
                        <hr />
                        {items!==[]?
                        items.filter(item=>
                           (item.categoryName===category.categoryName) 
                              && 
                           (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems=>{
                           return (
                              <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                 <Card
                                    foodName={filterItems.name}
                                    options={filterItems.option}
                                    imgSrc={filterItems.img}
                                 />
                              </div>
                           )
                        })
                        :'Not such an items'}
                     </div>
                  )
               }) : 'No categories'
            }
{/*             {items !== [] ? items.map(item => {
               return (
                  <Card />
               )
            }) : 'No items'} */}
         </div>
         <div>
            <Footer />
         </div>
      </div>
   )
}

export default Home;