const createError=(status,msg)=>{
   const error=new Error();
   error.statusCode=status;
   error.msg=msg;
   return error;
}

module.exports=createError;