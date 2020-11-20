const vendorServices = require('../services/vendor');
const offerServices = require('../services/offer');
const reportServices = require('../services/report');

exports.get_all_vendors = async (req, res) => {
    try {
        const response = await vendorServices.get_all_vendors(req, res);
        if (!response) throw new Error();

        return res.status(200).send(response);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: 'Something went wrong, contact the Administrator'
        })
    }

};

exports.get_all_offers = async (req, res) => {
    try {
        const response = await offerServices.get_all_offers(req, res);
        if (!response) throw new Error();

        return res.status(200).send(response);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: 'Something went wrong, contact the Administrator'
        })
    }

};

exports.register_a_complaint = async (req, res) => {
    try {
        const response = await reportServices.create_a_report(req, res);
        if (!response) throw new Error();

        return res.status(200).send(response);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: 'Something went wrong, contact the Administrator'
        })
    }

};