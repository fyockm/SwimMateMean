/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Meet = mongoose.model('Meet');

//Globals
var user;
var meet;

//The tests
describe('<Unit Test>', function() {
    describe('Model Meet:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                meet = new Meet({
                    date: Date.now,
                    home: "Brook Park",
                    away: "Oxford",
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save whithout problems', function(done) {
                return meet.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without meet home', function(done) {
                meet.home = '';

                return meet.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without meet away', function(done) {
                meet.away = '';

                return meet.save(function(err) {
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