var express = require('Express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        res.status(400).send("Bad request.");
    } else next();
});

var cakeController = require('./cakeRouter.js');

app.use('/', cakeController);

app.listen(3000);
