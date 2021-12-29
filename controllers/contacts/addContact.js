const { Contact } = require("../../model");
const { NotFound } = require("http-errors");

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await Contact.create({ ...req.body, owner: _id });
    if (!result) {
      throw new NotFound("Not found");
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = addContact;
