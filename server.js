const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyPaser = require("body-parser");
const mongoose = require("mongoose");
const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");
const customerRoutes = require("./api/routes/customers");
const swaggerDoc = require("./swaggerDoc");

//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

///Database
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true); // use for index  warning
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Could NOT connect to database: ", err);
    } else {
      console.log("Connected to datbase");
    }
  }
);

/* Its acts like logger */
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());
swaggerDoc(app);

/* Setting ups headers */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST PATCH, DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Wel Come To RestApi",
  });
});

app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);
app.use("/customers", customerRoutes);

/* Handling Error */
app.use((req, res, next) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on:" + `${port}`);
});
