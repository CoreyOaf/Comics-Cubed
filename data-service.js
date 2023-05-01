var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//connect to Shawns MongoDb Atlas Database
mongoose.connect("mongodb+srv://oafc:EweXWr2PQE14m3uK@databasepractice.e3uyu0n.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const fs = require("fs");

let employees = [];
let comicBooks = [];
let orders = [];

module.exports.initialize = function () {
    return new Promise( (resolve, reject) => {
        fs.readFile('./data/employees.json', (err, data) => {
            if (err) {
                reject(err); return;
            }

            employees = JSON.parse(data);
        });
        fs.readFile('./data/comicBooks.json', (err, data) => {
            if (err) {
                reject(err); return;
             }
            comicBooks = JSON.parse(data);
            resolve();
        });
        fs.readFile('./data/orders.json', (err, data) => {
            if (err) {
                reject(err); return;
             }
            orders = JSON.parse(data);
            resolve();
        });  
        
    });
}

//Define Employee Schema
var employeeSchema = new Schema({
    employeeNum: Number,
    firstName: String,
    lastName: String,
    email: String,
    addressStreet: String,
    addressCity: String,
    addressState: String,
    addressPostal: String,
    isManager: Boolean,
    employeeManagerNum: Number,
    hireDate: String,
});

//Define Comic Book Schema
var comicBookSchema = new Schema({
    comicCover: String,
    title: String,
    universe: String,
    year: Number,
    description: String,
    price: Number,
    quantity: Number,
});

//Define Order Schema
var orderSchema = new Schema({
    orderNum: Number,
    orderDate: String,
    customerName: String,
    customerEmail: Number,
    customerPhone: String,
    orderTitles: String,
    finalCost: Number,
    status: String,
});

//Define Employee Schema
var newsletterSchema = new Schema({
    newsDate: String,
    newsDescription: String,
    
});

var Employee = mongoose.model('employees', employeeSchema);
    //create a new Employee
    var PeterParker = new Employee({
        employeeNum: 1,
        firstName: "Peter",
        lastName: "Parker",
        email: "peterparker@mcu.com",
        SSN: "123-12-1234",
        addressStreet: "1234 Marvel Ave",
        addressCity: "New York City",
        addressState: "New York",
        addressPostal: "10001",
        maritalStatus: "Single",
        isManager: false,
        employeeManagerNum: 1,
        status: "Full Time",
        hireDate: "April 11, 2023",
    });

var ComicBook = mongoose.model('comicBooks', comicBookSchema);
//create a new Comic Book
var AmazingSpiderman = new ComicBook({
    comicCover: "./images/amazingspiderman.jpeg",
    title: "Amazing Fantasy #15",
    universe: "Marvel",
    year: 1962,
    description: "The First Appearance of the Amazing Spider-Man! " + 
    "When young Peter Parker gains remarkable abilities from a radioactive spider, " +
    "he must step up and try to become a hero — while also dealing with the fantastic " + 
    "pressures of an everyday teenager! For with great power, there must also come great responsibility!",
    price: 4.95,
    quantity: 3,
});

var Order = mongoose.model('customerOrders', orderSchema);
//Create test order
var testOrder = new Order({ 
    orderNum: Math.random(),
    orderDate: "4/19/2023",
    customerName: "Mary Jane",
    customerEmail: "maryJane@gmail.com",
    customerPhone: (765)-398-2263,
    orderTitles: "Title1,Title2",
    finalCost: 20.22,
    status: "false",
});

var Newsletter = mongoose.model('newsletter', newsletterSchema);
    //create test newletter
    var aprilNews = new news({
        newsDate: "4/29/2023",
        newsDescription: "We are having discount sells on all Batman comics this week."
        
    });

  




//get all orders 
module.exports.getAllOrders = function(){
    return new Promise((resolve,reject)=>{
        if (orders.length == 0) {
            reject("query returned 0 results"); return;
        }
        resolve(orders);
    })
}

// add orders to database? 
//This needs revisited
module.exports.addOrder = function (orderData) {
    return new Promise(function (resolve, reject) {
        orderData.status = (orderData.status) ? true : false;
        //Find a way to 
        orderData.orderNum = Math.random() * (100000 - 1000) + 1000;
        order.push(orderData);

        resolve();
    });

};

//Update order as picked up and delete from data base? 
//This needs revisited
module.exports.updateOrder = function (orderData) {

    orderData.status = (orderData.status) ? true : false;

    return new Promise(function (resolve, reject) {
        for(let i=0; i < orders.length; i++){
            if(orders[i].orderNum == orderdata.orderNum){
                orders[i] = orderData;
            }
        }
        resolve();
    });
};


//Needs delete order function - also the deleteOrder needs to be implemented in the udpateOrder? 