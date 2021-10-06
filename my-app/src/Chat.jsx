import React,  { useState } from 'react';
import './Chat.css'

function Chat() {
  const [chatList,setchatList]=useState([
    {message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, s",source:"bot"},
    {message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, s",source:"user"},
    {message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, s",source:"bot"},
    {message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, s",source:"user"},
    {message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, s",source:"bot"},
    {message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, s",source:"user"},
  ])
  const [newMessage,setnewMessage]=useState('')


function addMessage(e) {
  e.preventDefault()
  setchatList((chatList)=>[...chatList,{message:newMessage,source:'user'}])
  setnewMessage('')
}

function onchange(e) {
  setnewMessage(e.target.value)
  console.log(newMessage)
}

  return(
    <div className="chat">
      <h4 className="chatTitle">
          Welcome! Tell me how do ypu feel
      </h4>
       <div className="chatArea">
        {  chatList.map((chat)=>{
            if (chat.source==='bot') {
              return <span className='botchat'>{chat.message}</span>
            }
            else {
              return <span className='userchat'>{chat.message}</span>
            }
          })}
       </div>
       <form onSubmit={addMessage}>
       <div className="input-group input-group-lg chatType">
         <input onChange={onchange} value={newMessage} name='message' type="text" placeholder="Search by name"  className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
       </div>
       </form>
    </div>
  )
}


export default Chat;
