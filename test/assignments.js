/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Assignment = mongoose.model('Assignment');

//Globals
var user;
var assignment;

//The tests
describe('<Unit Test>', function () {
    describe('Model Assignment:', function () {
        beforeEach(function (done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function (err) {
                assignment = new Assignment({
                    name: 'Assignment Name',
                    mascot: 'Assignment Mascot',
                    division: 'Gold',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function () {
            it('should be able to save without problems', function (done) {
                return assignment.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without assignment name', function (done) {
                assignment.name = '';

                return assignment.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function (done) {
            done();
        });
    });
});