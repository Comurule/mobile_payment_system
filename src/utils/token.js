const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config();

//Set Global Variables
const secret_key = `${process.env.MPS_JWT_SECRET_KEY}`;
const expiresIn = `${process.env.MPS_JWT_EXPIRY_PERIOD}`;

exports.generateToken = id => jwt.sign({ _id: id }, secret_key, { expiresIn });

exports.checkToken = token => jwt.verify(token, secret_key);