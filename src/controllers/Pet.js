var _ = require('underscore');
var models = require('../models');

var Pet = models.Pet;

var makerPage = function(req, res) {

    Pet.PetModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        res.render('app', {pets: docs});
    });
};

var addPage = function(req, res) {
    res.render('add');
};

var makePet = function(req, res) {
    if(!req.body.name || !req.body.age) {
        return res.status(400).json({error: "Both name and age are required"});
    }
    
    var petData = {
        name: req.body.name,
        age: req.body.age,
        owner: req.session.account._id,
        species: req.body.species,
        color: req.body.color,
        personality: req.body.personality,
        bio: req.body.bio,
        message: req.body.message
    };
    
    var newPet = new Pet.PetModel(petData);
    
    newPet.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        res.json({redirect: '/maker'});
    });
    
};

var removePet = function(req, res) {
	if(!req.body.name) {
        return res.status(400).json({error: "Name is required"});
    }
	
	Pet.PetModel.findByName(req.body.name, function(err,selectedPet){
		if(err){
			return res.status(400).json({error: 'Pet not found'});
		}
		if(!selectedPet){
			return res.status(400).json({error: 'Pet not found'});
		}
		
		selectedPet.remove(function(err){
			if(err){
				return res.status(400).json({error: 'Pet not found'});
			}
			res.json({redirect: '/maker'});
		});
	});
};

var addInfo = function(req, res) {
    Pet.PetModel.findAddInfo(req.body.petName, function(err, docs) {
        console.log("CONTROLLER: " + req.body.petName);
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        return res.status(200).json(docs);
    });
};

module.exports.makerPage = makerPage;
module.exports.make = makePet;
module.exports.remove = removePet;
module.exports.add = addInfo;
module.exports.addPage = addPage;