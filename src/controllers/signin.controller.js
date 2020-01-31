const JWT = require('jsonwebtoken');
const User = require('../models/user.model');
const db = require('../configurations/config.db');
const { JWT_SECRET } = require('../configurations/config.jwt');

const signToken = () => {
    return JWT.sign({
        iss: 'ts',
        sub: '123098',
        iat: new Date().getTime(),
        exp: new Date().setMinutes(5)
    }, JWT_SECRET); 
};

module.exports = {
    signIn : async (req, res, next) => {
        try{
            const token = signToken();
            
            res.status(200).json({
                token: token
            });
        } catch(error) {
            res.json({message: error.message});
        }
    }
};
