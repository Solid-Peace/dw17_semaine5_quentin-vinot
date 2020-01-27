const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recette = require('./models/recette');
const Ingredient = require('./models/ingredient');
//const Cat = require('./models/cat');

const app = express();
mongoose.connect('mongodb://localhost:27017/quentin_vinot', {useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/addRecette/:name/:url/:description', (req, res, next) => {
	const recette = new Recette({
		name: req.params.name,
		url: req.params.url,
		description: req.params.description,
	});
	recette.save().then(() => console.log('Recette enregistrée'));
	next();
});

app.post('/addIngredient', (req, res, next) => {
	//console.log(req);
	console.log(req.body);
	const ingredient = new Ingredient({ ...req.body });
	ingredient.save().then(() => res.status(201).json({ message : 'Ingredient créée !'}));
	next();
});

app.post('/addRecette', (req, res, next) => {
	console(req.body);
	const recette = new Recette({ ...req.body });
	recette.save().then(() => res.status(201).json({ message : 'Ingredient créée !'}));
	next();
});

app.use('/listRecettes', (req, res, next) => {
  Recette.find()
    .then(recettes => res.status(200).json(recettes))
    .catch(error => res.status(400).json({ error }))
});

app.use('/listIngredient', (req, res, next) => {
  Ingredient.find()
    .then(ingredients => res.status(200).json(ingredients))
    .catch(error => res.status(400).json({ error }))
});

app.use('/findRecette/:name', (req, res, next) => {
  Recettes.findOne({ name: req.params.name })
    .then(recette => res.status(200).json(recette))
    .catch(error => res.status(400).json({ error }))
});

app.use('/findIngredient/:name', (req, res, next) => {
  Ingredient.findOne({ name: req.params.name })
    .then(ingredient => res.status(200).json(ingredient))
    .catch(error => res.status(400).json({ error }));
});

app.put('/updateRecette/:name', (req, res, next) => {
  Recette.updateOne({ name: req.params.name }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Recette modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.put('/updateIngredient/:name', (req, res, next) => {
  Ingredient.updateOne({ name: req.params.name }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Ingredient modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/deleteRecette/:name', (req, res, next) => {
  Recette.deleteOne({ name: req.params.name })
    .then(() => res.status(200).json({ message: 'Recette supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/deleteIngredient/:name', (req, res, next) => {
  Ingredient.deleteOne({ name: req.params.name })
    .then(() => res.status(200).json({ message: 'Ingredient supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});


app.use('/hello', (req, res) => {
	res.send('hell world');
});

module.exports = app;