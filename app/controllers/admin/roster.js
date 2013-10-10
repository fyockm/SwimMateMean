/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Roster = mongoose.model('Roster'),
    _ = require('underscore');


/**
 * Find roster by id
 */
exports.roster = function(req, res, next, id) {
    var User = mongoose.model('User');

    Roster.load(id, function(err, roster) {
        if (err) return next(err);
        if (!roster) return next(new Error('Failed to load roster ' + id));
        req.roster = roster;
        next();
    });
};

/**
 * Create a roster
 */
exports.create = function(req, res) {
    var roster = new Roster(req.body);

    roster.user = req.user;
    roster.save();
    res.jsonp(roster);
};

/**
 * Update a roster
 */
exports.update = function(req, res) {
    var roster = req.roster;

    roster = _.extend(roster, req.body);

    roster.save(function(err) {
        res.jsonp(roster);
    });
};

/**
 * Delete a roster
 */
exports.destroy = function(req, res) {
    var roster = req.roster;

    roster.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(roster);
        }
    });
};

/**
 * Show a roster
 */
exports.show = function(req, res) {
    res.jsonp(req.roster);
};

/**
 * List of Rosters
 */
exports.all = function(req, res) {
    Roster.find().sort('-created').populate('user').exec(function(err, rosters) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(rosters);
        }
    });
};
