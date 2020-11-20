const DB = require('../models');
const token = require('../utils/token');
const hash = require('../utils/passwordHash');

exports.login_an_admin = async (req, res) => {
    const { email, password } = req.body;

    let admin_record = await DB.Admin.findOne({ email });
    if (!admin_record) return {
        status: false,
        message: 'Invalid User details'
    };

    const check_password = await hash.verifyPassword(password, admin_record.password);
    if (!check_password) return {
        status: false,
        message: 'Invalid User details'
    };

    //Get Login Token for Authentication
    const loginToken = token.generateToken(admin_record._id);

    return {
        status: true,
        message: 'Login Successful',
        data: { 
            token: loginToken,
            user_type: 'admin'
        }
    };
};