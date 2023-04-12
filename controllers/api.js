const Cookie = require("../Cookie");

const signInObj = {
   title1: "Sign In",
   title2: "Sign Up",
   action1: "/user/signin",
   action2: "/signup",
   isSignUp: false,
   massage: "Need an account? ",
};
const signUpObj = {
   title1: "Sign Up",
   title2: "Sign In",
   action1: "/user/signup",
   action2: "/",
   isSignUp: true,
   massage: "Have account ",
};

const signin = (req, res, next) => {
   res.render("signIn", signInObj);
};
const signup = (req, res, next) => {
   res.render("signUp", signUpObj);
};

module.exports = { signin, signup };
