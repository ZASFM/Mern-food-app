const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');

const AuthSchema=mongoose.Schema({
   name:{
      type:String,
      required:[true,'Username is required']
   },
   location:{
      type:String,
      required:[true,'Location is required']
   },
   email:{
      type:String,
      required:[true,'Email is required'],
      unique:true,
   },
   password:{
      type:String,
      required:[true,'Password is required'],
      minlength:6,
   },
   for:{
      type:String,
      required:[true,'Account usage is required']
   },
   date:{
      type:Date,
      default:Date.now
   }
})

AuthSchema.pre('save',async function(){
   const salt=await bcryptjs.genSalt(10);
   this.password=await bcryptjs.hash(this.password,salt);
})

AuthSchema.methods.comparePassword=async function(inputPassword){
   const isPasswordCorrect=await bcryptjs.compare(inputPassword,this.password);
   return isPasswordCorrect;
}

module.exports=mongoose.model('AuthSchema',AuthSchema);