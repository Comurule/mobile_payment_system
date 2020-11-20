const mongoose = require('mongoose');

exports.connectToDB = ()=> {
    const databaseUrl = process.env.MPS_DATABASE_URL;
    const defaultOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    };
    return mongoose.connect(databaseUrl, defaultOptions);    
};