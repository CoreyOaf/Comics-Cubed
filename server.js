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
    defaultLayout: "main",
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


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}
//Main pages
app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "views/Home.html"));
});
app.get("/Home", (req,res) =>{
    res.sendFile(path.join(__dirname, "views/Home.html"));
});
app.get("/Marketplace", (req,res) =>{
    res.sendFile(path.join(__dirname,"views/marketplace.html"));
});
app.get("/Newsletter", (req,res) =>{
    res.sendFile(path.join(__dirname,"views/newsletter.hbs"));
});
app.get("/Events", (req,res) =>{
    res.sendFile(path.join(__dirname,"views/events.html"));
});
app.get("/AboutUs", (req,res) =>{
    res.sendFile(path.join(__dirname,"views/aboutus.html"));
});
app.get("/Cart", (req,res) =>{
    res.sendFile(path.join(__dirname,"views/cart.html"));
});
app.get("/CoMiCs_CuBeD_LoGiN_PaGe", (req,res) =>{
    res.sendFile(path.join(__dirname,"views/login.html"));
});
app.get("/CoMiCs_CuBeD_InVeNtoRy_PaGe", (req,res) =>{
    res.sendFile(path.join(__dirname,"views/inventory.html"));
});
app.get("/CoMiCs_CuBeD_Update_News_PaGe", (req,res) =>{
    res.sendFile(path.join(__dirname,"views/updateNews.html"));
});
app.get("/Dashboard", (req,res) =>{
    res.sendFile(path.join(__dirname,"views/dashboard.html"));
});
app.get("/employees", (req, res) => {
    if (req.query.status) {
         data
         .getEmployeesByStatus(req.query.status)
         .then((data) => {
             res.render(
                 "employees",
                 data.length > 0 ? { employees: data } : {message: "No results by status"}
             );
         })
         .catch((err) => {
             res.render("employees", { message: "no results" });
         });
     } else if (req.query.department) {
         data
         .getEmployeesByDepartment(req.query.department)
         .then((data) => {
             res.render("employees", 
             data.length > 0 ? { employees: data } : { message: "No results by department" }
             );
         })
         .catch((err) => {
             res.render("employees", {message: "no results"});
         });
     } else if (req.query.manager) {
         data
         .getEmployeesByManager(req.query.manager)
         .then((data) => {
             res.render(
                 "employees",
                 data.length > 0 ? { employees: data } : { message: "No results by manager" }
             );
         })
         .catch((err) => {
             res.render("employees", { message: "no results" });
         });
     } else {
         data
         .getAllEmployees()
         .then((data) => {
             res.render(
                 "employees", 
                 data.length > 0 ? { employees: data } : { message: "No Employees found" }
             );
         })
         .catch((err) => {
             res.render("employees", { message: err });
         });
     }
 });
 app.get("/comicBooks", (req,res) => {
    data
    .getComicBooks()
    .then((data)=>{
        res.render(
            "comicBooks",
            data.length > 0 ? {comicBooks: data} : {message: "No Comic Books Found"}
            );
         })
    .catch((err) => {
        res.render("comicBooks",{ message: "Error finding Comic Books" });
    });
});


//Get checkOrder.hbs for Owner... displays all orders
app.get("/checkOrder", (req, res) => {
    
    if (req.query.status) {
         data.getAllOrders(req.query.status).then((data) => {
             res.render("order", {order:data});
         }).catch((err) => {
             res.render("order",{ message: "no results" });
         });
        }
 });
//GET Pages
app.get("/employees/add", (req,res) => { 
    data.getDepartments().then(
        (data) => {
            res.render("addEmployee", {departments: data});
        }
    ).catch((err) => {
        res.render("addEmployee", {departments: []});
    }) 
});
app.get("/comicBooks/add", (req,res) => {
    data.getComicBooks().then((data)  =>{
        res.render("addComicBooks", {comicBooks: data});
    }).catch((err) => {
        //set department list to empty array
            res.render("addComicBooks", {comicBooks: [] });
    });
});

//POST Pages
app.post("/employees/add", (req, res) => {
    data
    .addEmployee(req.body)
    .then(()=>{
      res.redirect("/employees"); 
    })
    .catch((err) => {
        res.status(500).send("Unable to Add the Employee");
    });
  });
  app.post("/comicBooks/add", upload.single("comicCover"), (req, res) => {
    let comicBook = {
        "comicCover": "",
        "title": req.body.title,
        "universe": req.body.universe,
        "year": parseInt(req.body.year),
        "description": req.body.description,
        "price": parseFloat(req.body.price),
        "quantity": parseInt(req.body.quantity),
    };
    if (req.file) {
        comicBook.comicCover = req.file.amazingspiderman.jpeg;
    }
    else if (req.body.title) {
        comicBook.title = req.body.title;
    }
    else if (req.body.universe) {
        comicBook.universe = req.body.universe;
    }
    else if (req.body.year) {
        comicBook.year = parseInt(req.body.year);
    }
    else if (req.body.description) {
        comicBook.description = req.body.description;
    }
    else if (req.body.price) {
        comicBook.price = parseFloat(req.body.price);
    } 
    else if (req.body.quantity) {
        comicBook.quantity = parseInt(req.body.quantity);
    }
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });
  
app.listen(HTTP_PORT, onHttpStart);