'use strict';

var crypto = require('crypto'),
  pg = require('pg'),
  db = require('../../db'),
  _ = require('lodash'),
  Auth = require('../../auth/auth.service');

module.exports = class User {
  static read_user(user_uuid) {
    var builder = db.schema.users.sql.select().where({
      uuid: user_uuid
    });

    return db.pool.query(builder.toQuery().text, builder.toQuery().values)
  }

  static create_user(user) {
    user.salt = Auth.makeSalt();
    user.hashed_password = Auth.encryptPassword(user.password, user.salt);
    delete user.password;

    var builder = db.schema.users.sql.insert(user).returning();
    return db.pool.query(builder.toQuery().text, builder.toQuery().values)
  }

  static update_user(user_uuid, user) {
    if (user.password) {
      user.salt = Auth.makeSalt();
      user.hashed_password = Auth.encryptPassword(user.password, user.salt);
      delete user.password;
    }
    user.updated_at = new Date();

    var builder = db.schema.users.sql.update(user).where({
      uuid: user_uuid
    }).returning();

    return db.pool.query(builder.toQuery().text, builder.toQuery().values);
  }

  static destroy_user(user_uuid) {
    var builder = db.schema.users.sql.delete().where({
      uuid: user_uuid
    });

    return db.pool.query(builder.toQuery().text, builder.toQuery().values);
  }
};
