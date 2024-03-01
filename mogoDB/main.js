const express = require('express')
const mongoose = require('mongoose')
const Message = require('./models/messageSchema')
const app = express();
const port = 3300;
const cors = require('cors')
require('dotenv').config();

const username = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const dataBase = encodeURIComponent(process.env.DATABASE);

let url = `mongodb+srv://${username}:${password}@cluster0.ljagamd.mongodb.net/${dataBase}`

app.use(express.json());

app.use(cors());

app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).send('GET 실패!!');
  }
});

app.post('/messages', async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(400).send('POST 실패!!!');
  }
});

app.options('*', (req, res)=> {
  res.status(200).send();
})

app.use((req, res) => {
  res.status(404).send('404 에러 발생');
});


mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`서버에 연결되었습니다. (연결 포트: ${port})`);
    });
  })
  .catch(err => {
    console.log('DB 연결에 실패했습니다.:', err);
  });