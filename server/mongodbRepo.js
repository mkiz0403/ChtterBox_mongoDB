const messagesInterface = require('./models/messageSchema');
require('dotenv').config();

const username = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const dataBase = encodeURIComponent(process.env.DATABASE);

const url = `mongodb+srv://${username}:${password}@cluster0.ljagamd.mongodb.net/${dataBase}`;

const getAllMessages = async () => {
  return await messagesInterface.find();
};

const createMessage = async (data) => {
  const message = new messagesInterface(data);
  return await message.save();
};

module.exports = { url, getAllMessages, createMessage };