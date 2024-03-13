const express = require('express')
const app = express();
const mongodbRepo = require('./mongodbRepo')
const fileSystemRepo = require('./fileSystemRepo')
const cors = require('cors');
const { bootStrap } = require('./bootStrap');
const port = 3300;

require('dotenv').config();

const useMongoDB = false;

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
    const newMessage = await messageRepository.createMessage(req.body);
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


