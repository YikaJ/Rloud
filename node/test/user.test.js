/**
 * Created by YikaJ on 15/11/20.
 */
'use strict';
require('../models/db_connect');
let should = require('should');
let User = require('../models/UserModel');

let userData = {
  username: "mocha",
  email: "mocha@yika.com",
  password: "xxxxxx"
};

describe("User", function(){
  /**
   * 测试是否能正常添加用户
   */
  describe("#add", function(){
    let ud = JSON.parse(JSON.stringify(userData));

    before((done)=>{
      new User(ud).save(done);
    });

    after((done)=>{
      User.remove({email: "mocha@yika.com"}, done);
    });

    it("should have a user named mocha", function(done){
      User
        .findOne({email: "mocha@yika.com"})
        .then((user)=>{
          user.should.be.an.Object();
          user.username.should.equal('mocha');
          done();
        }, (err)=>{
          done(err);
        })
    });
  });

  /**
   * 不可添加
   */
  describe("#can not add", function(){
    // 密码长度
    describe("password", function(){

      it("can't add new User cause password size", function(done){
        let ud = JSON.parse(JSON.stringify(userData));
        ud.password = "mocha";
        new User(ud)
          .save()
          .then(()=>{
            User.remove({email: "mocha@yika.com"}).then(()=>{
              done(new Error("test failed.!"));
            });
          }, (err)=>{
            err.should.be.a.Error();
            return done();
          });
      });

      it("can't add new User cause password wrong type", function(done){
        let ud = JSON.parse(JSON.stringify(userData));
        ud.password = "mocha..@h";
        new User(ud)
          .save()
          .then(()=>{
            User.remove({email: "mocha@yika.com"}).then(()=>{
              done(new Error("test failed"));
            });
          }, (err)=>{
            err.should.be.a.Error();
            return done();
          });
      });
    });

    describe("username", function(){
      // wrong size
    	it("can't add new User cause username min-size", function(done){
        saveUserOfName("x", done);
      });

      it("can't add new User cause username max-size", function(done){
        saveUserOfName("xasdsadsadasdsadsadasdasdasaxasd", done);
      });

      // wrong type
      it("can't add new User cause username type", function(done){
        saveUserOfName("@x.@", done);
      });

      it("can't add new User cause username trim", function(done){
        saveUserOfName(" mochasx ", done);
      });

      function saveUserOfName(username, done){
        let ud = JSON.parse(JSON.stringify(userData));
        ud.username = username;
        new User(ud)
          .save()
          .then(()=>{
            User.remove({email: "mocha@yika.com"}).then(()=>{
              done(new Error("test failed"));
            });
          }, (err)=>{
            err.should.be.an.Error();
            return done();
          });
      }
    });
  });
});

