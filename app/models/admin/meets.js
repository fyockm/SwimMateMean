/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../../config/config')[env],
    Schema = mongoose.Schema;


/**
 * Meet Schema
 */
var MeetSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    },
    home: {
        type: String,
        trim: true
    },
    away: {
        type: String,
        trim: true
    }
});

/**
 * Validations
 */
MeetSchema.path('home').validate(function(home) {
    return home.length;
}, 'Home cannot be blank');

MeetSchema.path('away').validate(function(away) {
    return away.length;
}, 'Away cannot be blank');

/**
 * Statics
 */
MeetSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    }
};

mongoose.model('Meet', MeetSchema);
