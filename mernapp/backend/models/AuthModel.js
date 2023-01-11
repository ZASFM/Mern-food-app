const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');

const AuthSchema=mongoose.Schema({
   username:{
      type:String,
      required:[true,'Username is required']
   },
   email:{
      type:String,
      required:[true,'Email is required'],
      unique:true,
   },
   password:{
      type:String,
      required:[true,'Password is required']
   }
})

AuthSchema.pre('save',async function(){
   const salt=await bcryptjs.genSalt(10);
   this.password=await bcryptjs.hash(this.password,salt);
})

module.exports=mongoose.model('AuthSchema',AuthSchema);