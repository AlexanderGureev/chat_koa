const { User, generateResetToken, hashPassword } = require("../../model/user");
const { sendEmail } = require("../sendEmail");
const { responseMessage } = require("../responseMessage");

const forgotPassword = async ctx => {
  try {
    const { email } = ctx.request.body;
    let [user, token] = await Promise.all([
      User.findOne({ email }),
      generateResetToken()
    ]);

    if (!user) {
      ctx.throw(400, "Форма заполнена некорректно.");
    }
    if(user.provider !== "local") {
      throw new Error("Данная функция недоступна для пользователей зарегистрированных через социальные сети.");
    }
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    user = await user.save();
    console.log(user.email)
    const mailOptions = {
      username: user.username,
      email: user.email,
      filename: "emailForgot.ejs",
      subject: "Сброс пароля CHATER.RU",
      htmlData: {
        username: user.username,
        url: `http://${ctx.host}/resetPassword/${user.resetPasswordToken}`
      }
    };

    const result = await sendEmail(mailOptions);
    if (!result) {
      ctx.throw(400, "Произошла ошибка отправки письма");
    }

    ctx.body = responseMessage(
      200,
      "Сообщение с инструкциями по сбросу пароля отправлены на вашу почту."
    );
  } catch (error) {
    throw error;
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
      ctx.throw(400, "Password reset token is invalid or has expired.");
      return ctx.redirect("/forgot");
    }

    ctx.user = user;
    await next();
  } catch (error) {
    throw error;
  }
};

const resetPassword = async ctx => {
  const { passNew } = ctx.request.body;
  const { user } = ctx;

  try {
    const hash = await hashPassword(passNew);
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    const { username, email } = await user.save();
    await ctx.login(user);

    ctx.body = responseMessage(
      200,
      "Пароль успешно изменен, дополнительная информация отправлена на почту."
    );

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
    throw error;
  }
};

const changePassword = async ctx => {
  try {
    const { _id } = ctx.state.user;
    let user = await User.findById(_id);

    const { passNew } = ctx.request.body;
    const hash = await hashPassword(passNew);
    user.password = hash;

    user = await user.save();
    await ctx.login(user);

    const mailOptions = {
      username: user.username,
      email: user.email,
      filename: "emailResetSuccess.ejs",
      subject: "Пароль изменен CHATER.RU",
      htmlData: {
        username: user.username,
        url: `http://localhost:3000/`
      }
    };

    await sendEmail(mailOptions);
    ctx.body = responseMessage(
      200,
      "Пароль успешно изменен, дополнительная информация отправлена на почту."
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  forgotPassword,
  checkToken,
  resetPassword,
  changePassword
};
