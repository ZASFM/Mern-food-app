const stripe=require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const createError=require('../middlewares/createError');

const checkout=async(req,res,next)=>{
   try{
      const session=await stripe.checkout.sessions.create({
         payment_method_types:['card'],
         mode:'payment',
         line_items:req.body.items.map(item=>{
            return {
               price_data:{ 
                  currency:'usd',
                  product_data:{
                     name:item.name,
                  },
                  unit_amount:item.price*100,
               },
               quantity:item.qty,
            }
         }),
      })
      //the url is the ({url})
      res.json({url:session.url})
   }
   catch(err){
      next(createError(400,'Could not perform payment'))
   }
}

module.exports=checkout