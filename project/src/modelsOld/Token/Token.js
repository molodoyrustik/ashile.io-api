import mongoose from 'mongoose'

export default (ctx) => {
  if (!ctx.log) throw '!log'

  const schema = new mongoose.Schema({
    id: {
      type: String,
      trim: true,
    },
    userID: {
      type: String,
      trim: true,
    },
    forgotEmailToken: {
      type: String,
      trim: true,
    },
  }, {
    collection: 'token',
    timestamps: true,
  })

  return mongoose.model('Token', schema);
}
