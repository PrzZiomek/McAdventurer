
// to do: refactor ExtendedError

export class ExtendedError extends Error {

    public statusCode: number; 
    public name: string;
    
    constructor(name: string, statusCode: number, description: string) {
       super(description);

       if(!new.target) throw new Error("ExtendedError must be instantiated with new!")

       Object.setPrototypeOf(this, new.target.prototype);

       this.name = name;
       this.statusCode = statusCode;
       this.description = description;

       Error.captureStackTrace(this);
    }

} 