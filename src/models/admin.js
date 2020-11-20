const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema Object for the Admins
const adminSchema = new Schema(
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
        user_type: {
            type: String,
            default: 'admin',
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);