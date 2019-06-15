import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

export default (ctx) => {
  if (!ctx.log) throw '!log'

  const transporter = nodemailer.createTransport(smtpTransport(ctx.config.nodemailer));

  return  transporter;
}
