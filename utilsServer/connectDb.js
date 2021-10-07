const mongoose = require("mongoose");

 const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log("Mongodb connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDb;

/*
to connect db to encoding.js you need to add
const { TextEncoder, TextDecoder } = require("util");

*/
