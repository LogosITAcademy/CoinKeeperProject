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

//-------------------------------------------------------

var curentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
var TodayDate = new Date();
var currentMonth = TodayDate.getMonth()+1;
var curentYear = TodayDate.getFullYear();

//GET USER SAVINGS
app.post('/getsavings',function(req,res){
    sess=req.session;
    if(sess.userid){
        connection.query('select * from savings where fk_user = '+sess.userid+';',(err,rows)=>{
            if(err) throw err;
            res.send(rows);
        })
    }else{
        res.send(404);
    }
});

//GET USER SPENDS
app.post('/getspends',function(req,res){
    sess=req.session;
    if(sess.userid){
        connection.query('select * from  spends where fk_user = '+sess.userid+' and month(spends_date) = '+currentMonth+' AND year(spends_date) = '+curentYear+' ',(err,rows)=>{
            if(err) throw err;
                res.send(rows);
        })
    }else{
        res.send(404);
    }
});

//GET USER BALANCE
app.post('/getbalance', function(req, res) {
    var balance;
    sess = req.session;
    if (sess.userid) {
        connection.query('select sum(savings_amount) from savings where savings_inbalance = 1 and fk_user = '+sess.userid+' ', (err, rows) => {
            if (err) throw err;
            balance = rows[0]['sum(savings_amount)'];
            if (balance == null) {
                balance = 0;
            }
            res.send(balance.toString());
        })
    }else{
        res.send(404);
    }
});

//GET USER INCOME
app.post('/getincome', function(req, res) {
    var income;
    sess = req.session;
    if (sess.userid) {
        connection.query('select sum(savings_amount) from savings where fk_user = ' + sess.userid + ' AND month(savings_date) = ' + currentMonth + ' AND year(savings_date) = ' + curentYear + ' ', (err, rows) => {
            if (err) throw err;
            income = rows[0]['sum(savings_amount)'];
            if (income == null) {
                income = 0;
            }
            res.send(income.toString());
        })
    } else {
        res.send(404);
    }
});

// ADD NEW SAVINGS
app.post('/addsavings',function(req,res){
    sess = req.session;
        var newSavings = {
            savings_category: req.body.savings_category,
            savings_amount: req.body.savings_amount,
            savings_ico: req.body.savings_ico,
            savings_currency: req.body.savings_currency,
            savings_inbalance: req.body.savings_inbalance,
            savings_date: curentDate,
            fk_user: sess.userid
        }
if(sess.userid) { 
connection.query('insert into savings set ?',newSavings,(err)=>{
    if(err) throw err;
            res.send(200);  
    });
connection.query('insert into savings_history (savings_history_category,savings_history_amount,savings_history_date,fk_user) values("'+newSavings.savings_category+'",'+newSavings.savings_amount+',"'+newSavings.savings_date+'",'+newSavings.fk_user+' )',(err)=>{
        if(err) throw err;
    })
}else {
        res.send(404);
    }

});

// ADD NEW SPENDS
app.post('/addspends', function(req, res) {
    sess = req.session;
    var newSpends = {
        spends_category: req.body.spends_category,
        spends_amount: 0,
        spends_ico: req.body.spends_ico,
        spends_date: curentDate,
        fk_user: sess.userid
    }
    if (sess.userid) {
        connection.query('insert into spends set ?', newSpends, (err) => {
            if (err) throw err;
            res.send(200);
        });
    } else {
        res.send(404);
    }
});

//SET SPENDS 
app.post('/setspends',function(req,res){
sess = req.session;
    var setSpends = {
        savings_id: req.body.savings_id,
        spends_id: req.body.spends_id,
        spends_amount: req.body.spends_amount,
        spends_category: req.body.spends_category,
        spends_currency:'UAH'
    }

 if (sess.userid) {
    connection.query('UPDATE savings SET savings_amount = savings_amount - '+setSpends.spends_amount+', savings_date = "'+curentDate+'" where fk_user = '+sess.userid+' and savings_id = '+setSpends.savings_id+' ',(err)=>{
        if(err) throw err;
    })
    connection.query('insert into spends_history (spends_history_category,spends_history_amount,spends_history_date,fk_user) values("'+setSpends.spends_category+'",'+setSpends.spends_amount+',"'+curentDate+'",'+sess.userid+') ',(err)=>{
        if(err) throw err;
    })
    connection.query('UPDATE spends SET spends_amount = spends_amount + '+setSpends.spends_amount+', spends_currency="'+setSpends.spends_currency+'", spends_date = "'+curentDate+'" where  fk_user = '+sess.userid+' and spends_id = '+setSpends.spends_id+' ',(err)=>{
        if(err) throw err;
            res.send(200);
    });
} else {
        res.send(404);
    }

});

// SET SAVINGS
app.post('/setsavings', function(req,res){
    sess = req.session;
    var setSavings = {
        savings_id: req.body.savings_id,
        savings_amount: req.body.savings_amount,
        savings_category: req.body.savings_category,
        fk_user: sess.userid
    }
if (sess.userid) {
    connection.query('UPDATE savings SET savings_amount = savings_amount + '+setSavings.savings_amount+', savings_date = "'+curentDate+'" where  fk_user = '+setSavings.fk_user+' and savings_id = '+setSavings.savings_id+' ',(err)=>{
        if(err) throw err;
        res.send(200);
    })
    connection.query('insert into savings_history (savings_history_category,savings_history_amount,savings_history_date,fk_user) values("'+setSavings.savings_category+'",'+setSavings.savings_amount+',"'+curentDate+'",'+setSavings.fk_user+')',(err)=>{
        if(err) throw err;
    })
}else {
        res.send(404);
    }
});

//-------------------------------------------------------

app.get('*',function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

var port = 8080;
var server = app.listen(port, function(){
	console.log("App started on port " + port);
});