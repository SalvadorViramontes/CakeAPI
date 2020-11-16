var express = require('express');
var router = express.Router();

const Cake = require('./cakeModel.js');
let CakeRepository = require('./cakeRepository.js');
var cakeRepository = new CakeRepository();

const errors = require('./errors.js');
let NotFoundError = errors.NotFoundError;
let ParameterError = errors.ParameterError;

router.get('/', function(req, res){
   var appName = "My Cake API";
   var appVersion = "1.0.0";
   res.send(`Welcome to ${appName}, version ${appVersion}`);
});

router.get('/cakes', function(req, res){
   let cakeArray = cakeRepository.getAllCakes();
   res.status(200).send(cakeArray);
});

router.get('/cakes/:name', function(req, res){
   try{
      let name = req.params.name;
      if (typeof name !== 'string') throw new ParameterError("Name must be a string.");
      let cakeQuery = cakeRepository.getCakeByName(name);
      if (cakeQuery === null) throw new NotFoundError(`The cake with name ${name} could not be found.`);
      res.status(200).json(cakeQuery);
   }
   catch(err){
      if (err instanceof ParameterError) res.status(400).send(err.message);
      else if (err instanceof NotFoundError) res.status(404).send(err.message);
      else res.status(500).send(e.message);
   }
});

router.post('/cakes', function(req, res){
   try{
      let name = req.body.name;
      if (typeof name !== 'string') throw new ParameterError("Name must be a string.");

      let nameExists = cakeRepository.nameExists(name);
      if(nameExists) throw new ParameterError(`A cake with name ${name} already exists.`);

      let price = req.body.price;
      if (typeof price !== 'number') throw new ParameterError("Price must be a number.");
      if (price <= 0) throw new ParameterError("Price must be a positive number.");

      let flavors = req.body.flavors;
      if (!Array.isArray(flavors)) throw new ParameterError("Flavors must be an array.");

      var allFlavorsAreStrings = flavors.map(flavor => typeof flavor === 'string').reduce((acc, val) => acc && val, true)
      if(!allFlavorsAreStrings) throw new ParameterError("Flavors must be a string array.")

      var newCake = new Cake(name, price, flavors)
      cakeRepository.addNewCake(newCake);
      res.status(201).send(newCake);
   } 
   catch(err){
      if (err instanceof ParameterError) res.status(400).send(err.message);
      else if (err instanceof NotFoundError) res.status(404).send(err.message);
      else res.status(500).send(e.message);
   }
});

router.put('/cakes/:name', function(req, res){
   try{
      let name = req.params.name;
      if (typeof name !== 'string') throw new ParameterError("Name must be a string.");
   
      let nameExists = cakeRepository.nameExists(name);
      if(!nameExists) throw new NotFoundError(`The cake with name ${name} could not be found.`)
   
      let newName = req.body.name;
      if (typeof newName !== 'string') throw new ParameterError("New name must be a string.")
      let newNameExists = cakeRepository.nameExists(newName);
      if(newNameExists && name != newName) throw new ParameterError(`A cake with name ${newName} already exists.`)
   
      let newPrice = req.body.price;
      if (typeof newPrice !== 'number') throw new ParameterError("New price must be a number.")
      if (newPrice <= 0) throw new ParameterError("Price must be a positive number.")
   
      let newFlavors = req.body.flavors;
      if (!Array.isArray(newFlavors)) throw new ParameterError("New flavors must be an array.")
      var allFlavorsAreStrings = newFlavors.map(flavor => typeof flavor === 'string').reduce((acc, val) => acc && val, true)
      if(!allFlavorsAreStrings) throw new ParameterError("New flavors must be a string array.")
   
      var newCake = new Cake(newName, newPrice, newFlavors);
      let cakeEditedSuccessfully = cakeRepository.editCakeByName(name, newCake);
      if (!cakeEditedSuccessfully) throw new Error(`The cake with name ${name} could not be edited.`);
      res.status(200).send(newCake);
   }
   catch(err){
      if (err instanceof ParameterError) res.status(400).send(err.message);
      else if (err instanceof NotFoundError) res.status(404).send(err.message);
      else res.status(500).send(e.message);
   }
});

router.delete('/cakes/:name', function(req, res){
   try{
      let name = req.params.name;
      if (typeof name !== 'string') throw new ParameterError("Name must be a string.")
   
      let cakeDeletedSuccessfully = cakeRepository.deleteCakeByName(name);
      if (!cakeDeletedSuccessfully) throw new NotFoundError(`The cake with name ${name} could not be found.`);
      res.status(200).send(`${name} cake deleted successfully.`);
   }
   catch(err){
      if (err instanceof ParameterError) res.status(400).send(err.message);
      else if (err instanceof NotFoundError) res.status(404).send(err.message);
      else res.status(500).send(e.message);
   }
});

module.exports = router;