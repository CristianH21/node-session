const { User } = require('../models/user.model');
const db = require('../configurations/config.db');
const logger = require('../configurations/config.logger');
const bcrypt = require('bcrypt');

module.exports = {
    signUp : async (req, res, next) => {
        const { name, email, password } = req.body;
        
        try{
            const encryptedPwd = bcrypt.hashSync(password, 10);
            const registerUser = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, encryptedPwd]);
            if(registerUser.rowCount > 0) {
                logger.info(`${email} has been registered.`);
                res.status(201).json({
                    message: `${name}, we have sent your confirmation email to ${email}.`
                });
            }

        } catch(error) {
            next(error);
            res.status(400).json({message: error.message});
        }
    }
};
