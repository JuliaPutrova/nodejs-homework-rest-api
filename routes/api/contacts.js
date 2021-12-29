const express = require("express");
const router = express.Router();

const { auth, validation } = require("../../middlewares");

const { json } = require("express");
const { contacts: ctrl } = require("../../controllers");

const { joiSchema, favoriteJoiSchema } = require("../../model/contact");

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", auth, validation(joiSchema), ctrl.addContact);

router.put("/:contactId", validation(joiSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.removeContact);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrl.updateStatusContact
);

module.exports = router;
