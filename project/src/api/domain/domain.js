import _ from 'lodash';
import mongoose from 'mongoose';
import { AsyncRouter } from 'express-async-router';

export default (ctx) => {
  if (!_.has(ctx, 'controllers.Domain.domains')) throw '!controllers.Domain.domains'
  if (!_.has(ctx, 'controllers.Domain.create')) throw '!controllers.Domain.create'
  if (!_.has(ctx, 'controllers.Domain.delete')) throw '!controllers.Domain.delete'
  if (!_.has(ctx, 'controllers.Domain.edit')) throw '!controllers.Domain.edit'
  if (!_.has(ctx, 'controllers.Domain.logs')) throw '!controllers.Domain.logs'

	const api = AsyncRouter();

  api.get('/', ctx.controllers.Domain.domains);
  api.post('/', ctx.controllers.Domain.create);
  api.delete('/:id', ctx.controllers.Domain.delete);
  api.put('/', ctx.controllers.Domain.edit);
  api.get('/:domainId/logs', ctx.controllers.Domain.logs);

	return api;
}
