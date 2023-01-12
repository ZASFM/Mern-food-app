import {useState,useEffect} from 'react';

const axios=require('axios');
const useFetch=(url)=>{
   const [data,setData]=useState([]);
   const [loading,setLoading]=useState(false);
   const [error,setError]=useState(false);

   useEffect(()=>{
      const fetchData=async(url)=>{
         setLoading(true);
         try{
            const res=await axios.get(url)
            setData(res);
         }
         catch(err){
            setError(err);
         }
         setLoading(false);
      }
      fetchData(url)
   },[url])

   return {
      data,
      loading,
      error
   }
}

export default useFetch;