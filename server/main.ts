import express from 'express'
import mongodbRepo from './mongodbRepo'
import fileSystemRepo from './fileSystemRepo'
import cors from 'cors'
import bootStrap  from './bootStrap';
import Message from './interface';
const port = 3300;
const app = express();

const useMongoDB = true;

interface messageRepository {
  url: any;
  getAllMessages: () => Promise<Message[]>;
  createMessages: (data: Message) => Promise<Message>;
}

const messageRepository = useMongoDB ? mongodbRepo: fileSystemRepo

app.use(express.json());

app.use(cors());


app.get('/messages', async (req, res) => {
  try {
    const messages = await messageRepository.getAllMessages();
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).send('GET 실패');
  }
});

app.post('/messages', async (req, res) => {
  try {
    const newMessage = await messageRepository.createMessages(req.body as Message);
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(400).send('POST 실패');
  }
});

bootStrap(useMongoDB).then(()=>{
  app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 시작되었습니다.`);
  });
});









