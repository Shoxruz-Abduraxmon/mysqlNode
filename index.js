const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const hbs = require('hbs');
// const routers = require('./routers/pages');

dotenv.config({ path: './.env'});

const app = express();

const publicDerectory = path.join(__dirname, './public');
app.use(express.static(publicDerectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const db = mysql.createConnection({
    host: process.env.DATABASE_host,
    user: process.env.DATABASE_user,
    password: process.env.DATABASE_password,
    database: process.env.DATABASE
});

db.connect( (error) => {
    if(error) {
        console.log(error);
    }else{
        console.log('MYSQL connected nodeLogin ...');
    }
});


app.set('view engine', 'hbs');

app.use('/', require('./routers/pages'));
app.use('/auth', require('./routers/auth'));


const PORT = 3000;




app.listen(PORT, () => {
    console.log(`Open lockalhost ${PORT}`);
});
