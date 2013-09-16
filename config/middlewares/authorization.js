/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        if (req.profile.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};

/**
 * Admin authorizations routing middleware
 */
exports.admin = {
    hasAuthorization: function(req, res, next) {
        // if (req.team.user.id != req.user.id) {
        //     return res.redirect('/teams/' + req.team.id);
        // }
        next();
    }
};
