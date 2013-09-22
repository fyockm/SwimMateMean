var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
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

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Team Routes
    var teams = require('../app/controllers/admin/teams');
    app.get('/admin/teams', teams.all);
    app.post('/admin/teams', auth.requiresLogin, teams.create);
    app.get('/admin/teams/:teamId', teams.show);
    app.put('/admin/teams/:teamId', auth.requiresLogin, auth.admin.hasAuthorization, teams.update);
    app.del('/admin/teams/:teamId', auth.requiresLogin, auth.admin.hasAuthorization, teams.destroy);

    //Event Routes
    var events = require('../app/controllers/admin/events');
    app.get('/admin/events', events.all);
    app.post('/admin/events', auth.requiresLogin, events.create);
    app.get('/admin/events/:eventId', events.show);
    app.put('/admin/events/:eventId', auth.requiresLogin, auth.admin.hasAuthorization, events.update);
    app.del('/admin/events/:eventId', auth.requiresLogin, auth.admin.hasAuthorization, events.destroy);

    //Finish with setting up the Id params
    // app.param('articleId', articles.article);
    app.param('teamId', teams.team);
    app.param('eventId', events.event);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};