const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema Object for Reports
const reportSchema = new Schema(
    {
        topic: {
            type: String,
            required: true
        },
        message: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        type: {
            type: String,
            enum: ['customer', 'complaint'],
            default: 'customer',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'handled'],
            default: 'pending',
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);