class apiError extends Error{
    constructor( statusCode, message="something went wrong",error=[],stack=""){
        super(message)
       this.statusCode=statusCode,
       this.message=message,
       this.data=null,
       this.success=false,
       this.error=error
      
       if(stack){
        this.stack=stack
       }else{
        Error.captureStackTrace(this,this.constructor)
       }
    }
}

module.exports= {apiError}