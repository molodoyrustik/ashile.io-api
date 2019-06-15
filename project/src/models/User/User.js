import _ from 'lodash'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Promise from 'bluebird'
const bcryptGenSalt = Promise.promisify(bcrypt.genSalt)
const bcryptHash = Promise.promisify(bcrypt.hash)
const bcryptCompare = Promise.promisify(bcrypt.compare)
import mongoose from 'mongoose'
import uniqid from 'uniqid';

import DomainSchema from '../Domain/DomainSchema';
import ChannelSchema from '../Channel/ChannelSchema';

export default (ctx) => {
  if (!ctx.log) throw '!log'

  const schema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    domains: [DomainSchema],
    channels: [ChannelSchema],
  }, {
    collection: 'user',
    timestamps: true,
  })

  schema.statics.isValidEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }
  schema.statics.generatePassword = function (length = 10) {
    return Math.random().toString(36).substr(2, length)
  }
  schema.methods.toJSON = function () {
    return _.omit(this.toObject(), ['password'])
  }
  schema.methods.getIdentity = function (params) {
    const object = _.pick(this.toObject(), ['_id', 'email', 'id'])
    if (!params) return object
    return Object.assign(object, params)
  }
  schema.methods.generateAuthToken = function (params) {
    return jwt.sign(this.getIdentity(params), ctx.config.jwt.secret)
  }
  schema.methods.verifyPassword = async function (password) {
    return await bcryptCompare(password, this.password)
  }

  const SALT_WORK_FACTOR = 10
  schema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    return bcryptGenSalt(SALT_WORK_FACTOR)
    .then(salt => {
      bcryptHash(this.password, salt)
      .then(hash => {
        this.password = hash
        next();
      })
    })
    .catch(next)
  });

  return mongoose.model('User', schema);
}
