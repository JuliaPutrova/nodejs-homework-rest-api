const { User } = require("../../model");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    const resultUpload = path.join(avatarDir, imageName);

    const file = await Jimp.read(tempload);
    file.resize(250, 250).write(tempload);

    await fs.rename(tempload, resultUpload);
    const avatarUrl = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempload);
    next(error);
  }
};

module.exports = updateAvatar;
