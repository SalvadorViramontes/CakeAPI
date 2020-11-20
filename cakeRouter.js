var express = require('express');
var router = express.Router();

var controller = require('./cakeController.js');
const cakeController = controller;

router.get('/', function(req, res){
   var appName = "My Cake API";
   var appVersion = "1.1.0";
   res.send(`Welcome to ${appName}, version ${appVersion}, now with MongoDB`);
});

router.get('/cakes', cakeController.getAllCakes);

router.get('/cakes/:name', cakeController.getCakeByName);

router.post('/cakes', cakeController.createNewCake);

router.put('/cakes/:name', cakeController.updateCakeByName);

router.delete('/cakes/:name', cakeController.deleteCakeByName);

module.exports = router;