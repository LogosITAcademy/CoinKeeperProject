var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var app = express();

//MYSQL CONNECTION
var connection =  mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"123456789max",
    database:"coinkeeperdb"
});

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var sess;

app.get('/',function(req,res){
   
        sess=req.session;
        if(sess.emails){
            res.redirect('/mainpage');
            console.log('session');
           
        }else{
             console.log('no session');
            res.redirect('/reglogpages');
        };
});

//LOGIN
app.post('/autorization',function(req,res){
    connection.query('select * from users',(err,rows)=>{
        if (err) throw (err);
        var foundUser = undefined;
        for(var i = 0;i < rows.length; i++){
            var user = rows[i];
            if( req.body.signinEmail == user.user_email  && req.body.signinPassword == user.user_passwords ){
                var emails = user.user_email;
                foundUser = emails;  
        }
    }
            if (foundUser !== undefined) {
                sess = req.session;
                sess.emails = emails;
            }
              res.end('done');
    })
});

//USERDATA
app.post('/userdata',function(req,res){
    connection.query('select * from users',(err,rows)=>{
        sess = req.session;
        for(var i = 0;i < rows.length; i++){
              var user = rows[i];
            if(sess.emails == user.user_email){
                    sess.userid = user.user_id,
                    sess.name = user.user_name,
                    sess.surname = user.user_surname
                    sess.userphoto = user.user_photo,
                    sess.balance = user.user_balance,
                    sess.currency = user.user_balance_currency

                    var UserData = {
                        id: sess.userid,
                        name: sess.name,
                        surname: sess.surname,
                        emails: sess.emails,
                        userphoto: sess.userphoto,
                        balance: sess.balance,
                        currency: sess.currency
                    }
                     res.json(UserData);
            };
        };
    })
});

//REGISTRATION
app.post('/registration',function(req,res){
    var signUpData = {
        user_name: req.body.signupName,
        user_surname: req.body.signupsurname,
        user_email: req.body.signupEmail,
        user_passwords: req.body.signupPassword,
        user_balance: req.body.signupbalance,
        user_balance_currency: req.body.signupCurrency,
        user_photo:'default.png'
};

connection.query('insert into users set ?',signUpData,(err)=>{
    if(err){
        res.send(203)
    }
    else{
            console.log('regist success',req.body);
            res.send(200);  
        }
    });
});

app.get('*',function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

var port = 8080;
var server = app.listen(port, function(){
	console.log("App started on port " + port);
});