module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    
    //ctx.status = err.statusCode || err.status || 500;

    const { errors } = err;
    let validationErrors;

    if (errors) {
      validationErrors = Object.values(errors).map(
        ({ path, message }) => `${path}: ${message}`
      );
    }
    if (err.isJoi) {
      const joiErrors = err.details.map(({ message }) => message);
      validationErrors = validationErrors
        ? [...validationErrors, ...joiErrors]
        : joiErrors;
    }

    ctx.body = {
      status: ctx.status,
      errors: validationErrors || [ err.message ]
    };
  }
};
