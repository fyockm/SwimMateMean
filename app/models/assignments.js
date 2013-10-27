/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Schema = mongoose.Schema;


/**
 * Assignment Schema
 */
var AssignmentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    meet: {
        type: String,
        default: '',
        trim: true
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    event: {
        type: String,
        default: '',
        trim: true
    },
    heat: {
        type: Number,
        default: 1
    },
    leg: {
        type: Number,
        default: 1
    }
});

/**
 * Validations
 */
AssignmentSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
AssignmentSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    }
};

mongoose.model('Assignment', AssignmentSchema);
