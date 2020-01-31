const db = require('../configurations/config.db');
module.exports = {
    getUsers : async (req, res, next) => {
        try{
            const result = await db.query('SELECT * FROM users');
            res.status(200).json({
                users: result.rows
            });
        } catch(error) {
            next(error);
        }
    }
};