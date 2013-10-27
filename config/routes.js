var async = require('async');

module.exports = function(app, passport, auth) {
    // User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    // Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    // Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Finish with setting up the userId param
    app.param('userId', users.user);

    // Teams Routes
    var teams = require('../app/controllers/admin/teams');
    app.get('/admin/teams', teams.all);
    app.post('/admin/teams', auth.requiresLogin, teams.create);
    app.get('/admin/teams/:teamId', teams.show);
    app.put('/admin/teams/:teamId', auth.requiresLogin, auth.admin.hasAuthorization, teams.update);
    app.del('/admin/teams/:teamId', auth.requiresLogin, auth.admin.hasAuthorization, teams.destroy);

    // Events Routes
    var events = require('../app/controllers/admin/events');
    app.get('/admin/events', events.all);
    app.post('/admin/events', auth.requiresLogin, events.create);
    app.get('/admin/events/:eventId', events.show);
    app.put('/admin/events/:eventId', auth.requiresLogin, auth.admin.hasAuthorization, events.update);
    app.del('/admin/events/:eventId', auth.requiresLogin, auth.admin.hasAuthorization, events.destroy);

    // Meets Routes
    var meets = require('../app/controllers/admin/meets');
    app.get('/admin/meets', meets.all);
    app.post('/admin/meets', auth.requiresLogin, meets.create);
    app.get('/admin/meets/:meetId', meets.show);
    app.put('/admin/meets/:meetId', auth.requiresLogin, auth.admin.hasAuthorization, meets.update);
    app.del('/admin/meets/:meetId', auth.requiresLogin, auth.admin.hasAuthorization, meets.destroy);

    // Roster Routes
    var roster = require('../app/controllers/admin/roster');
    app.get('/admin/roster', roster.all);
    app.post('/admin/roster', auth.requiresLogin, roster.create);
    app.get('/admin/roster/:rosterId', roster.show);
    app.put('/admin/roster/:rosterId', auth.requiresLogin, auth.admin.hasAuthorization, roster.update);
    app.del('/admin/roster/:rosterId', auth.requiresLogin, auth.admin.hasAuthorization, roster.destroy);

    // Assignment Routes
    var assignments = require('../app/controllers/assignments');
    app.get('/assignment', assignments.all);
    app.post('/assignment', auth.requiresLogin, assignments.create);
  
    // Finish with setting up the Id params
    app.param('teamId', teams.team);
    app.param('eventId', events.event);
    app.param('meetId', meets.meet);
    app.param('rosterId', roster.roster);

    // Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
};
