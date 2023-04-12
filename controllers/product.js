const Product = require("../modules/product");
const Cookie = require("../Cookie");
const GetAll = async (req, res, next) => {
   try {
      let check = await Cookie.checkCookie(req);
      if (!check) {
         return res.redirect("/");
      }
      let products = await Product.find({}).lean();
      res.render("product", { products, isProductSelected: true });
   } catch (error) {
      return res.json({ massage: "GetAll product thất bại" });
   }
};

const ShowCreate = (req, res, next) => {
   res.render("actionProduct", { isUpdate: false });
};

const Create = async (req, res, next) => {
   try {
      const { name, price, amount, color, category } = req.body;
      const file = req.file;
      if (!file) {
         res.redirect("/product/update");
      }

      let originName = file.path.split("\\");
      let image = "";
      for (let i = 1; i < originName.length; i++) {
         image += originName[i] + "\\";
      }
      image = image.slice(0, -1);

      if (!(await Cookie.checkCookie(req))) {
         return res.redirect("/");
      }
      let newProduct = new Product({
         name: name,
         price: price,
         amount: amount,
         image: image,
         color: color,
         category: category,
      });
      await newProduct.save();
   } catch (error) {}
   res.redirect("/product");
};

const ShowUpdate = async (req, res, next) => {
   const id = req.params.id;
   if (id.length == 0) return res.redirect("/");
   try {
      let productUpdate = await Product.findById(id).lean();
      if (!productUpdate) return res.redirect("/");
      productUpdate.isUpdate = true;
      res.render("actionProduct", productUpdate);
   } catch (error) {
      return res.redirect("/product");
   }
};

const Update = async (req, res, next) => {
   try {
      const id = req.params.id;
      if (id.length == 0) return res.redirect("/");
      const { name, price, amount, color, category } = req.body;
      const file = req.file;
      let checkImage = true;
      if (!file) {
         checkImage = false;
      }

      let updateProduct = {
         name: name,
         price: price,
         amount: amount,
         color: color,
         category: category,
      };

      if (checkImage) {
         let originName = file.path.split("\\");
         let image = "";
         for (let i = 1; i < originName.length; i++) {
            image += originName[i] + "\\";
         }
         image = image.slice(0, -1);
         updateProduct.image = image;
      }

      if (!(await Cookie.checkCookie(req))) {
         return res.redirect("/");
      }
      await Product.updateOne({ _id: id }, updateProduct);
      res.redirect("/product");
   } catch (error) {
      res.redirect("/product/update");
   }
};

const Delete = async (req, res, next) => {
   const id = req.params.id;
   if (id.length == 0) return res.redirect("/");
   try {
      if (!(await Cookie.checkCookie(req))) {
         return res.redirect("/");
      }
      await Product.deleteOne({ _id: id });
   } catch (error) {}
   res.redirect("/product");
};

module.exports = { Create, Update, Delete, GetAll, ShowCreate, ShowUpdate };
