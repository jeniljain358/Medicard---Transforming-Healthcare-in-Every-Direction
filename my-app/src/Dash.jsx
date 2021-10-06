import React, { useState,useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import './Dash.css'
import Modal from './Modal'
import Card from './Card'
import { useContext } from 'react';
import {AuthContext} from "./context/auth";



function Dash() {
  let auth = useContext(AuthContext)
  const [src,setsrc] = useState('')
  const [date,setDate] = useState('')
  const [docs,setDocs] = useState([])

  useEffect(() => {
    const getRequest = async () => {
      try {
          const response = await fetch(`http://localhost:5000/api/documents/users/${auth.user.id}`)
          const responseData = await response.json()
          if (responseData.message) {
            console.log(responseData.message);
          }else {
            setDocs(responseData.doc)
            console.log(responseData.doc);
          }
      }catch (e) {
        console.log(e);
      }
    }
    getRequest()

},[])



  const clickHandler = (src,date) =>{
    setsrc(src)
    setDate(date)
  }

  if (!auth.isLoggedIn) {
    return <Redirect to='/' />
  }
  return(
    <div className="container">
        <h2> Recently Uploaded</h2>
        <Modal src={`http://localhost:5000/${src}`} date={date}/>
      <div className="row stack">


        {docs.map((doc)=> {
          return <Card src={doc.image} des={doc.des} date={doc.date} clickHandler={clickHandler} />
        })}

      </div>
    </div>
  )
}

export default Dash;
