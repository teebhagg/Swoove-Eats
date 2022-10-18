const jwt = require('jsonwebtoken');

const maxAge = 30 * 24 * 68 * 60;

module.exports.createToken = async( id ) => {
    return jwt.sign( id.toJSON(),'tee_bhagg', )
}
