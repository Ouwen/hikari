var app = require('../../app');
var request = require('supertest');
var should = require('should');
var db = require('../../db');
var User = require('./user.model');
var Auth = require('../../auth/auth.service');
var helper = require('../../test.utility').helper;

var saved_user = {};
var saved_user_token = "";

var reset = function () {
  var clear_and_populate_db = function (done) {
    db.pool.query('TRUNCATE users CASCADE', function (err, res) {
      should.not.exist(err);
      var user = {
        name: 'Test User',
        email: 'test@test.com',
        password: 'testtest'
      };

      user.salt = Auth.makeSalt();
      user.hashed_password = Auth.encryptPassword(user.password, user.salt);
      db.pool.query(`
        INSERT INTO users (name, email, hashed_password, salt)
        VALUES ($1, $2, $3, $4)
        RETURNING *`, [user.name, user.email, user.hashed_password, user.salt],
        function (err, result) {
          should.equal(result.command, 'INSERT');
          should.equal(result.rowCount, 1);
          saved_user = result.rows[0];
          saved_user_token = 'Bearer ' + Auth.signToken(saved_user.uuid);
          return done()
        }
      );
    });
  }

  before(clear_and_populate_db);
  after(clear_and_populate_db);
};

describe('User Model:', function () {
  describe('read_user()', function () {
    reset();
    it('should read a user', function (done) {
      User.read_user(saved_user.uuid).then(helper(done, function (result) {
        should.equal(result.rows[0].uuid, saved_user.uuid);
        should.equal(result.rows[0].name, saved_user.name);
        should.equal(result.rows[0].email, saved_user.email);
        done();
      })).catch(done);
    });
  });

  describe('create_user()', function () {
    reset();
    it('should save a user', function (done) {
      User.create_user({
        name: 'New User',
        email: 'new@test.com',
        password: 'testtest'
      }).then(helper(done, function (result) {
        should.equal(result.command, 'INSERT');
        should.equal(result.rowCount, 1);
        return done();
      })).catch(done);
    });

    it('should not allow duplicate emails', function (done) {
      User.create_user({
        name: 'Same User',
        email: 'test@test.com',
        password: 'testtest'
      }).then(done).catch(helper(done, function (err) {
        should.equal(err.code, 23505);
        return done();
      }));
    });

    it('should not allow malformed emails', function (done) {
      User.create_user({
        name: 'Malformed Email User',
        email: 'test.com',
        password: 'testtest'
      }).then(done).catch(helper(done, function (err) {
        should.equal(err.code, 23514);
        return done();
      }));
    });
  });

  describe('update_user()', function () {
    reset();
    it('should update a users password', function (done) {
      User.update_user(saved_user.uuid, {
        password: 'updated_password'
      }).then(helper(done, function (result) {
        should.equal(result.rows[0].uuid, saved_user.uuid);
        should.equal(result.rows[0].name, saved_user.name);
        should.notEqual(result.rows[0].salt, saved_user.salt);
        should.notEqual(result.rows[0].hashed_password, saved_user.hashed_password);
        should.notEqual(result.rows[0].updated_at, saved_user.updated_at);
        done();
      })).catch(done);
    });

    it('should not allow duplicate emails', function (done) {
      User.create_user({
        name: 'New User',
        email: 'new@test.com',
        password: 'testtest'
      }).then(function () {
        User.update_user(saved_user.uuid, {
          email: 'new@test.com'
        }).then(done).catch(helper(done, function (err) {
          should.equal(err.code, 23505);
          return done();
        }));
      }).catch(done);
    });

    it('should not allow malformed emails', function (done) {
      User.update_user(saved_user.uuid, {
        email: 'test.com'
      }).then(done).catch(helper(done, function (err) {
        should.equal(err.code, 23514);
        return done();
      }));
    });

  });

  describe('destroy_user()', function () {
    it('should destroy saved_user', function (done) {
      User.destroy_user(saved_user.uuid).then(helper(done, function (result) {
        should.equal(result.command, 'DELETE');
        should.equal(result.rowCount, 1);
        return done();
      })).catch(done);
    });
  });
});

