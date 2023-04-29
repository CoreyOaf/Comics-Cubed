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
    idNum: Number,
    comicCover: String,
    comicbookTitle: String,
    comicbookUniverse: String,
    comicbookYear: Number,
    comicbookDescription: String,
    comicbookPrice: Number,
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
    idNum: 1,
    comicCover: "./images/amazingspiderman.jpeg",
    comicbookTitle: "Amazing Fantasy #15",
    comicbookUniverse: "Marvel",
    comicbookYear: 1962,
    comicbookDescription: "The First Appearance of the Amazing Spider-Man! " + 
    "When young Peter Parker gains remarkable abilities from a radioactive spider, " +
    "he must step up and try to become a hero — while also dealing with the fantastic " + 
    "pressures of an everyday teenager! For with great power, there must also come great responsibility!",
    comicbookPrice: 4.95,
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
module.exports.getAllEmployees = function(){
    return new Promise(function (resolve, reject){
        Employee.find({})
        .exec()
        .then(function (data){
            console.log(data + "findData");
            data = data.map((value) => value.toObject());
            resolve(data);
    }).catch((err) => {
        reject("Query returned 0 results"); return;
    });
});
}

module.exports.getAllComicBooks = function(){
    return new Promise(function (resolve, reject){
        ComicBook.find({})
    //     .exec()
    //     .then(function (data){
    //         console.log(data + "findData");
    //         data = data.map((value) => value.toObject());
    //         resolve(data);
    // }).catch((err) => {
        reject("Query returned 0 results"); return;
    });
});
}
// return new Promise((resolve,reject)=>{
//     if (comicBooks.length == 0) {
//         reject("query returned 0 results"); return;
//     }
//     resolve(comicBooks);
// })
// }
  




//get all orders 
module.exports.getAllOrders = function(){
    return new Promise((resolve,reject)=>{
        if (orders.length == 0) {
            reject("query returned 0 results"); return;
        }
        resolve(orders);
    })
}

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject){
      employeeData.employeeNum = Math.floor(Math.random() * 10000);
      console.log(employeeData);
      employeeData.isManager = (employeeData.isManager) ? true : false;
    for (var prop in employeeData) {
        if(employeeData[prop] == '')
            employeeData[prop] = null;
    }
    
    Employee.create(employeeData).then(() => {
        resolve();
    }).catch((err) =>{
        reject("Unable to create employee"); return;
        });  
    });

};

module.exports.addcomicBook = function (comicBookData) {
    return new Promise(function (resolve, reject){
      comicBookData.idNum = Math.floor(Math.random() * 10000);
      console.log(comicBookData);
    for (var prop in comicBookData) {
        if(comicBookData[prop] == '')
            comicBookData[prop] = null;
    }
    
    ComicBook.create(comicBookData).then(() => {
        resolve();
    }).catch((err) =>{
        reject("Unable to create comic book"); return;
        });  
    });

};
// add orders to database? 
//This needs revisited
module.exports.addOrder = function (orderData) {
    return new Promise(function (resolve, reject){
      orderData.orderNum = Math.floor(Math.random() * 10000);
      console.log(orderData);
    for (var prop in orderData) {
        if(orderData[prop] == '')
            orderData[prop] = null;
    }
    
    Order.create(orderData).then(() => {
        resolve();
    }).catch((err) =>{
        reject("Unable to create order"); return;
        });  
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