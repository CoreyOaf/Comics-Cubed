const mongoose = require("mongoose");
//const GridFsStorage = require('gridfs-stream');
const multer = require("multer");
var Schema = mongoose.Schema;
//connect to Shawns MongoDb Atlas Database
mongoose.connect("mongodb+srv://hahawort:b9UbScwQpgyIzthD@brumfielcluster.osrajis.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true });

const fs = require("fs");

/* configure multer for file uploads
const storage = new GridFsStorage({
    db:
      "mongodb+srv://oafc:EweXWr2PQE14m3uK@databasepractice.e3uyu0n.mongodb.net/test?retryWrites=true&w=majority",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return {
        filename: file.originalname,
        bucketName: "comicCovers",
      };
    },
  });


*/
//Empty starter arrays 
let comicBooks = [];
let newsletters = []; 
let employees = [];

let currentNewsDate = "";
let currentNewsDesc = "";

//Define Comic Book Schema
var comicBookSchema = new Schema({
    idNum: Number,
    comicCover: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comicCovers.files",
      },
    comicbookTitle: String,
    comicbookUniverse: String,
    comicbookYear: Number,
    comicbookDescription: String,
    comicbookPrice: Number,
    quantity: Number,
});

//Define Newsletter Schema
var newsletterSchema = new Schema({
    newsNum: Number,
    newsDate: String,
    newsDesc: String,
});

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

var ComicBook = mongoose.model('comicBooks', comicBookSchema);
var Newsletter = mongoose.model('newsletters', newsletterSchema);
var Employee = mongoose.model('employees', employeeSchema);



//////////////ComicBook Functions////////////////////////

//Save the comic book 

module.exports.addComicBook = function (comicBookData) {
    return new Promise(function (resolve, reject){
      comicBookData.idNum = Math.floor(Math.random() * 10000);
      console.log(comicBookData);
    // for (var prop in comicBookData) {
    //     if(comicBookData[prop] == '')
    //         comicBookData[prop] = null;
    // }
    
    ComicBook.create(comicBookData).then(() => {
        resolve();
    }).catch((err) =>{
        reject("Unable to create comic book"); return;
        });  
    });

};

//Display the comic book
module.exports.getAllComicBooks = function(){
    return new Promise(function (resolve, reject){
        ComicBook.find({})
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


//Other comic book functions found? 
module.exports.getComicByNum = function (num) {
    return new Promise(function (resolve, reject){
        ComicBook.find({
            idNum: num
        })
        .exec()
        .then(function (data){
            data = data.map((value) => value.toObject());
            resolve(data[0]);
        }).catch(() => {
            reject("Query returned 0 results"); return;
        });
    });
};

module.exports.updateComicBook = function (comicBookData) {
    return new Promise(function (resolve, reject){

        for (var prop in comicBookData) {
            if (comicBookData[prop] == '')
                comicBookData[prop] = null;
        }
            ComicBook.updateOne({
                idNum: comicBookData.idNum 
    }).exec()
    .then(() => {
        resolve();
    }).catch((e) => {
        reject("Unable to update comic book"); return;
    });
});
};

module.exports.deleteComicByNum = function (comicNum) {
    return new Promise(function (resolve, reject){
        ComicBook.deleteOne({
                idNum: comicNum
        })
        .exec()
        .then(function () {
            resolve("Comic deleted successfully");
        }).catch((err) => {
            reject("Unable to delete comic"); return;
        });
    });
};


//////////////////////////////////////////////////////////////





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

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject){
        Employee.find({
            employeeNum: num
        })
        .exec()
        .then(function (data){
            data = data.map((value) => value.toObject());
            resolve(data[0]);
        }).catch(() => {
            reject("Query returned 0 results"); return;
        });
    });
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject){
        Employee.find({
            status: status
    })
    .exec()
    .then(function (data){
        data = data.map((value) => value.toObject());
        resolve(data);
    }).catch(() => {
        reject("Query returned 0 results"); return;
    });
});
};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject){
        Employee.find({
            employeeManagerNum: manager
            
        })
        .exec()
        .then(function (data) {
            data = data.map((value) => value.toObject());
            resolve(data);
        }).catch(() => {
            reject("Query returned 0 results"); return;
        });
    });
};

