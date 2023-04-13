const express = require("express");
const path =require("path");
const data = require("./data-service.js");
const bodyParser = require('body-parser');
const fs = require("fs");
const multer = require("multer");
const exphbs = require('express-handlebars');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "html/Home.html"));
});
app.get("/Home", (req,res) =>{
    res.sendFile(path.join(__dirname, "html/Home.html"));
});
app.get("/Marketplace", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/marketplace.html"));
});
app.get("/Newsletter", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/newsletter.html"));
});
app.get("/Events", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/events.html"));
});
app.get("/AboutUs", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/aboutus.html"));
});
app.get("/Cart", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/cart.html"));
});
app.get("/CoMiCs_CuBeD_LoGiN_PaGe", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/login.html"));
});
app.get("/CoMiCs_CuBeD_InVeNtoRy_PaGe", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/inventory.html"));
});
app.get("/CoMiCs_CuBeD_Update_News_PaGe", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/updateNews.html"));
});
app.get("/Dashboard", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/dashboard.html"));
});
app.listen(HTTP_PORT, onHttpStart);