/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../../config/config')[env],
    Schema = mongoose.Schema;


/**
 * Event Schema
 */
var EventSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    number: {
        type: Number,
        default: 1
    },
    length: {
        type: Number,
        default: 25
    },
    stroke: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: 8,
        max: 17
    },
    gender: {
        type: String,
        trim: true,
        default: "M"
    }
});

/**
 * Validations
 */
EventSchema.path('number').validate(function(number) {
    return number>0;
}, 'Number must be a postive numbereger');

/**
 * Statics
 */
EventSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    }
};

mongoose.model('Event', EventSchema);