const DB = require('../models');
const token = require('../utils/token');
const hash = require('../utils/passwordHash');
const codeGenerator = require('../utils/codeGen');
const { uuid } = require('uuidv4');

exports.create_a_user = async (req, res) => {
    const { email, phone_number, full_name } = req.body;

    const check_record = await DB.User.findOne({ email });
    if (check_record) return {
        status: false,
        message: `This Record, using this email: ${email}, already exists`
    };

    //Generate the User Login Details
    let user_id = await codeGenerator.checkCodeGen('MPS-', 5);
    let password = uuid().slice(0, 8);

    //Hash the password
    const hashedPassword = await hash.generateHash(password);

    await DB.User.create({
        password: hashedPassword,
        email,
        full_name,
        phone_number,
        user_id
    });

    return {
        status: true,
        message: 'User Record Registered Successfully. These are your account details',
        data: { user_id, password }
    };
};
exports.login_a_user = async (req, res) => {
    const { user_id, password } = req.body;

    let user_record = await DB.User.findOne({ user_id });
    if (!user_record) return {
        status: false,
        message: 'Invalid User details'
    };

    const check_password = await hash.verifyPassword(password, user_record.password);
    if (!check_password) return {
        status: false,
        message: 'Invalid User details'
    };

    //Get Login Token for Authentication
    const loginToken = token.generateToken(user_record._id);

    return {
        status: true,
        message: 'Login Successful',
        data: { 
            token: loginToken, 
            user_type: 'user' 
        }
    };
};