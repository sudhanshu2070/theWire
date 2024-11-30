class CustomError extends Error {
    public status: number;
    public success: boolean;
  
    constructor(message: string, status: number) {
      super(message);
      this.status = status;
      this.success = false;
  
      // Capturing the stack trace for debugging purposes
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
    }
  }
  
  export default CustomError;