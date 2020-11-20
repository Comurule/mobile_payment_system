const DB = require('../models');

const projection = { _id: 1, topic: 1, message: 1, type: 1, user: 1 };
const userProjection = { path: 'user', select: 'full_name' };

exports.create_a_report = async (req, res) => {
    const { topic, message, type } = req.body;

    //Set the user field if req.user exists
    let user = req.user ? req.user._id : undefined;

    await DB.Report.create({ topic, message, type, user });

    return {
        status: true,
        message: 'Registered Successfully'
    };
};

exports.get_all_reports = async (req, res) => {
    const { status, type } = req.query;

    //Set DB query according to the provided fields in the req.query
    let query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const all_report_records = await DB.Report.find(query, projection).populate(userProjection);

    return {
        status: true,
        message: 'All Requested Records',
        data: all_report_records
    };
};