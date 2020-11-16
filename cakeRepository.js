class CakeRepository{
    constructor(){
        this.cakeArray = [];
    }

    nameExists(name){
        var cakeNames = this.cakeArray.map(cake => cake.name);
        var cakeIndex = cakeNames.indexOf(name);
        if (cakeIndex === -1) return false;
        return true;
    }

    getAllCakes(){
        return this.cakeArray;
    }

    getCakeByName(name){
        var cakeNames = this.cakeArray.map(cake => cake.name);
        var cakeIndex = cakeNames.indexOf(name);
        if (cakeIndex === -1) return null;
        else return this.cakeArray[cakeIndex];
    }

    addNewCake(cake){
        this.cakeArray.push(cake);
    }

    editCakeByName(name, newCake){
        var cakeNames = this.cakeArray.map(cake => cake.name);
        var cakeIndex = cakeNames.indexOf(name);
        if (cakeIndex === -1) return false;
        this.cakeArray[cakeIndex].name = newCake.name;
        this.cakeArray[cakeIndex].price = newCake.price;
        this.cakeArray[cakeIndex].flavors = newCake.flavors;
        return true;
    }

    deleteCakeByName(name){
        var cakeNames = this.cakeArray.map(cake => cake.name);
        var cakeIndex = cakeNames.indexOf(name);
        if (cakeIndex === -1) return false;
        this.cakeArray.splice(cakeIndex, 1);
        return true;
    }
}

module.exports = CakeRepository;
