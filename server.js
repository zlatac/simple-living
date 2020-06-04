var express = require('express');
var path = require('path')
var mysql = require('mysql');
var app = express();
var moment = require('moment');
var server = require('http').Server(app);
//var querystring = require('querystring');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
app.use(express.json())
app.set('port', process.env.SERVER_PORT || 8000);
server.listen(app.get('port'), () => {
    console.log(`Server is listening on port ${app.get('port')}`);
});

const databaseConnectionOptions = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database : process.env.DATABASE,
    port: process.env.DB_PORT,
    multipleStatements: true
    
};

console.log(databaseConnectionOptions)

app.get('/', function (req, res) {
     res.sendFile(__dirname + '/src/index.html');
});

//Marketing endpoint
app.get('/marketing', function(req,res){
    const con = mysql.createConnection(databaseConnectionOptions);
    const date_time_format = "YYYY-MM-DD hh:mm:ss";
    var today= moment.utc();
    //Starting date of this week
    var thisWeek = today.clone().startOf("week");
    //date from 2 weeks ago
    var twoWeeks = thisWeek.clone().subtract(2,"week");
    //this month start date
    var thisMonth = today.clone().startOf("month");
    //last month start date
    var lastMonth = thisMonth.clone().subtract(1, "month");
    // //Get all registrations
    var query = "SELECT COUNT(*) as total FROM str_register; ";
    query+= `SELECT COUNT(*) as total FROM str_register WHERE created_at >= '${thisWeek.format(date_time_format)}';`;
    query+= `SELECT COUNT(*) as total FROM str_register WHERE created_at >= '${twoWeeks.format(date_time_format)}' AND created_at < '${thisWeek.format(date_time_format)}';`;
    query+= `SELECT COUNT(*) as total FROM str_register WHERE created_at >= '${thisMonth.format(date_time_format)}';`;
    query+= `SELECT COUNT(*) as total FROM str_register WHERE created_at >= '${lastMonth.format(date_time_format)}' AND created_at < '${thisMonth.format(date_time_format)}';`;

    con.query(query,(err,results)=>{
        try{
            if(err){res.send(err);return;}
            resultArray = JSON.parse(JSON.stringify(results));
            totals = {
                total : resultArray[0][0].total,
                totalWeek : resultArray[1][0].total,
                totalTwoWeeks : resultArray[2][0].total,
                totalMonth : resultArray[3][0].total,
                totalLastMonth : resultArray[4][0].total
                }
            res.status(200);
            res.send(totals);
            
        }catch(error){
            console.warn(new Error(error));
            res.sendStatus(500);
        }
        finally{
            con.end();
        }
    });

})



app.post('/api', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone || '';
    const city = req.body.city;
    const livingStatus = req.body.living_status;
    const industry = req.body.industry;
    const query = "INSERT INTO str_register (name, email, phone, city, industry, living_status, created_at) values (?,?,?,?,?,?, now())";
    const values = [name, email, phone, city, industry, livingStatus]
    const validateValues = values.filter((i, index) => index !== 2)
    if (validateValues.some(i => i === '' || i === undefined)) {
        res.status(400)
        res.send('Invalid Parameters')
        return
    }
    const con = mysql.createConnection(databaseConnectionOptions)
    con.query(query, values, (err, results) => {
        try {
            if (err) {res.send(err); return;}
            res.status(200)
            res.send(results)
        } catch (error) {
            console.warn(new Error(error))
        } finally {
            con.end()
        }
        
    });
});

app.use(express.static(path.resolve(__dirname, 'src')));
