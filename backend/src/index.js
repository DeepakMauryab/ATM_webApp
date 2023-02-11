const express = require("express");
const app = express();
const Port = process.env.PORT || 5000;

const cookieParser= require("cookie-parser");

app.use(cookieParser());

// require and use of dotenv file in my app
 require('dotenv').config();

// database connection
require("./database/connect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use router for requests
const router = require("./router/route");
app.use(router);

app.listen(Port, () => {
    console.log(`connected at ${Port}`);
})