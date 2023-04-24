const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
  host: process.env.DATABASE_host,
  user: process.env.DATABASE_user,
  password: process.env.DATABASE_password,
  database: process.env.DATABASE
});

exports.register = (req, res) => {
  console.log(req.body);

  const { email, name, password } = req.body;

  db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      return res.render('index', {
        message: 'Fill in your email correctly'
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);


    db.query('INSERT INTO users SET ?' , {email: email, username: name, password: hashedPassword}, (error, results) => {
        if(error) {
            console.log(error);
        }else {
            console.log(results);
            return res.render('index', {
                message: 'maqul'
            });
        }
    })

 
});
};
