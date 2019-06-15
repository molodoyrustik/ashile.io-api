import _ from 'lodash'
import mongoose from 'mongoose'

import LogSchema from './LogSchema';

const DomainSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  channels: [],
  logs: [LogSchema],
})

export default DomainSchema
