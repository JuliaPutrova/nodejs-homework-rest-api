const express = require("express");

const { auth, upload } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrl.getCurrent);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
