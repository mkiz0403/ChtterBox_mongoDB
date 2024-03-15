import MessageModel from './models/messageSchema'
import dotenv from 'dotenv'

dotenv.config();

const username = encodeURIComponent(process.env.USERNAME || ''); // 해당 데이터가 없을 경우 '' 빈 문자열로 처리 (프로그램 작동에 오류가 발생하지 않게하기 위함.)
const password = encodeURIComponent(process.env.PASSWORD || '');
const dataBase = encodeURIComponent(process.env.DATABASE || '');

const url: string = `mongodb+srv://${username}:${password}@cluster0.ljagamd.mongodb.net/${dataBase}`;

const getAllMessages = async (): Promise<any[]> => {
  return await MessageModel.find();
};

const createMessages = async (data:any): Promise<any> => {
  const message = new MessageModel(data);
  return await message.save();
}

const mongodbRepo={url, getAllMessages, createMessages};

export default mongodbRepo;
