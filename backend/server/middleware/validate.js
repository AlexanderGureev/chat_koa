const resetFormValidation = async (ctx, next) => {
  const { passNew, passConfirm } = ctx.request.body;

  if (passNew !== passConfirm) {
    ctx.throw(400, "Форма заполнена некорректно.");
  }

  await next();
};

const formValidation = async (ctx, next) => {
  const isValid = Object.values(ctx.request.body).every(field => field);

  if (!isValid) {
    return ctx.throw(401, "Заполните все поля формы.");
  }
  await next();
};

module.exports = {
  resetFormValidation,
  formValidation
};
