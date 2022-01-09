const { User } = require("../../model");
const { BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");

const repeatVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new BadRequest("missing required field email");
    }
    const user = await User.findOne({ email });
    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }

    const data = {
      to: user.email,
      subject: "Подтверждение регистрации на сайте",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}" target="_blank">Click here for confirmation your email</a>`,
    };
    await sendEmail(data);
    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = repeatVerification;
