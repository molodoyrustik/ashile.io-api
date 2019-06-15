import _ from 'lodash'
import mongoose from 'mongoose'

const ChannelSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  endpoint: {
    type: String,
    trim: true,
  }
})

export default ChannelSchema;
