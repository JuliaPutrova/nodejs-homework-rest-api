const { User } = require("../../model");
const { Unauthorized } = require("http-errors");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user.verify);
    if (!user || !user.verify || !user.comparePassword(password)) {
      throw new Unauthorized(
        "Email is wrong or not verify, or password is wrong"
      );
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        users: {
          email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = login;
