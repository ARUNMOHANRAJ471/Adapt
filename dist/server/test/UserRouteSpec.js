// const should = require('chai').should();
// const supertest = require('supertest');
// const ObjId = require('mongodb').ObjectID;
//
// const app = require('../bin/www');
// const user = require('../server/users/userEntity');
// const url = supertest('/users');
//
// const userObjects = [{
//   _id: new ObjId(),
//   username: 'virat',
//   password: 'kohli'
// },
// {
//   _id: new ObjId(),
//   username: 'vibakar',
//   password: 'viba'
// }];
//
// beforeEach((done)=>{
//   user.remove().then(()=>{
//       return user.insertMany(userObjects);
//   }).then(()=>done());
// });
//
// describe('Testing for adding, updating, removing and retrieving users', function(err){
//   it('should add the user', function(done){
//     var username = 'viba';
//     var password = 'viba';
//     url
//         .post('/add')
//         .send({username,password})
//         .expect(200)
//         .end(function(er, res){
//           if (err) {
// 				        throw done(err);
// 			    }
//           user.find({username}).then((docs)=>{
//             var len = docs.length;
//             len.should.equal(1);
//             done();
//           }).catch((e)=>done(e));
//         });
//   });
//
//   it('should update the user', function(done){
//     var id = userObjects[0]._id.toHexString();
//     var password = 'chikoo';
//     url
//         .put(`/update/${id}`)
//         .send({password})
//         .expect(200)
//         .end(function(err,res){
//           if (err) {
//                 throw done(err);
//           }
//           res.body.password.should.equal(password);
//           done();
//         });
//   });
//
//   it('should delete the user', function(done){
//     var id = userObjects[1]._id.toHexString();
//     url
//         .delete(`/delete/${id}`)
//         .expect(200)
//         .end(function(err,res){
//           if (err) {
//                 throw done(err);
//           }
//           user.find().then((docs)=>{
//             var len = docs.length;
//             len.should.not.equal(2);
//             len.should.equal(1);
//             done();
//           });
//
//         });
//   });
//
//   it('should get all the user', function(done){
//     url
//         .get('/')
//         .expect(200)
//         .end(function(err,res){
//           if (err) {
//                 throw done(err);
//           }
//           user.find().then((docs)=>{
//             var len = docs.length;
//             len.should.equal(2);
//             done();
//           });
//
//         });
//   });
//
// });
