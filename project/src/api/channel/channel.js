import _ from 'lodash';
import mongoose from 'mongoose';
import { AsyncRouter } from 'express-async-router';

export default (ctx) => {
  if (!_.has(ctx, 'controllers.Channel.getChannels')) throw '!controllers.Channel.getChannels'
  if (!_.has(ctx, 'controllers.Channel.create')) throw '!controllers.Channel.create'

	const api = AsyncRouter();

  api.get('/', ctx.controllers.Channel.getChannels);
  api.post('/', ctx.controllers.Channel.create);
  api.put('/', ctx.controllers.Channel.edit);
  api.delete('/:id', ctx.controllers.Channel.delete);

	return api;
}
