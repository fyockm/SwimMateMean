/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Meet = mongoose.model('Meet');

/**
 * Find meet by id
 */
exports.meet = function(req, res, next, id) {
    var User = mongoose.model('User');

    Meet.load(id, function(err, meet) {
        if (err) return next(err);
        if (!meet) return next(new Error('Failed to load meet ' + id));
        req.meet = meet;
        next();
    });
};

/**
 * Create a meet
 */
exports.create = function(req, res) {
    var meet = new Meet(req.body);

    meet.user = req.user;
    meet.save();
    res.jsonp(meet);
};

/**
 * Update a meet
 */
exports.update = function(req, res) {
    var meet = req.meet;

    meet = _.extend(meet, req.body);

    meet.save(function(err) {
        res.jsonp(meet);
    });
};

/**
 * Delete a meet
 */
exports.destroy = function(req, res) {
    var meet = req.meet;

    meet.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(meet);
        }
    });
};

/**
 * Show a meet
 */
exports.show = function(req, res) {
    res.jsonp(req.meet);
};

/**
 * List of Meets
 */
exports.all = function(req, res) {
    Meet.find().sort('-created').populate('user').exec(function(err, meets) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(meets);
        }
    });
};
