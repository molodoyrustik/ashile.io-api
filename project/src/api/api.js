import mongoose from 'mongoose';
import { AsyncRouter } from 'express-async-router';
import expressJwt from 'express-jwt';
import uniqid from 'uniqid';
import getAuth from './auth/auth';
import getDomain from './domain/domain';
import getChannel from './channel/channel';

export default (ctx) => {
	const api = AsyncRouter();

  api.all('/', () => ({ok: true, version: '1.0.1'}))

  api.use('/auth', getAuth(ctx));
	api.use('/domains', expressJwt({secret: ctx.config.jwt.secret}), getDomain(ctx));
	api.use('/channels', expressJwt({secret: ctx.config.jwt.secret}), getChannel(ctx));

	// api.use('/', (err, req, res, next) => {
	// 	return res.status(401).json([{ flag: false, message: 'Не авторизован' }])
	// })

	return api;
}
