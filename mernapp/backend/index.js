const express=require('express');
require('dotenv').config();
const cors=require('cors');
const connectDB=require('./db/connectDB');
const AuthRouter=require('./routes/Auth');
const mongoose=require('mongoose');
const foodCategoryRouter=require('./routes/FoodCategory');
const foodItemsRouter=require('./routes/Food_items');
const cookieParser=require('cookie-parser');
const orderRouter=require('./routes/Order');
const paymentRouter=require('./routes/Payment');

const app=express();
const PORT=process.env.PORT||8000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
mongoose.set('strictQuery',true);
app.use('/api/v1/auth',AuthRouter);
app.use('/api/v1/foodCategory',foodCategoryRouter);
app.use('/api/v1/foodItems',foodItemsRouter);
app.use('/api/v1/orderData',orderRouter);
app.use('/create-session-checkout',paymentRouter);
app.use((err,req,res,next)=>{
   const statusCode=err.statusCode||500;
   const msg=err.msg||'Something went wrong, please try again later';
   res.status(statusCode).json({success:false,msg});
})

const start=async()=>{
   try{
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT,()=>{
         console.log(`App listening on port ${PORT}`);
      })
   }
   catch(err){
      console.log(err);
   }
}
start();