import mongoose from 'mongoose'
import LogSchema from './LogSchema';

export default (ctx) => {
  if (!ctx.log) throw '!log'

  return  mongoose.model('Log', LogSchema);
}
