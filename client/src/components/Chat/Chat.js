import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://live-box-back.onrender.com';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');      
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
   
    const {name,room} = queryString.parse(window.location.search);
    

    socket = io(ENDPOINT,{ transports: ['websocket'] });
    setRoom(room);
    setName(name);
    socket.emit('join', { name, room },()=>{
        
    });


  }, [ENDPOINT, window.location.search]);
  
  useEffect(() => {

    // When a 'message' event occurs, it updates the messages state with the new message. 
    socket.on('message', (message) => { 
      setMessages([ ...messages, message ]);
    });
    // When a 'roomData' event occurs, it updates the users state with the current list of users in the chat room.
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
}, [messages]);



  // when the user submits a message. It emits a event to the server with the message content.
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }


 
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
