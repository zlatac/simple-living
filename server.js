var express = require('express');
var path = require('path')
var app = express();
var server = require('http').Server(app);
//var querystring = require('querystring');
app.use(express.json())
app.set('port', process.env.PORT || 8000);
server.listen(app.get('port'));

app.get('*',function(req,res,next){
    if(req.headers['x-forwarded-proto']!='https' && process.env.NODE_ENV === 'production')
        res.redirect(['https://', req.get('Host'), req.url].join(''))
    else
        next() /* Continue to other routes if we're not redirecting */
})

app.get('/', function (req, res) {
     // default is celebrity puzzle app
     res.sendFile(__dirname + '/src/index.html');
});

app.post('/api', function (req, res) {
    // default is celebrity puzzle app
    console.log(req.body)
    res.send('we good')
    res.status(200)
});

app.use(express.static(path.resolve(__dirname, 'src')));
