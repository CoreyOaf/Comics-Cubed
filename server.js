const express = require("express");
const path =require("path");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "html/Home.html"));

});
app.get("/Marketplace", (req,res) =>{
    res.sendFile(path.join(__dirname,"html/marketplace.html"));
});
app.get("#", (req,res) =>{
    res.sendFile(path.join(__dirname,"public", "newsletter.html"));
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
app.listen(HTTP_PORT, onHttpStart);