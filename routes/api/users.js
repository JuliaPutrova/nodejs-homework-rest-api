const express = require("express");

const { auth } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrl.getCurrent);

module.exports = router;
