class HtppError extends Error{
  constructor(message,errorcode) {
    super(message);
    this.code = errorcode;
  }
}

module.exports = HtppError;
