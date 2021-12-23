const { Contact } = require("../../model");
const { NotFound } = require("http-errors");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!result) {
      throw new NotFound('missing field favorite"');
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    error.status = 404;
    error.message = "Not found";
    next(error);
  }
};

module.exports = updateStatusContact;
