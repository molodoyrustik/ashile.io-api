import mongoose from 'mongoose'
import ChannelSchema from './ChannelSchema';

export default (ctx) => {
  if (!ctx.log) throw '!log'

  return  mongoose.model('Channel', ChannelSchema);
}
