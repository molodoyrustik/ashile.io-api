import _ from 'lodash'
import uniqid from 'uniqid';
import mongoose from 'mongoose';


export default (ctx) => {
  if (!ctx.log) throw '!log'

  const schema = new mongoose.Schema({
    id: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    maxDomains: {
      type: Number,
    },
    maxChannels: {
      type: Number,
    },
  }, {
    collection: 'rate',
    timestamps: true,
  })

  return  mongoose.model('Rate', schema);
}
