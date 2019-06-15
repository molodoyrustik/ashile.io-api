import jwt from 'express-jwt'
import uniqid from 'uniqid';


export default (ctx) => {
  const User = ctx.models.User;
  const Domain = ctx.models.Domain;

  let controller = {};

  controller.domains = async function(req, res) {
    const userID = req.user.id;
    const user = await User.findOne({id: userID});

    return res.json(user.domains);
  }

  controller.create = async function(req, res) {
    const params = req.body
    if (!params.url) {
      return res.status(400).json([{signup: false, message: 'Домен не передан'}]);
    }
    if (!params.channels) {
      return res.status(400).json([{signup: false, message: 'Каналы не переданы'}]);
    }
    const { url, channels } = params;

    const userID = req.user.id;
    const user = await User.findOne({id: userID});
    const domain = new Domain({ url, id: uniqid(), channels})
    user.domains.push(domain);
    await user.save();

    return res.json([{ flag: true, message: 'Домен успешно добавлен'}]);
  }

  controller.edit = async function(req, res) {
    const params = req.body
    if (!params.url) {
      return res.status(400).json([{signup: false, message: 'Домен не передан'}]);
    }
    if (!params.id) {
      return res.status(400).json([{signup: false, message: 'Id домена не передан'}]);
    }
    const { url, id } = params;

    const userID = req.user.id;
    const user = await User.findOne({id: userID});
    user.domains.find((domain) => { return domain.id === id }).url = url;
    await user.save();

    return res.json([{ flag: true, message: 'Домен успешно изменен'}]);
  }

  controller.delete = async function(req, res) {

    if (!req.params.id) {
      return res.status(400).json([{signup: false, message: 'Id домена не передан'}]);
    }
    const { id } = req.params;

    const userID = req.user.id;
    const user = await User.findOne({id: userID});
    user.domains = user.domains.filter((domain)=>{ return domain.id != id });
    await user.save();

    return res.json([{ flag: true, message: 'Домен успешно удален'}]);
  }

  controller.logs = async function(req, res) {
    if (!req.params.domainId) {
      return res.status(400).json([{signup: false, message: 'Id домена не передан'}]);
    }
    const { domainId } = req.params;
    const userID = req.user.id;

    const user = await User.findOne({id: userID});
    if (!user) {
      return res.status(400).json([{signup: false, message: 'Пользователь не найден'}]);
    }
    const domain = user.domains.find((domain) => (domain.id === domainId));
    const { logs } = domain;

    return res.json([{ flag: true, logs }]);
  }

  return controller
}
