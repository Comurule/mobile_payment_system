const DB = require('../models');

const projection = { _id: 1, title: 1, description: 1 };

exports.create_a_vendor = async (req, res) => {
    const { title, description } = req.body;

    const title_regex = new RegExp(title, 'i');
    const check_record = await DB.Vendor.findOne({ title: title_regex });
    if (check_record) return {
        status: false,
        message: 'This Record exists'
    };

    await DB.Vendor.create({ title, description });

    return {
        status: true,
        message: 'Registered Successfully'
    };
};

exports.update_a_vendor = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;

    let vendor_record = await DB.Vendor.findOne({ _id: id });
    if (!vendor_record) return {
        status: false,
        message: 'Invalid ID details'
    };

    //Update the Vendor Document if the fields are provided
    if (title) {
        //Confirm that there is no duplicate in the database before updating 
        const title_regex = new RegExp(title, 'i');
        const check_record = await DB.Vendor.findOne({ title: title_regex });
        if (check_record && check_record._id != id) return {
            status: false,
            message: `This Record with title:${title} already exists `
        };

        vendor_record.title = title;
    }
    if (description) vendor_record.description = description;

    await vendor_record.save();

    return {
        status: true,
        message: 'Vendor Record Updated'
    };
};

exports.get_all_vendors = async (req, res) => {

    const all_vendor_records = await DB.Vendor.find({}, projection);

    return {
        status: true,
        message: 'All Records',
        data: all_vendor_records
    };
}