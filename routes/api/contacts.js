const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: " message!!! do" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template  done!!!" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
