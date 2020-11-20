const DB = require('../models');
const token = require("../utils/token");

exports.check_authorized_admin = async (req, res, next) => {
    const auth_key = req.headers.authorization;
    try {
        if (!auth_key || !(auth_key.length)) throw new Error();

        const tokenString = auth_key.replace('Bearer ', '');

        const data = token.checkToken(tokenString);
        if (!data) throw new Error();
        
        const projection = {
            _id: 1,
            email: 1,
            user_type: 1
        };
        const admin = await DB.Admin.findById(data._id, projection)
        if (!admin) throw new Error();

        req.user = admin;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            status: false,
            message: 'Not authorized to access this route'
        })
    }
};

exports.check_authorized_user = async (req, res, next) => {
    const auth_key = req.headers.authorization;
    try {
        if (!auth_key || !(auth_key.length)) throw new Error();

        const tokenString = auth_key.replace('Bearer ', '');

        const data = token.checkToken(tokenString);
        if (!data) throw new Error();

        const user = await DB.User.findById(data._id)
        if (!user) throw new Error();

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            status: false,
            message: 'Not authorized to access this route'
        })
    }
};