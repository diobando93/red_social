const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function handleCon(){
    connection = mysql.createConnection(dbconf);
    connection.connect((err) => {
        if(err){
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        }else {
            console.log('DB connected!');
        }
    })
    connection.on('error', err => {
        console.error('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleCon();
        }else {
            throw err;
        }
    })
}
handleCon();