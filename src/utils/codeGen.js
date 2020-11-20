const DB = require("../models");

/**
 * Generates a unique user_id 
 * @param {string} prefix letter to be added to the number generated
 * @param {number} size length of the number to be generated
 * @returns {string} user id
 */
exports.checkCodeGen = async (prefix, size) => {
    let user_id = codeGen(prefix, size)
    let check_user_id = await DB.User.findOne({ user_id });
    if (check_user_id) {
        while (check_user_id) {
            check_user_id = {};
            user_id = codeGen(prefix, size);

            check_user_id = await DB.User.findOne({ user_id });
        }
    }
    return user_id
};

/**
 * Generates a user_id. 
 * @param {string} prefix letter(s) to be added to the number generated
 * @param {number} size length of the number to be generated
 * @returns {string} user_id
 */
const codeGen = (prefix, size) => {
    const multiplyingValue = add9ToAStringBy(size);
    let user_id = Math.floor(Math.random() * multiplyingValue);

    while (user_id.toString().length < size) {
        user_id = '0' + user_id;
    }
    return `${prefix}${user_id}`;
};


const add9ToAStringBy = (size) => {
    let num = '';
    while (num.length < size) {
        num += '9'
    }
    return Number(num);
};