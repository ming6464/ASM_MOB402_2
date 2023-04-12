const router = require("express").Router();
const productCtrl = require("../controllers/product");
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

router.route("/").get(productCtrl.GetAll);

router
   .route("/create")
   .get(productCtrl.ShowCreate)
   .post(upload.single("image"), productCtrl.Create);

router
   .route("/update/:id")
   .get(productCtrl.ShowUpdate)
   .post(upload.single("image"), productCtrl.Update);

router.route("/delete/:id").post(productCtrl.Delete);

module.exports = router;
