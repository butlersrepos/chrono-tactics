import express from 'express.io';

var app = express();

app.set('views', __dirname + '/public/views')
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index', {title: 'testTitle'});
});

app.http().io();

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

app.io.route('users', {
    create: function(req) {
        // create your user 
    },
    update: function(req) {
        // update your user 
    },
    remove: function(req) {
        // remove your user 
    },
});