describe('User API:', function () {
  describe('GET /core/v1.0.0/api/user/me', function () {
    reset();
    it('should get a user', function (done) {
      request(app)
        .get('/core/v1.0.0/api/users/me')
        .set('Authorization', saved_user_token)
        .expect(200)
        .end(helper(done, function (err, res) {
          should.equal(res.body.uuid, saved_user.uuid);
          should.equal(res.body.name, saved_user.name);
          should.not.exist(res.body.salt);
          should.not.exist(res.body.hashed_password);
          return done(err);
        }));
    });
  });

  describe('POST /api/users', function () {
    reset();
    it('should save a user', function (done) {
      request(app)
        .post('/core/v1.0.0/api/users')
        .send({
          name: 'New User',
          email: 'new@test.com',
          password: 'testtest'
        })
        .expect(201)
        .end(helper(done, function (err, res) {
          should.exist(res.body.token);
          return done(err);
        }));
    });

    it('should require a name param', function (done) {
      request(app)
        .post('/core/v1.0.0/api/users')
        .send({
          email: 'new@test.com',
          password: 'testtest'
        })
        .expect(400)
        .end(helper(done, function (err, res) {
          should.exist(res.error);
          return done(err);
        }));
    });

    it('should require a password param', function (done) {
      request(app)
        .post('/core/v1.0.0/api/users')
        .send({
          email: 'new@test.com',
          name: 'Test User'
        })
        .expect(400)
        .end(helper(done, function (err, res) {
          should.exist(res.error);
          return done(err);
        }));
    });

    it('should require a valid email param', function (done) {
      request(app)
        .post('/core/v1.0.0/api/users')
        .send({
          name: 'Test User',
          email: 'test.com',
          password: 'testtest'
        })
        .expect(400)
        .end(helper(done, function (err, res) {
          should.exist(res.error);
          return done(err);
        }));
    });
  });

  describe('PUT /core/v1.0.0/api/users/me', function () {
    reset();
    it('should update a user', function (done) {
      request(app)
        .put('/core/v1.0.0/api/users/me')
        .set('Authorization', saved_user_token)
        .send({
          password: 'updated_password',
          name: 'Updated User'
        })
        .expect(200)
        .end(helper(done, function (err, res) {
          should.equal(res.body.uuid, saved_user.uuid);
          should.notEqual(res.body.name, saved_user.name);
          should.notEqual(res.body.salt, saved_user.salt);
          should.notEqual(res.body.hashed_password, saved_user.hashed_password);
          should.notEqual(res.body.updated_at, saved_user.updated_at);

          return done(err);
        }));
    });

    it('should require a valid email param', function (done) {
      request(app)
        .put('/core/v1.0.0/api/users/me')
        .set('Authorization', saved_user_token)
        .send({
          email: 'test.com',
        })
        .expect(400)
        .end(helper(done, function (err, res) {
          should.exist(res.error);
          return done(err);
        }));
    });

  });

  describe('DELETE /core/v1.0.0/api/users/me', function () {
    reset();
    it('should delete a user', function (done) {
      request(app)
        .delete('/core/v1.0.0/api/users/me')
        .set('Authorization', saved_user_token)
        .expect(204)
        .end(helper(done, function (err, res) {
          return done(err);
        }));
    });
  });

});

describe('POST /core/v1.0.0/auth/local', function () {
  reset();
  it('should login a user', function (done) {
    request(app)
      .post('/core/v1.0.0/auth/local')
      .send({
        email: 'test@test.com',
        password: 'testtest'
      })
      .expect(200)
      .end(helper(done, function (err, res) {
        should.exist(res.body.token);
        return done(err);
      }));
  });
  it('should not login a user', function (done) {
    request(app)
      .post('/core/v1.0.0/auth/local')
      .send({
        email: 'test@test.com',
        password: 'wrong'
      })
      .expect(401)
      .end(helper(done, function (err, res) {
        should.exist(res.error);
        return done(err);
      }));
  });
});
