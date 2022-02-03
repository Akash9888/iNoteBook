const mongoose = require("mongoose");
const mongodbUrl =
    "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongodbUrl, () => {
        console.log("connect to mongodb successfuly");
    });
};
module.exports = connectToMongo;
