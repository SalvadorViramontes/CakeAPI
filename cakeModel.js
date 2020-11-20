var mongoose = require('mongoose');

var cakeSchema = mongoose.Schema({
    name: String,
    price: Number,
    flavors: [String]
});

var Cake = mongoose.model("Cake", cakeSchema);

module.exports = Cake;