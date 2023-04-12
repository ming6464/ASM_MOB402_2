const User = require("../modules/user");
const Cookie = require("../DataSave");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z ]+$/;
const GetAll = async (req, res, next) => {
   try {
      if (!Cookie.CheckIdAdmin()) return res.send("Not Permission");
      if (!(await Cookie.checkCookie(req))) {
         return res.redirect("/");
      }
      let list = await User.find({}).lean();
      let users = list.filter((x) => x.role != "admin");
      res.render("user", {
         users,
         isProductSelected: true,
         checkPermission: true,
      });
   } catch (error) {
      res.redirect("/");
   }
};

const Create = async (req, res, next) => {
   let check = true;
   try {
      if (!(await Cookie.checkCookie(req))) {
         check = false;
         throw new Error("Lỗi");
      }
      const { name, email, password } = req.body;
      const file = req.file;
      if (!file) throw new Error("lỗi file trống");
      if (
         !nameRegex.test(name) ||
         !emailRegex.test(email) ||
         password.length == 0
      )
         throw new Error("lỗi");
      let originName = file.path.split("\\");
      let image = "";
      for (let i = 1; i < originName.length; i++) {
         image += originName[i] + "\\";
      }
      image = image.slice(0, -1);
      let newUser = new User({
         name: name,
         email: email,
         password: password,
         image: image,
         role: "user",
      });
      await newUser.save();
      return res.redirect("/user");
   } catch (error) {
      if (!check) {
         return res.redirect("/");
      }
      return res.redirect("/user/create");
   }
};

const ShowCreate = (req, res, next) => {
   res.render("actionUser", { isUpdate: false });
};

const SignIn = async (req, res, next) => {
   const { email, password } = req.body;
   try {
      if (!emailRegex.test(email) || password.length == 0)
         throw new Error("lỗi");
      let findUser = await User.findOne({
         email: email,
         password: password,
      }).lean();
      await Cookie.SetCookie(res, findUser._id);
      await Cookie.SetRole(findUser.role);
      return res.redirect("/product");
   } catch (error) {
      return res.redirect(`/`);
   }
};
const SignUp = async (req, res, next) => {
   try {
      const { name, email, password, password1 } = req.body;
      if (
         !nameRegex.test(name) ||
         !emailRegex.test(email) ||
         password.length == 0 ||
         password1.length == 0
      )
         throw new Error("không đúng định dạng");
      else if (password != password1)
         throw new Error("Mật khẩu không giống nhau");
      const file = req.file;
      if (!file) throw new Error("Hãy nhâp file");
      let originName = file.path.split("\\");
      let image = "";
      for (let i = 1; i < originName.length; i++) {
         image += originName[i] + "\\";
      }
      image = image.slice(0, -1);

      let newUser = new User({
         name: name,
         email: email,
         password: password,
         image: image,
         role: "user",
      });
      await newUser.save();
   } catch (error) {
      console.log(error);
      return res.redirect("/signup");
   }
   return res.redirect("/");
};
const Update = async (req, res, next) => {
   const id = req.params.id;
   try {
      if (!(await Cookie.checkCookie(req))) {
         return res.redirect("/");
      }
      const { name, email, password } = req.body;
      if (
         !nameRegex.test(name) ||
         !emailRegex.test(email) ||
         password.length == 0
      )
         throw new Error("Lỗi định dạng");
      if (
         !nameRegex.test(name) ||
         !emailRegex.test(email) ||
         password.length == 0
      )
         throw new Error("lỗi");
      const file = req.file;
      let checkImage = true;
      if (!file) {
         checkImage = false;
      }

      let updateUser = {
         name: name,
         email: email,
         password: password,
      };

      if (checkImage) {
         let originName = file.path.split("\\");
         let image = "";
         for (let i = 1; i < originName.length; i++) {
            image += originName[i] + "\\";
         }
         image = image.slice(0, -1);
         updateUser.image = image;
      }
      await User.updateOne({ _id: id }, updateUser);
      return res.redirect("/user");
   } catch (error) {
      return res.redirect(`/user/update/${id}`);
   }
};

const ShowUpdate = async (req, res, next) => {
   try {
      const id = req.params.id;
      if (id.length == 0) return res.redirect("/");
      let userUpdate = await User.findById(id);
      if (!userUpdate) return res.redirect("/");
      userUpdate.isUpdate = true;
      res.render("actionUser", userUpdate);
   } catch (error) {
      return res.redirect("/user");
   }
};
const Delete = async (req, res, next) => {
   const id = req.params.id;
   if (id.length == 0) return res.redirect("/");
   try {
      if (!(await Cookie.checkCookie(req))) {
         return res.redirect("/");
      }
      await User.deleteOne({ _id: id });
   } catch (error) {}
   res.redirect("/user");
};

module.exports = {
   SignIn,
   SignUp,
   Update,
   Delete,
   Create,
   GetAll,
   ShowCreate,
   ShowUpdate,
};
