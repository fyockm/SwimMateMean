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
    name: {
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    gender: {
        type: String,
        trim: true,
        default: "M"
    },
    age: {
        type: Number,
        min: 4,
        max: 17
    }
});

RosterSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});
RosterSchema.virtual('name.fullLF').get(function () {
  return this.name.last + ', ' + this.name.first;
});

/**
 * Validations
 */
RosterSchema.path('name.first').validate(function(firstName) {
    return firstName.length;
}, 'First Name cannot be blank');

RosterSchema.path('name.last').validate(function(lastName) {
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
