if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');

const indexRouter = require("./routes/index");

const error404Router = require('./routes/error404');

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.set("layout extractMetas", true);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({ limit: '10mb', extended: false }));
/*
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));
*/

app.use("/", indexRouter);

app.use(error404Router);

app.listen(process.env.PORT || 3000);