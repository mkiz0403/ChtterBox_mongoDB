const fs = require('fs').promises;
const path = require('path');
const messagesFilePath = path.join(__dirname, 'data', 'messages.json');

const getAllMessages = async () => {
  const data = await fs.readFile(messagesFilePath, 'utf8');
  return JSON.parse(data);
};

const createMessage = async (newMessage) => {
  const messages = await getAllMessages();
  messages.push(newMessage);
  await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2));
  return newMessage;
};

module.exports = { getAllMessages, createMessage };