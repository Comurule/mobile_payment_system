const adminServices = require('../services/admin');
const userServices = require('../services/user');

exports.register_a_user = async (req, res) => {
    try {
        let result = await userServices.create_a_user(req, res);
        if (!result) throw new Error();

        return result.status ? res.status(200).send(result) : res.status(400).send(result);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: 'Something went wrong'
        });
    }
};

exports.login_a_user = async (req, res) => {
    try {
        let result = await Promise.all([
            adminServices.login_an_admin(req, res),
            userServices.login_a_user(req,res)
        ])
        if (!result) throw new Error();
        if (result.every(object => !object.status)) return res.status(400).send({
            status: false,
            message: 'Invalid User Details'
        })

        result = result.filter(object => object.status);

        return res.status(200).send(result[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: 'Something went wrong'
        });
    }
};