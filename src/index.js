const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const chalk = require('chalk');

const routes = require('./routes');
const db = require('./db');
const seedAdministrator = require('./seedAdministrator');

//Add the details in the .env file to the Environmental Variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

//Application Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

//Database Sync
db.connectToDB()
    .then(() => { 
        console.log('Database Connection Established.'); 

        //Check the DB if administrator is seeded OR register one if not.
        seedAdministrator();
    })
    .catch(error => { console.log(error) })


//App listens
app.listen(port, () => { 
    //Make the Devops aware of a possible Administrator registration
    const log = `${chalk.yellow('[?]')} ${chalk.green('Checking if Administrator is seeded...')}`;

    console.log(`Listening on PORT: ${port}`);
    console.log(log);

});