import _ from 'lodash';
import mongoose from 'mongoose';
import { AsyncRouter } from 'express-async-router';

export default (ctx) => {
  if (!_.has(ctx, 'controllers.Auth.signup')) throw '!controllers.Auth.signup'
  if (!_.has(ctx, 'controllers.Auth.login')) throw '!controllers.Auth.login'
  if (!_.has(ctx, 'controllers.Auth.validate')) throw '!controllers.Auth.validate'
  if (!_.has(ctx, 'controllers.Auth.forgot')) throw '!controllers.Auth.forgot'
  if (!_.has(ctx, 'controllers.Auth.checkForgotToken')) throw '!controllers.Auth.checkForgotToken'
  if (!_.has(ctx, 'controllers.Auth.reset')) throw '!controllers.Auth.reset'

	const api = AsyncRouter();

  api.all('/validate', ctx.controllers.Auth.validate);
  api.post('/signup', ctx.controllers.Auth.signup);
  api.post('/login', ctx.controllers.Auth.login);
  api.post('/forgot', ctx.controllers.Auth.forgot);
  api.get('/forgot/:forgotEmailToken', ctx.controllers.Auth.checkForgotToken);
  api.post('/reset', ctx.controllers.Auth.reset);

	return api;
}
