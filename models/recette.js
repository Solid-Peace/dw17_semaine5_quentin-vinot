const mongoose = require('mongoose');

const recetteSchema = mongoose.Schema({
	name        : {type: String, require: true},
	url         : {type: String},
	description : {type: String}
});

module.exports = mongoose.model('Recette', recetteSchema);