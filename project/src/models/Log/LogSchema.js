import mongoose from 'mongoose'

const LogSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  flag: {
    type: Boolean,
  },
  status: {
    type: String,
    trimg: true,
  },
  statusText: {
    type: String,
    trimg: true,
  },
  time: {
    type: Number,
  }
})

export default LogSchema
