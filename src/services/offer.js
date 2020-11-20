const DB = require('../models');

const projection = { _id: 1, title: 1, description: 1, vendor: 1 };
const vendorProjection = { path: 'vendor', select: 'title'}
exports.create_an_offer = async (req, res) => {
    const { title, description, vendor } = req.body;

    const title_regex = new RegExp(title, 'i');
    const check_record = await DB.Offer.findOne({ title: title_regex });
    if (check_record) return {
        status: false,
        message: 'This Record exists'
    };

    const offer_record = await DB.Offer.create({ title, description, vendor });

    //Add offer id to the Vendor record
    const vendor_record = await DB.Vendor.findById(vendor);
    if (!vendor_record) return {
        status: false,
        message: 'Invalid Vendor ID details'
    };

    vendor_record.offers.push(offer_record._id);
    
    await vendor_record.save();

    return {
        status: true,
        message: 'Registered Successfully'
    };
};

exports.update_an_offer = async (req, res) => {
    const { title, description, vendor } = req.body;
    const { id } = req.params;

    let offer_record = await DB.Offer.findOne({ _id: id });
    if (!offer_record) return {
        status: false,
        message: 'Invalid ID details'
    };

    //Update only if the vendor id is provided and it is not the same as in the record
    if (vendor && vendor != offer_record.vendor) {
        const vendors = await Promise.all([
            DB.Vendor.findById(offer_record.vendor),
            DB.Vendor.findById(vendor)
        ])
        if (!vendors[1]) return {
            status: false,
            message: 'Invalid Vendor ID details'
        };

        //Remove the offer id from the current vendor record and add it to the update record
        vendors[0].offers = vendors[0].offers.filter(offer_id => `${offer_id}` != `${offer_record._id}`);
        vendors[1].offers.push(offer_record._id);

        //save both updated vendors
        await Promise.all([vendors[0].save(), vendors[1].save()])

        //Update the Offer record
        offer_record.vendor = vendor;
    }

    //Update the Vendor Document if the fields are provided
    if (title) {
        //Confirm that there is no duplicate in the database before updating 
        const check_record = await DB.Offer.findOne({ title });
        if (check_record && check_record._id != id) return {
            status: false,
            message: `This Record with title:${title} already exists `
        };

        offer_record.title = title;
    }
    if (description) offer_record.description = description;

    await offer_record.save();

    return {
        status: true,
        message: 'Offer Record Updated'
    };
};

exports.get_all_offers = async (req, res) => {

    const all_offer_records = await DB.Offer.find({}, projection).populate(vendorProjection);

    return {
        status: true,
        message: 'All Records',
        data: all_offer_records
    };
};