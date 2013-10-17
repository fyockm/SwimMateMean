/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Roster = mongoose.model('Roster');

//Globals
var user;
var roster;

//The tests
describe('<Unit Test>', function() {
    describe('Model Roster:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                roster = new Roster({
                    firstName: 'Mason',
                    lastName: "Fyock",
                    age: 8,
                    gender: "M",
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return roster.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without first name', function(done) {
                roster.firstName = '';

                return roster.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without last name', function(done) {
                roster.lastName = '';

                return roster.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            done();
        });
    });
});