const inquirer = require('inquirer');
const chalk = require('chalk');

const DB = require('./models');
const hash = require('./utils/passwordHash')

const confirmPasswordInput = async (input) => {
    if (input.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    return true;
};

module.exports = async () => {
    const check_record = await DB.Admin.findOne();
    if (check_record) {
        const logInit = chalk.green('[✔] Administrator already initialized');
        const welcome = chalk.green(`[✔] Welcome, ${check_record.email}`);
        
        console.log(logInit);
        console.log(welcome);
        return;
    }

    const logInit = chalk.yellowBright('[!] Initializing Administrator!');
    console.log(logInit);

    inquirer.prompt([
        {
            name: 'email',
            message: 'email (default: email@example.com)',
            default: 'email@example.com',
        },
        {
            type: 'password',
            name: 'password',
            message: 'password',
            mask: '*',
            validate: confirmPasswordInput,
        },
    ])
        .then(async (answers) => {
            //Hash the Password
            const hashedPassword = await hash.generateHash(answers.password);

            await DB.Admin.create({
                password: hashedPassword,
                email: answers.email
            });

            const log = chalk.green('[✔] Administrator created successfully');
            console.log(log);
        });
};