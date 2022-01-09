const { User } = require("../../model");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const avatarURL = gravatar.url(email);
    const verificationToken = v4();

    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);

    await newUser.save();

    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
    };

    await sendEmail(mail);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          avatarURL,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
