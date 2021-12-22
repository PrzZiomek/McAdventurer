export class ErrorObject extends Error {

   public httpStatusCode!: number;   
   public apiRes: string;

   constructor(errorObj: { message: string, apiRes: string }) {
       super(errorObj.message);
       this.name = "apiErrorObject";
       this.apiRes = errorObj.apiRes;
       Object.setPrototypeOf(this, ErrorObject.prototype)
   }
} 