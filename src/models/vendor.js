const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema Object for Vendors
const vendorSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String
        },
        offers: [{
            type: Schema.Types.ObjectId,
            ref: 'Offer'
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Vendor', vendorSchema);