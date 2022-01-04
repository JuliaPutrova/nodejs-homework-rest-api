const { User } = require("../../model");
const { Conflict } = require("http-errors");
const { json } = require("express");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const avatarURL = gravatar.url(email);

    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // await User.create({ email, password: hashPassword, avatarUrl });

    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);

    newUser.save();

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
