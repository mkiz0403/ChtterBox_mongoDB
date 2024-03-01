import './AddChat.css'
import { useState,memo } from 'react';
import { postData } from '../Api/ChatterApi';
import styled from '@emotion/styled';


export default memo (function AddChat({ roomname, onAddChat }) {
  const [formData, setFormData] = useState({
    username: 'Taejeong',
    text: '',
  });

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newChat = {
      roomname: roomname,
      username: formData.username,
      text: formData.text,
      date: getCurrentDate(),
    };

    postData(newChat)
      .then(() => {
        onAddChat(newChat);
      })

    setFormData({
      username: 'Taejeong',
      text: '',
    });
  };


  return (
      <InputMessege>
        <input
          type="text"
          name="text"
          value={formData.text}
          placeholder="메시지를 입력하세요"
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        />
        <button onClick={onSubmit}>입력</button>
      </InputMessege>
  );
})

const InputMessege = styled.div`
width: 1000px;
margin-top:20px;
text-align: center;

  > input {
    width: 60%;
    height: 20%;
    margin: 10px;
    padding: 10px;
    border-color: #ea5936;
    border-radius: 8px;
    background-color: white;
    border: 2px solid #ea5936;
    color: black;
  }

  > button {
    width: 8%;
    height: 40px;
    background-color: #ea5936;
    border-radius: 8px;
    border: 2px solid #ea5936;
  }
`