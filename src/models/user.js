const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema Object for the Admins
const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        full_name: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        user_type: {
            type: String,
            default: 'user',
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);