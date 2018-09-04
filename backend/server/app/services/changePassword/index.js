const { User, generateResetToken, hashPassword } = require("../../model/user");
const { sendEmail } = require("../sendEmail");
const { validateResetPasswordForm } = require("../../../app/services/validate");

const forgotPassword = async ctx => {
  try {
    const { email } = ctx.request.body;
    const [user, token] = await Promise.all([
      User.findOne({ email }),
      generateResetToken()
    ]);

    if (!user) {
      ctx.body = { success: false };
      ctx.throw(400);
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    const { username } = await user.save();
    const mailOptions = {
      username,
      email,
      filename: "emailForgot.ejs",
      subject: "Сброс пароля CHATER.RU",
      htmlData: {
        username,
        url: `http://${ctx.host}/resetPassword/${user.resetPasswordToken}`
      }
    };

    const result = await sendEmail(mailOptions);

    if (!result) {
      ctx.body = { success: false };
      ctx.throw(400);
    }

    ctx.body = { success: true };
    console.log(
      "Сообщение с инструкциями по сбросу пароля отправлены на вашу почту."
    );
  } catch (error) {
    console.error(error);
  }
};

const checkToken = async (ctx, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: ctx.params.token,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    });

    if (!user) {
      console.error("Password reset token is invalid or has expired.");
      return ctx.redirect("/forgot");
    }

    ctx.user = user;
    await next();
  } catch (error) {
    console.error(error);
  }
};

const resetPassword = async ctx => {
  if(!validateResetPasswordForm(ctx.request.body)) {
    ctx.body = { success: false };
    ctx.throw(400, "Форма заполнена некорректно");
  }

  const { passNew } = ctx.request.body;
  const { user } = ctx;

  try {
    const hash = await hashPassword(passNew);
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    const { username, email } = await user.save();
    await ctx.login(user);
    ctx.body = { success: true };

    const mailOptions = {
      username,
      email,
      filename: "emailResetSuccess.ejs",
      subject: "Пароль изменен CHATER.RU",
      htmlData: {
        username,
        url: `http://localhost:3000/`
      }
    };

    await sendEmail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

const changePassword = async ctx => {
  if(!validateResetPasswordForm(ctx.request.body)) {
    ctx.body = { success: false };
    ctx.throw(400, "Форма заполнена некорректно");
  }

  try {
    const { _id } = ctx.state.user;
    let user = await User.findById(_id);

    const { passNew } = ctx.request.body;
    const hash = await hashPassword(passNew);
    user.password = hash;

    user = await user.save();
    await ctx.login(user);

    const mailOptions = {
      username,
      email,
      filename: "emailResetSuccess.ejs",
      subject: "Пароль изменен CHATER.RU",
      htmlData: {
        username,
        url: `http://localhost:3000/`
      }
    };

    await sendEmail(mailOptions);
    ctx.body = { success: true };

  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  forgotPassword,
  checkToken,
  resetPassword,
  changePassword
};
