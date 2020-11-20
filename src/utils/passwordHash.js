const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')

dotenv.config();

//Set Global Variables
const salt = Number(process.env.MPS_PASSWORD_SALT);

exports.generateHash = password => bcrypt.hash(password, salt);

exports.verifyPassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);