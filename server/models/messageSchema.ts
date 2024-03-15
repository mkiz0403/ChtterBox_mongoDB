import mongoose, { Schema, Model } from 'mongoose'; 
import MessageInterface from '../interface'

interface IMessage extends Document, MessageInterface {}

const messageSchema:Schema = new Schema({
  username: { type: String, required: true },
  roomname: { type: String, required: true },
  text: { type: String, required: true },
  createdTime: { type : Date, default: Date.now }
})

const MessageModel: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);

export default MessageModel;
