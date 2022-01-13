const express = require('express');
const controller = require('./index');

const response = require('../../network/response');

const router = express.Router();

router.post('/login', function(req, res){
    controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(err => {
            response.error(req, res, 'Informacion invalida', 400);
        })
})

module.exports = router;