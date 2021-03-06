const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlantInstance = require('./plantInstance.js');

const requiredString = {
    type: String,
    required: true
};

const requiredNumber = {
    type: Number,
    required: true
};

const schema = new Schema({
    name: requiredString,
    width: requiredNumber,
    length: requiredNumber,
    plot: [
        {
            plantId: {
                type: Schema.Types.ObjectId,
                ref: 'Plant', 
            },
            x: Number,
            y: Number,

        },
    ]
});

schema.static('createPlantInstance', function(plantInstance) {
    let newPlantInstance = new PlantInstance(plantInstance);
    return newPlantInstance.save();
            
}); 

module.exports = mongoose.model('Garden', schema);
