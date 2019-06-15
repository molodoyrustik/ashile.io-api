import jwt from 'express-jwt'
import uniqid from 'uniqid';


export default (ctx) => {
  const User = ctx.models.User;
  const Channel = ctx.models.Channel;

  let controller = {};

  controller.getChannels = async function(req, res) {
    const userID = req.user.id;
    const user = await User.findOne({id: userID});

    return res.json(user.channels);
  }

  controller.create = async function(req, res) {
    const params = req.body;

    if (!params.type) {
      return res.status(400).json([{flag: false, message: 'type не передан'}]);
    }
    if (!params.endpoint) {
      return res.status(400).json([{flag: false, message: 'endpoint не передан'}]);
    }
    const { type, endpoint } = params;

    const userID = req.user.id;
    const user = await User.findOne({id: userID});
    const channel = new Channel({ id: uniqid(), type, endpoint })
    user.channels.push(channel);
    await user.save();

    return res.json([{ flag: true, message: 'Channel успешно добавлен'}]);
  }

  controller.edit = async function(req, res) {
    const params = req.body;

    if (!params.type) {
      return res.status(400).json([{flag: false, message: 'type не передан'}]);
    }
    if (!params.endpoint) {
      return res.status(400).json([{flag: false, message: 'endpoint не передан'}]);
    }
    const { type, endpoint } = params;

    const userID = req.user.id;
    const user = await User.findOne({id: userID});
    channel = user.channels.find((channel) => { return channel.id === id })
    channel.type = type;
    channel.endpoint = endpoint;
    await user.save();

    return res.json([{ flag: true, message: 'Канал успешно изменен'}]);
  }

  controller.delete = async function(req, res) {

    if (!req.params.id) {
      return res.status(400).json([{flag: false, message: 'Id канала не передан'}]);
    }
    const { id } = req.params;

    const userID = req.user.id;
    const user = await User.findOne({id: userID});
    user.channels = user.channels.filter((channel)=>{ return channel.id != id });
    await user.save();

    return res.json([{ flag: true, message: 'Канал успешно удален'}]);
  }



  return controller
}
