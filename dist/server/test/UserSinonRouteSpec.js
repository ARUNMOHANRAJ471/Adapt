const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const app = require('../../bin/www');
const Users = require('../users/userEntity').user;
const url = supertest('/users');

describe('Users CRUD Testing using sinon',()=>{

  it('should get all the Users',(done)=>{
      var UsersMock = sinon.mock(Users);
      var expectedResult = {status:true};

      UsersMock.expects('find').yields(null, expectedResult);
      Users.find(function(err,result){
      UsersMock.verify();
      UsersMock.restore();
      expect(result.status).to.be.true;
      done();
      });
  });

  it('should not get the Users',(done)=>{
      var UsersMock = sinon.mock(Users);
      var expectedResult = {status:false };

      UsersMock.expects('find').yields(expectedResult, null);
      Users.find(function(err,result){
      UsersMock.verify();
      UsersMock.restore();
      expect(err.status).to.be.false;
      done();
      });
  });

it('should add new Users',(done)=>{
      var UsersMock = sinon.mock(new Users({username:'kohli'}));
      var user =UsersMock.object;
      var expectedResult = {status: true};
      UsersMock.expects('save').yields(null, expectedResult);
      user.save(function(err,result){
      UsersMock.verify();
      UsersMock.restore();
      expect(result.status).to.be.true;
      done();
      });
});

it('should not add new Users',(done)=>{
      var UsersMock = sinon.mock(new Users({'username':'kohli'}));
      var rest = UsersMock.object;
      var expectedResult = {status: false};
      UsersMock.expects('save').yields(expectedResult, null);
      rest.save(function(err,result){
      UsersMock.verify();
      UsersMock.restore();
      expect(err.status).to.be.false;
      done();
      });
});

it('should update Users by Id',(done)=>{
      var UsersMock = sinon.mock(new Users({password:'virat'}));
      var user = UsersMock.object;
      var expectedResult = {status: true};
      UsersMock.expects('save').yields(null, expectedResult);
      user.save(function(err,result){
        UsersMock.verify();
        UsersMock.restore();
        expect(result.status).to.be.true;
        done();
      });
});

it('should not update Users by Id',(done)=>{
      var UsersMock = sinon.mock(new Users({password:'virat'}));
      var user = UsersMock.object;
      var expectedResult = {status: false};
      UsersMock.expects('save').yields(expectedResult, null);
      user.save(function(err,result){
        UsersMock.verify();
        UsersMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
});

it('should delete the Users',(done)=>{
    var UsersMock = sinon.mock(Users);
    var expectedResult = {status:true};

    UsersMock.expects('remove').yields(null, expectedResult);
    Users.remove(function(err,result){
      UsersMock.verify();
      UsersMock.restore();
      expect(result.status).to.be.true;
      done();
    });
});

it('should not delete the Users',(done)=>{
    var UsersMock = sinon.mock(Users);
    var expectedResult = {status:false};

    UsersMock.expects('remove').yields(expectedResult, null);
    Users.remove(function(err,result){
    UsersMock.verify();
    UsersMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
});

});