module.exports.getAllEmployees = function (manager) {
    return new Promise(function (resolve, reject){
        Employee.find()
        .exec()
        .then(function (data) {
            data = data.map((value) => value.toObject());
            resolve(data);
        }).catch(() => {
            reject("Query returned 0 results"); return;
        });
    });
};

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject){
        reject();
    });
};

module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject){
        
        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if (employeeData[prop] == '')
                employeeData[prop] = null;
        }
            Employee.updateOne({
                employeeNum: employeeData.employeeNum 
    }).exec()
    .then(() => {
        resolve();
    }).catch((e) => {
        reject("Unable to update employee"); return;
    });
});
};

module.exports.deleteEmployeeByNum = function (empNum) {
    return new Promise(function (resolve, reject){
        Employee.deleteOne({
                employeeNum: empNum
        })
        .exec()
        .then(function () {
            resolve("Department deleted successfully");
        }).catch((err) => {
            reject("Unable to delete employee"); return;
        });
    });
};





//creating and adding Newsletters
module.exports.addNewsletter = function (newsletterData) {
    //deleteNewsletter();
    return new Promise(function (resolve, reject){
      newsletterData.newsNum = Math.floor(Math.random() * 10000);
    //   newsletterData.newsDate = ;
    //   newsletterData.newsDesc = ;
      console.log(newsletterData);

      
    Newsletter.create(newsletterData).then(() => {
        resolve();
    }).catch((err) =>{
        reject("Unable to create newsletter"); return;
        });  
    });

};

module.exports.deleteNewsletter = function () {
    return new Promise(function (resolve, reject){
        Newsletter.deleteMany({})
        .exec()
        .then(function () {
            resolve("Newsletter deleted successfully");
        }).catch((err) => {
            reject("Unable to delete newsletter"); return;
        });
    });
};
    
module.exports.getNewsletter = function(){
    return new Promise(function (resolve, reject){
        Newsletter.find({})
        .exec()
        .then(function (data){
            data = data.map((value) => value.toObject());
            resolve(data[0]);
        }).catch(() => {
            reject("Query returned 0 results"); return;
        });
    });
};



//////////////Future Potential Order Page Code: //////////////////////

//let orders = [];

// //Define Order Schema
// var orderSchema = new Schema({
//     orderNum: Number,
//     orderDate: String,
//     customerName: String,
//     customerEmail: Number,
//     customerPhone: String,
//     orderTitles: String,
//     finalCost: Number,
//     status: String,
// });


//var Order = mongoose.model('customerOrders', orderSchema);

// module.exports.updateOrder = function (orderData) {

//     orderData.status = (orderData.status) ? true : false;

//     return new Promise(function (resolve, reject) {
//         for(let i=0; i < orders.length; i++){
//             if(orders[i].orderNum == orderdata.orderNum){
//                 orders[i] = orderData;
//             }
//         }
//         resolve();
//     });
// };

// module.exports.addOrder = function (orderData) {
//     return new Promise(function (resolve, reject){
//       orderData.orderNum = Math.floor(Math.random() * 10000);
//       console.log(orderData);
//     for (var prop in orderData) {
//         if(orderData[prop] == '')
//             orderData[prop] = null;
//     }
    
//     Order.create(orderData).then(() => {
//         resolve();
//     }).catch((err) =>{
//         reject("Unable to create order"); return;
//         });  
//     });

// };

// //get all orders 
// module.exports.getAllOrders = function(){
//     return new Promise((resolve,reject)=>{
//         if (orders.length == 0) {
//             reject("query returned 0 results"); return;
//         }
//         resolve(orders);
//     })
// }