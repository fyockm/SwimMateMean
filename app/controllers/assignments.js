/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Assignment = mongoose.model('Assignment'),
    _ = require('underscore');

/**
 * Find assignment by id
 */
exports.assignment = function(req, res, next, id) {
    var User = mongoose.model('User');

    Assignment.load(id, function(err, assignment) {
        if (err) return next(err);
        if (!assignment) return next(new Error('Failed to load assignment ' + id));
        req.assignment = assignment;
        next();
    });
};

/**
 * Create a assignment
 */
exports.create = function(req, res) {
    var assignment = new Assignment(req.body);

    assignment.user = req.user;
    assignment.save();
    res.jsonp(assignment);
};

/**
 * Update a assignment
 */
exports.update = function(req, res) {
    var assignment = req.assignment;

    assignment = _.extend(assignment, req.body);

    assignment.save(function(err) {
        res.jsonp(assignment);
    });
};

/**
 * Delete an assignment
 */
exports.destroy = function(req, res) {
    var assignment = req.assignment;

    assignment.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(assignment);
        }
    });
};

/**
 * Show an assignment
 */
exports.show = function(req, res) {
    res.jsonp(req.assignment);
};

/**
 * List of Assignments
 */
exports.all = function(req, res) {
    Assignment.find().sort('-created').populate('user').exec(function(err, assignments) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(assignments);
        }
    });
};
