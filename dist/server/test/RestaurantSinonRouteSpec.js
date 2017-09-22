const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const app = require('../../bin/www');
const Restaurants = require('../restaurants/restaurantEntity').restaurant;
const url = supertest('/restaurants');

describe('Restaurant CRUD Testing using sinon',()=>{

  it('should get all the restaurant',(done)=>{
      var RestaurantMock = sinon.mock(Restaurants);
      var expectedResult = {status:true};

      RestaurantMock.expects('find').yields(null, expectedResult);
      Restaurants.find(function(err,result){
        RestaurantMock.verify();
        RestaurantMock.restore();
        expect(result.status).to.be.true;
        done();
      });
  });

  it('should not get the restaurants',(done)=>{
      var RestaurantMock = sinon.mock(Restaurants);
      var expectedResult = {status:false };

      RestaurantMock.expects('find').yields(expectedResult, null);
      Restaurants.find(function(err,result){
        RestaurantMock.verify();
        RestaurantMock.restore();
        expect(err.status).to.be.false;
        done();
      });
  });

it('should add new restaurant',(done)=>{
      var RestaurantMock = sinon.mock(new Restaurants({resId:5}));
      var rest = RestaurantMock.object;
      var expectedResult = {status: true};
      RestaurantMock.expects('save').yields(null, expectedResult);
      rest.save(function(err,result){
        RestaurantMock.verify();
        RestaurantMock.restore();
        expect(result.status).to.be.true;
        done();
      });
});

it('should not add new restaurant',(done)=>{
      var RestaurantMock = sinon.mock(new Restaurants({resId:5}));
      var rest = RestaurantMock.object;
      var expectedResult = {status: false};
      RestaurantMock.expects('save').yields(expectedResult, null);
      rest.save(function(err,result){
        RestaurantMock.verify();
        RestaurantMock.restore();
        expect(err.status).to.be.false;
        done();
      });
});

it('should update restaurant by Id',(done)=>{
      var RestaurantMock = sinon.mock(new Restaurants({resLoc:'bangalore'}));
      var rest = RestaurantMock.object;
      var expectedResult = {status: true};
      RestaurantMock.expects('save').yields(null, expectedResult);
      rest.save(function(err,result){
        RestaurantMock.verify();
        RestaurantMock.restore();
        expect(result.status).to.be.true;
        done();
      });
});

it('should not update restaurant by Id',(done)=>{
      var RestaurantMock = sinon.mock(new Restaurants({resLoc:'bangalore'}));
      var rest = RestaurantMock.object;
      var expectedResult = {status: false};
      RestaurantMock.expects('save').yields(expectedResult, null);
      rest.save(function(err,result){
        RestaurantMock.verify();
        RestaurantMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
});

it('should delete the restaurant',(done)=>{
    var RestaurantMock = sinon.mock(Restaurants);
    var expectedResult = {status:true};

    RestaurantMock.expects('remove').yields(null, expectedResult);
    Restaurants.remove(function(err,result){
      RestaurantMock.verify();
      RestaurantMock.restore();
      expect(result.status).to.be.true;
      done();
    });
});

it('should not delete the restaurant',(done)=>{
    var RestaurantMock = sinon.mock(Restaurants);
    var expectedResult = {status:false};

    RestaurantMock.expects('remove').yields(expectedResult, null);
    Restaurants.remove(function(err,result){
      RestaurantMock.verify();
      RestaurantMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
});

});
