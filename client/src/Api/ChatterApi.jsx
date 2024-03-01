import axios from "axios";

const apiUrl = "http://127.0.0.1:3300/messages";

export function getData(){
  return axios.get(apiUrl)
  .then((res)=> (res.data))
}

export function postData({roomname, text}) {
  return axios.post(apiUrl, {
    roomname: roomname,
    username: 'Taejeong',
    text: text,
  })
  .then((res) => {
    res.data;
  })
}




