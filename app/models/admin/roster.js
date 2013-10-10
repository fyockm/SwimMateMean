/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../../config/config')[env],
    Schema = mongoose.Schema;


/**
 * Roster Schema
 */
var RosterSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true,
        default: "M"
    },
    age: {
        type: Number,
        max: 17
    }
});

/**
 * Validations
 */
RosterSchema.path('firstName').validate(function(firstName) {
    return firstName.length;
}, 'First Name cannot be blank');

RosterSchema.path('lastName').validate(function(lastName) {
    return lastName.length;
}, 'Last Name cannot be blank');

/**
 * Statics
 */
RosterSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    }
};

mongoose.model('Roster', RosterSchema);
