const { Contact } = require("../../model");

const listContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "-createdAt -updatedAt");
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContact;
