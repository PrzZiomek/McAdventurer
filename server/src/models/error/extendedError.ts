
export class ExtendedError extends Error {
    
    constructor(
        public name: string,
        public statusCode: number, 
        private description: string
    ) {
       super(description);

       if(!new.target) throw new Error("ExtendedError must be instantiated with new!")

       Object.setPrototypeOf(this, new.target.prototype);

       Error.captureStackTrace(this);
    }

} 