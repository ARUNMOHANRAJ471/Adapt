// const should = require('chai').should();
// const supertest = require('supertest');
// const ObjId = require('mongodb').ObjectID;
//
// const app = require('../bin/www');
// const restaurants = require('../server/restaurant/restaurantEntity');
// const url = supertest('/restaurant');
//
// const restaurantObjects = [{
//   _id: new ObjId(),
//   resId: 1,
//   resLoc: 'bangalore',
//   resCusine: 'chinese'
// },
// {
//   _id: new ObjId(),
//   resId: 2,
//   resLoc: 'goa',
//   resCusine: 'tandoori'
// }];
//
// beforeEach((done)=>{
//   restaurants.remove().then(()=>{
//       return restaurants.insertMany(restaurantObjects);
//   }).then(()=>done());
// });
//
// describe('Testing for adding, updating, removing and retrieving restaurants', function(err){
//   it('should add the restaurant', function(done){
//     var resId = 3;
//     var resLoc = 'coimbatore';
//     var resCusine = 'arabian';
//     url
//         .post('/add')
//         .send({resId,resLoc,resCusine})
//         .expect(200)
//         .end(function(er, res){
//           if (err) {
// 				        throw done(err);
// 			    }
//           restaurants.find({resId}).then((docs)=>{
//             var len = docs.length;
//             len.should.equal(1);
//             done();
//           }).catch((e)=>done(e));
//         });
//   });
//
//   it('should update the restaurant', function(done){
//     var id = restaurantObjects[0]._id.toHexString();
//     var resLoc = 'salem';
//     url
//         .put(`/update/${id}`)
//         .send({resLoc})
//         .expect(200)
//         .end(function(err,res){
//           if (err) {
//                 throw done(err);
//           }
//           res.body.resLoc.should.equal(resLoc);
//           done();
//         });
//   });
//
//   it('should delete the restaurant', function(done){
//     var id = restaurantObjects[1]._id.toHexString();
//     url
//         .delete(`/delete/${id}`)
//         .expect(200)
//         .end(function(err,res){
//           if (err) {
//                 throw done(err);
//           }
//           restaurants.find().then((docs)=>{
//             var len = docs.length;
//             len.should.not.equal(2);
//             len.should.equal(1);
//             done();
//           });
//
//         });
//   });
//
//   it('should get all the restaurants', function(done){
//     url
//         .get('/')
//         .expect(200)
//         .end(function(err,res){
//           if (err) {
//                 throw done(err);
//           }
//           restaurants.find().then((docs)=>{
//             var len = docs.length;
//             len.should.equal(2);
//             done();
//           });
//
//         });
//   });
//
// });
