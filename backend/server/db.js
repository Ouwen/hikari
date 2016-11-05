var config = require('./config/environment');
var url = require('url');
var Pool = require('pg').Pool;
var raw_schema = require('./schema.json');
var _ = require('lodash');
var sql = require('sql');

const params = url.parse(config.conString);
const auth = params.auth.split(':');
const dbconfig = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: false
};
const pool = new Pool(dbconfig);

pool.on('error', function (error, client) {
  console.log('PgPool Error: ', error);
});

pool.connect(function (err, client, done) {
  if (err) return done(err)
  console.log('Successfully made test connection to database.');
  done();
});

var schema = {}
raw_schema.map(function (ele) {
  return _.pick(ele, ['table_name', 'column_name']);
}).forEach(function (ele) {
  if (!schema[ele.table_name]) {
    schema[ele.table_name] = {
      name: ele.table_name,
      columns: [],
      sql: {}
    };
  }
  schema[ele.table_name].columns.push(ele.column_name);
});

sql.setDialect('postgres');

Object.keys(schema).forEach(function (name) {
  schema[name].sql = sql.define({
    name: name,
    columns: schema[name].columns
  });
});

exports.pool = pool;
exports.schema = schema;
