const express = require("express");
const path =require("path");
const data = require("./data-service.js");
const bodyParser = require('body-parser');
const fs = require("fs");
const multer = require("multer");
const exphbs = require('express-handlebars');
const app = express();

app.use(express.static('public'));

const HTTP_PORT = process.env.PORT || 8080;

app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs',
    defaultLayout: "dashboardlay",
    helpers: { 
        navLink: function(url, options){
            return '<li' + 
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
                '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    } 
}));

app.set('view engine', '.hbs');

// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
      // we write the filename as the current date down to the millisecond
      // in a large web service this would possibly cause a problem if two people
      // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
      // this is a simple example.
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // tell multer to use the diskStorage function for naming files instead of the default.
  const upload = multer({ storage: storage });


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

/////////////////////Main pages////////////////////

app.get("/", (req,res) =>{
    res.render("home", {layout: "homelay"});;
});

app.get("/Newsletter", (req,res) =>{
        data
         .getAllComicBooks()
         .then((data) => {
             res.render(
                 "newsletter", 
                 {layout: "newsletterlay", newsletters: data}
             );
         })
         .catch((err) => {
             res.render("newsletter", {layout: "newsletterlay",  message: err });
         });
});


app.get("/Events", (req,res) =>{
    res.render("events", {layout: "eventslay"});
});
app.get("/AboutUs", (req,res) =>{
    res.render("aboutus", {layout: "aboutuslay"});
});


//Are we keeping the cart? 
app.get("/Cart", (req,res) =>{
    res.render("cart", {layout: "cartlay"});
});


//Where is this? 
app.get("/InventoryEntry", (req,res) =>{
    res.render("addComicBook", {layout: "dashboardlay"});
});

app.get("/UpdateNews", (req,res) =>{
    res.render("updateNews", {layout: "updateNewslay"});
});
app.get("/Dashboard", (req,res) =>{
    data
         .getAllComicBooks()
         .then((data) => {
             res.render(
                 "dashboard", 
                 {layout: "dashboardlay", comicBooks: data}
             );
         })
         .catch((err) => {
             res.render("dashboard", {layout: "dashboardlay",  message: err });
         });
});

//If we get rid of cart we will also need to get rid of the next two. 
app.get("/checkOrder", (req,res) =>{
    res.render("checkOrder", {layout: "dashboardlay"});
});
app.get("/order", (req,res) =>{
    res.render("order", {layout: "dashboardlay"});
});





 

//////////////////Order///////////////////////////////////////


app.get("/order", (req, res) => {
    
    if (req.query.status) {
         data.getAllOrders(req.query.status).then((data) => {
             res.render("order", {order:data});
         }).catch((err) => {
             res.render("order",{ message: "no results" });
         });
        }
 });




//////////////////InventoryEntry(Adding Comic Books)///////////////////////



  app.post("/InventoryEntry", upload.single("comicCover"), (req, res) => {
    data
    .addComicBook(req.body)
    .then(()=>{
      res.redirect("/Dashboard"); 
    })
    .catch((err) => {
        res.status(500).send("Unable to Add the Comic Book");
    });
});

app.get("/dashboard/:idNum", (req, res) => {    
    data
    .deleteComicByNum(req.params.idNum).then((data) => {
      res.redirect("/Dashboard");
    }).catch((err) => {
        res.render("dashboard",{message:"no results"});
    });
});


///////////////MarketPlace/////////////////////////////

app.get("/MarketPlace", (req,res) =>{
    data
         .getAllComicBooks()
         .then((data) => {
             res.render(
                 "marketplace", 
                 {layout: "marketplacelay", comicBooks: data}
             );
         })
         .catch((err) => {
             res.render("marketplace", {layout: "marketplacelay",  message: err });
         });
});


app.post("/InventoryEntry/add", (req, res) => {
    data.addComicBook(req.body).then(()=>{
      //res.redirect("/Dashboard"); 
      res.redirect("/Dashboard"); 
    });
  });

  app.get("/InventoryEntry", (req,res) => {
    data.getAllComicBooks().then((data)=>{
        res.render("dashboard",{comicBooks:data});
    });
});



//////////////Newsletter//////////////////////

app.get("/updateNews", (req, res) => {
    data.getNewsletter(req.params.empNum).then((data) => {
        res.render("newsletter", {newsletters: data});
    }).catch((err) => {
        res.render("newsletter",{message:"no results"});
    });
});

//The route to populate the newsletter 
app.get("/newsletter", (req,res) => {
    data.getNewsletter().then((data)=>{
        res.render("newsletters",{newsletters:data});
    });
});

//the route to add the newest newsletter to the database 
app.post("/newsletters/add", (req, res) => {
    data.addNewsletter(req.body).then(()=>{
      res.redirect("/newsletter"); 
    });
  });


app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });
  
app.listen(HTTP_PORT, onHttpStart);