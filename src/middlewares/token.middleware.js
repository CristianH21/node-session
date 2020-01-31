const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configurations/config.jwt');
const logger = require('../configurations/config.logger');

module.exports = {
    verifyToken: async (req, res, next) => {
        const authorizationHeader = req.headers['authorization'];
        try {
            if(typeof authorizationHeader == 'undefined') throw new Error('Token no proveded.');

            /*Check if token contains the keyword Bearer*/

            /****************************************** */

            const token = req.headers['authorization'];
            
            JWT.verify(token, JWT_SECRET, (err) => {
                if(err) throw new Error('Token is invalid.');
                return next();
            });

        } catch (error) {
            res.status(401).json({message: error.message});
            logger.info(`${ new Date()} - ${error.message}`);
        }
    }
};