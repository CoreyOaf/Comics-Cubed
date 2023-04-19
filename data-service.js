var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//connect to Shawns MongoDb Atlas Database
mongoose.connect("mongodb+srv://oafc:EweXWr2PQE14m3uK@databasepractice.e3uyu0n.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

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