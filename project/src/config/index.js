global.__DEV__ = true;
// __STAGE__
global.__PROD__ = false;

export default {
  name: 'Your super app',
  port: 3001,
  db: {
    url: 'mongodb://localhost/test',
  },
  jwt: {
    secret: 'YOUR_SECRET',
  },
  nodemailer: {
    service: 'mail',
    host: 'smtp.mail.ru',
    auth: {
      user: 'molodoyrustik@mail.ru',
      pass: 'molodoy'
    }
  },
};
