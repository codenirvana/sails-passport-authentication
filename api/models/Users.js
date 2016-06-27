/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  schema: true,

  attributes: {
      username: {
          type: 'string',
          unique: 'true',
          required: 'true'
      },
      password: {
          type: 'string',
          required: 'true',
          minLength: '6'
      },
      toJSON: function() {
          var obj = this.toObject();
          delete obj.password;
          return obj;
      }
  },
  beforeCreate: function(users, cb) {
      bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(users.password, salt, null, function(err, hash){
              if(err) {
                   throw err;
              } else {
                  users.password = hash;
              }
              cb();
          });
      });
  }
};
