import { promises as fs } from 'fs';
import path from 'path';
import Message from './interface'


const messagesFilePath = path.join(__dirname, 'data', 'messages.json');

const getAllMessages = async (): Promise<Message[]> => {
  const data = await fs.readFile(messagesFilePath, 'utf8');
  return JSON.parse(data);
};

const createMessages = async (newMessage: Message): Promise<Message> => {
  const messages = await getAllMessages();
  messages.push(newMessage);
  await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2));
  return newMessage;
};

export default{ getAllMessages, createMessages };




