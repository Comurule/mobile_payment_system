const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema Object for Offers
const offerSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String
        },
        vendor: {
            type: Schema.Types.ObjectId,
            ref: 'Vendor'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Offer', offerSchema);