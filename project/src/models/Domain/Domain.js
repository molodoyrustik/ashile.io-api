import mongoose from 'mongoose'
import DomainSchema from './DomainSchema';

export default (ctx) => {
  if (!ctx.log) throw '!log'

  return  mongoose.model('Domain', DomainSchema);
}
