const db = require('../configurations/config.db');
const logger = require('../configurations/config.logger');
const bcrypt = require('bcrypt');


module.exports = {
    verifySignin: async (req, res, next) => {
        const {email, password} = req.body;
        try {
            const result = await db.query('SELECT id, email, password FROM users WHERE email = $1', [email]);
            if(result.rowCount == 0) throw new Error('Incorrect user or password.');
            
            if(result.rowCount > 0) {
                const user = result.rows[0];
                // Compare password with Bcrypt
                const validatePwd = bcrypt.compareSync(password, user.password);
                if(!validatePwd) {
                    logger.error(`${email} is trying to sign in with incorrect password.`);
                    throw new Error('Incorrect user or password.');
                }
                return next();
            }
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    verifySignup: async (req, res, next) => {
        const {email} = req.body;
        try {
            const result = await db.query('SELECT email FROM users WHERE email = $1', [email]);
            if(result.rowCount > 0) {
                logger.error(`${email} is trying to sign up and already exist in our database.`);
                throw new Error(`${email} already exists!`);
            }
            return next();
        } catch (error) {
            res.status(403).json({message: error.message});
        }
    }
}