const jwt = require("jsonwebtoken");
const JWT_SECRET = "helloworld";
const COOKIE_NAME = "Token_402_1";
const User = require("./modules/user");
const checkCookie = async (req) => {
   let check = true;
   try {
      let token = req.cookies[COOKIE_NAME];
      let id = jwt.verify(token, JWT_SECRET).id;
      let findUser = await User.findById(id);
      if (!findUser) {
         check = false;
      }
   } catch (error) {
      return false;
   }
   return check;
};

const CleanCookie = (res) => {
   res.cleanCookie(COOKIE_NAME);
};

const SetCookie = (res, id) => {
   let token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "15m" });
   res.cookie(COOKIE_NAME, token, { maxAge: 900000, httpOnly: true });
};

module.exports = {
   JWT_SECRET,
   checkCookie,
   COOKIE_NAME,
   CleanCookie,
   SetCookie,
};
