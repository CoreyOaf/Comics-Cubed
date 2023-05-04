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
    defaultLayout: 'dashboardlay',
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
    destination: (req, file, cb) => {
        cb(null, "./public/comic_covers")
    },

    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname)
    },
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
         .getNewsletter()
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
app.get("/Marketplace", (req,res) =>{
    data
    .getAllComicBooks()
    .then((data) =>{
        res.render(
            "marketplace",
            {layout: "marketplacelay", comicBooks: data}
            );
    })
    .catch((err) => {
        res.render("marketplace", {layout: "marketplacelay", message: err})
    })
    });
app.get("/Events", (req,res) =>{
    res.render("events", {layout: "eventslay"});
});
app.get("/AboutUs", (req,res) =>{
    res.render("aboutus", {layout: "aboutuslay"});
});


// //Are we keeping the cart? 
// app.get("/Cart", (req,res) =>{
//     res.render("cart", {layout: "cartlay"});
// });


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

// //If we get rid of cart we will also need to get rid of the next two. 
// app.get("/checkOrder", (req,res) =>{
//     res.render("checkOrder", {layout: "dashboardlay"});
// });
// app.get("/order", (req,res) =>{
//     res.render("order", {layout: "dashboardlay"});
// });





 

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
    if (req.query.idNum) {
        data
        .getComicByNum(req.query.idNum)
        .then((data) => {
            res.render(
                "comicBooks",
                data.length > 0 ? {comicBooks: data } : {message: "No results by ID Num"}
            );
        })
        .catch((err) => {
            res.render("comicBooks", { message: "no results" });
        });
     } else {
            data
            .getAllComicBooks()
            .then((data) => {
                res.render(
                    "comicBooks", 
                    data.length > 0 ? { comicBooks: data } : { message: "No Comic Books found" }
                );
            })
            .catch((err) => {
                res.render("comicBooks", { message: err });
            });
        }
    });
//res.render('handlebarName', {layout: 'main',data: variables});
//Get checkOrder.hbs for Owner... displays all orders
// app.get("/order", (req, res) => {
    
//     if (req.query.status) {
//          data.getAllOrders(req.query.status).then((data) => {
//              res.render("order", {order:data});
//          }).catch((err) => {
//              res.render      ("order",{ message: "no results" });
//          });
//         }
//  });
//GET Pages
app.get("/employees/add", (req,res) => { 
    data.getAllEmployees().then(
        (data) => {
            res.render("addEmployee", {layout: "dashboardlay", employees: data});
        }
    ).catch((err) => {
        res.render("addEmployee", {layout: "dashboardlay", employees: []});
    }) 
});
app.get("/InventoryEntry", (req,res) => {
    data.getAllComicBooks().then((data)  =>{
        res.render("addComicBook", {comicBooks: data});
    }).catch((err) => {
        //set department list to empty array
            res.render("addComicBook", {comicBooks: []});
    });
});


app.get("/comicBooks/:idNum", (req, res) => {
    data
    .deleteComicByNum(req.params.idNum)
    .then(() => {
        res.redirect("/comicBooks");
    })
    .catch((err) => {
        res.render("comicBooks", {message: "no results"})
    });
});

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


  app.post("/comicBooks/add", upload.single("comicCover"), async(req, res) => {
    data
    .addComicBook(req.body)
    .then(()=>{
      res.redirect("/comicBooks"); 
    })
    .catch((err) => {
        res.status(500).send("Unable to Add the Comic Book");
    });
});

app.get("/dashboard/:idNum", (req, res) => {
    data
    .deleteComicByNum(req.params.idNum)
    .then(() => {
        res.redirect("/Dashboard");
    })
    .catch((err) => {
        res.render("dashboard", {message: "no results"})
    });
});

app.get("/employees/:employeeNum", (req, res) => {
    data
    .deleteEmployeeByNum(req.params.employeeNum)
    .then(() => {
        res.redirect("/Employees");
    })
    .catch((err) => {
        res.render("employees", {message: "no results"})
    });
});






//////////////Newsletter//////////////////////

//Produces update newspage 
app.get("/UpdateNews", (req,res) =>{
    res.render("updateNews", {layout: "updateNewslay"});
});

app.post("/updateNews/add", (req, res) => {
    data.deleteNewsletter().then(()=>{
    data
    .addNewsletter(req.body)
    .then(()=>{
      res.redirect("/Newsletter"); 
    })
    })
    .catch((err) => {
        res.status(500).send("Unable to Add the Newsletter");
    });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });
  
app.listen(HTTP_PORT, onHttpStart);