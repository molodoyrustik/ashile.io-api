import mongoose from 'mongoose'

const LogSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  successRequests: [],
  errorRequests: [],
})

export default LogSchema
