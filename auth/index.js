const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;


function sign(data){

    return jwt.sign(data, secret)

}

function verify(token){

    return jwt.verify(token, secret)

}

const check = {
    own: function(req, owner){
        const decoeded = decodeHeader(req);
        console.log(decoeded);
    }
}

function getToken(auth){
    if(!auth){
        throw new Error('No viene token');
    }
    if(auth.indexOf('Bearer ') === -1){
        throw new Error('Formato invalido');
    }
    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decode = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
}