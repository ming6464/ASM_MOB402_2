const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expHbs = require("express-handlebars");
const apiRouter = require("./routers/api");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const port = 9999;

app.use(express.static("public"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, (err) => {
   if (err) throw err;
   console.log("Run application with port " + port);
});

app.engine(
   "hbs",
   expHbs.engine({
      extname: ".hbs",
      defaultLayout: "main",
      layoutsDir: "./views/layouts",
   })
);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use("/", apiRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
