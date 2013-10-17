/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Event = mongoose.model('Event');

//Globals
var user;
var event;

//The tests
describe('<Unit Test>', function() {
    describe('Model Event:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                event = new Event({
                    number: 1,
                    length: 25,
                    stroke: 'Freestyle',
                    type: "Individual",
                    age: 8,
                    gender: "M",
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return event.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without event number', function(done) {
                event.number = 0;

                return event.save(function(err) {
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