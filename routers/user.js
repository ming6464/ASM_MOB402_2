const router = require("express").Router();
const userCtrl = require("./../controllers/user");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      if (!fs.existsSync("./public/uploads")) {
         fs.mkdirSync("./public/uploads");
      }
      cb(null, "./public/uploads");
   },
   filename: function (req, file, cb) {
      let originName = file.originalname.split(".");
      const name = Date.now() + "." + originName[originName.length - 1];
      cb(null, name);
   },
});

const upload = multer({
   storage: storage,
   limits: { fileSize: 10 * 1024 * 1024 },
});
router.route("/").get(userCtrl.GetAll);

router.route("/signup").post(upload.single("image"), userCtrl.SignUp);

router.route("/signin").post(userCtrl.SignIn);

router
   .route("/update/:id")
   .get(userCtrl.ShowUpdate)
   .post(upload.single("image"), userCtrl.Update);

router.route("/delete/:id").post(userCtrl.Delete);

router
   .route("/create")
   .get(userCtrl.ShowCreate)
   .post(upload.single("image"), userCtrl.Create);

module.exports = router;
