const express = require('express');
const secure = require('./secure');
const controller = require('./index');

const response = require('../../network/response');

const router = express.Router();

//routes
router.get('/', list);
router.get(':id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

//internal functions
function list(req, res){
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((err) => {
            //console.log(err);
            response.error(req, res, err.message, 500);
        })
}

function get(req, res){
    controller.get(req.params.id)
    .then((user) => {
        response.success(req, res, user, 200);
    })
    .catch((err) => {
        response.error(req, res, err.message, 500);
    })
}

function upsert(req, res){
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        })
}

module.exports = router;