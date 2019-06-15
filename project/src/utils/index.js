import Transporter from './Nodemailer/index';

export default function () {
  return {
    Transporter: Transporter(...arguments),
  }
}
