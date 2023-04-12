const router = require("express").Router();
const apiCtl = require("./../controllers/api");

router.route("/").get(apiCtl.signin);

router.route("/signup").get(apiCtl.signup);

module.exports = router;
