const ejs = require("ejs");
const path = require("path");
const { createTransport } = require("nodemailer");
const {
  emailService: { user, pass }
} = require("../../../config");

const sendEmail = async ({ username, email, filename, subject, htmlData }) => {
  const smtpTransport = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user,
      pass
    }
  });

  const emailTemplate = await ejs.renderFile(
    path.join(__dirname, "emailTemplate", filename),
    htmlData
  );

  const mailOptions = {
    to: email,
    from: "chater@admin.ru",
    subject: subject,
    html: emailTemplate
  };

  return await smtpTransport.sendMail(mailOptions);
};

exports.sendEmail = sendEmail;
