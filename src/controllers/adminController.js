const vendorServices = require('../services/vendor');
const offerServices = require('../services/offer');
const reportServices = require('../services/report');

exports.add_a_vendor = async (req, res) => {
    try {
        const response = await vendorServices.create_a_vendor(req, res);
        if (!response) throw new Error();

        //return the API response based on the status value gotten from the response object
        return response.status ?
            res.status(200).send(response) :
            res.status(400).send(response)

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: 'Something went wrong, contact the Administrator'
        })

    }
};

exports.add_an_offer = async (req, res) => {
    try {
        const response = await offerServices.create_an_offer(req, res);
        if (!response) throw new Error();

        //return the API response based on the status value gotten from the response object
        return response.status ?
            res.status(200).send(response) :
            res.status(400).send(response)

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: 'Something went wrong, contact the Administrator'
        })

    }
};

exports.update_an_offer = async (req, res) => {
    try {
        const response = await offerServices.update_an_offer(req, res);
        if (!response) throw new Error();

        //return the API response based on the status value gotten from the response object
        return response.status ?
            res.status(200).send(response) :
            res.status(400).send(response)

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: 'Something went wrong, contact the Administrator'
        })
    }
};

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

exports.receive_all_customer_reports = async (req, res) => {
    try {
        req.query.type = 'customer';
        const response = await reportServices.get_all_reports(req, res);
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