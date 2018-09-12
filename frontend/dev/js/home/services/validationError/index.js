function ValidationError(message = []) {
  this.name = "Validation Error";
  this.message = message || "Ошибка валидации, повторите отправку.";
  this.stack = new Error().stack;
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

export default ValidationError;
