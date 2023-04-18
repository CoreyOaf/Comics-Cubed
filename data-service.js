var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//connect to Shawns MongoDb Atlas Database
//mongoose.connect();

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
    imageFilePath: String,
    title: String,
    universe: String,
    year: String,
    description: String,
    price: Number,
    quantity: Number,
});
