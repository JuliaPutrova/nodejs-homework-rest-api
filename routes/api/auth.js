const express = require("express");
const router = express.Router();

const { auth, validation } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../model/user");

const { json } = require("express");

router.post("/register", validation(joiRegisterSchema), ctrl.register);

router.post("/login", validation(joiLoginSchema), ctrl.login);

router.get("/logout", auth, ctrl.logout);
module.exports = router;
