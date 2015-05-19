var mongoose = require('mongoose');
var _ = require('underscore');

var PetModel;

var setName = function(name) {
    return _.escape(name).trim();
};
var setSpecies = function(species) {
    return _.escape(species).trim();
};
var setColor = function(color) {
    return _.escape(color).trim();
};
var setPersonality = function(personality) {
    return _.escape(personality).trim();
};
var setBio = function(bio) {
    return _.escape(bio).trim();
};
var setMessage = function(message) {
    return _.escape(message).trim();
};

var PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    
    age: {
        type: Number,
        min: 0,
        required: true
    },
    
    owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
    },
	
    species: {
            type: String,
            required: false,
            trim: true,
            set: setSpecies
    },

    color: {
            type: String,
            required: false,
            trim: true,
            set: setColor
    },

    personality: {
            type: String,
            required: false,
            trim: true,
            set: setPersonality
    },

    bio: {
            type: String,
            required: false,
            trim: true,
            set: setBio
    },
    
    message: {
            type: String,
            required: false,
            trim: true,
            set: setMessage
    },
	
    createdData: {
        type: Date,
        default: Date.now
    }

});

PetSchema.methods.toAPI = function() {
    return {
        name: this.name,
        age: this.age
    };
};

var PetMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
        set: setMessage
    },
	
    createdData: {
        type: Date,
        default: Date.now
    }

});

PetMessageSchema.methods.toAPI = function() {
    return {
        message: this.message
    };
};

PetSchema.statics.findByOwner = function(ownerId, callback) {

    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return PetModel.find(search).select("name age").exec(callback);
};

PetSchema.statics.findByName = function(name, callback) {

    var search = {
        name: name
    };

    return PetModel.findOne(search, callback);
};

PetSchema.statics.findAddInfo = function(name, callback) {

    var search = {
        name: name
    };
    return PetModel.find(search).select("species color personality bio").exec(callback);
};

PetModel = mongoose.model('Pet', PetSchema);


module.exports.PetModel = PetModel;
module.exports.PetSchema = PetSchema;