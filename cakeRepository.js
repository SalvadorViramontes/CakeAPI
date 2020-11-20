var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const Cake = require('./cakeModel.js');

class CakeRepository{
    constructor(){
        
    }

    async nameExists(name){
        var cakeExists = await this.getCakeByName(name);
        if(cakeExists !== null) return true;
        else return false;
    }

    async getAllCakes(){
        var result;
        try{
            var query = await Cake.find({}, {'_id': 0, 'name': 1, 'price': 1, 'flavors': 1}).exec();
            result = query;
        }
        catch(error){
            throw new Error("A problem ocurred in the database.");
        }
        return result;
    }

    async getCakeByName(name){
        var result;
        try{
            var query = await Cake.findOne({ name: name }, {'_id': 0, 'name': 1, 'price': 1, 'flavors': 1});
            result = query;
        }
        catch(error){
            throw new Error("A problem ocurred in the database.");
        }
        return result;
    }

    async addNewCake(cake){
        var newCake = new Cake({
            name: cake.name,
            price: cake.price,
            flavors: cake.flavors
        });
        var result;

        try{
            var query = await newCake.save();
            result = query;
        }
        catch(error){
            throw new Error("A problem ocurred in the database.");
        }
        return result;
    }

    async editCakeByName(name, newCake){
        var result;
        try{
            var query = await Cake.updateOne({ name: name }, newCake);
            result = query;
        }
        catch(error){
            throw new Error("A problem ocurred in the database.");
        }
        return result;
    }

    async deleteCakeByName(name){
        var result;
        try{
            var query = await Cake.deleteOne({ name: name });
            result = query;
        }
        catch(error){
            throw new Error("A problem ocurred in the database.");
        }
        return result;
    }
}

module.exports = CakeRepository;
