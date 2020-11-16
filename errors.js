class ParameterError extends Error {
    constructor(...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ParameterError)
      }
  
      this.name = 'ParameterError';
    }
}

class NotFoundError extends Error {
    constructor(...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, NotFoundError)
      }
  
      this.name = 'NotFoundError';
    }
}

module.exports = {
    ParameterError : ParameterError,
    NotFoundError: NotFoundError
};