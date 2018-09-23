module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);

    //ctx.status = err.statusCode || err.status || 500;
   
    const { message, errors, cookie } = err;
    let validationErrors = [];

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

    if (cookie) {
      const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
      message && validationErrors.push(message);
      const errors = encodeURIComponent(JSON.stringify(validationErrors));
      ctx.cookies.set("errors", `${errors}`, {
        expires: inOneHour,
        httpOnly: false,
        signed: false
      });
      return ctx.redirect("/");
    }

    ctx.body = {
      status: ctx.status,
      errors: !validationErrors.length ? [message] : validationErrors
    };
  }
};
