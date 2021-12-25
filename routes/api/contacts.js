const express = require("express");
const router = express.Router();

const validation = require("../../middlewares");

const { json } = require("express");
const { contacts: ctrl } = require("../../controllers");

const { joiSchema, favoriteJoiSchema } = require("../../model/contact");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validation(joiSchema), ctrl.addContact);

router.put("/:contactId", validation(joiSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.removeContact);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrl.updateStatusContact
);

module.exports = router;
