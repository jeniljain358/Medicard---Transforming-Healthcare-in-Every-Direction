import React, { useState } from 'react';
import Dash from './Dash';
import Modal from './Modal'
import Card from './Card'
import './Data.css'



function Data() {
  const [src,setsrc] = useState('')
  const [docs,setDocs] = useState([])
    const [user,setUser] = useState([])
    const [isUserLoaded,setIsUserLoaded] = useState(false)


  const submitHandler = async (e) => {

        e.preventDefault();

        const aadhar = e.target.aadhar.value
        try {
            const response = await fetch(`http://localhost:5000/api/documents/getdetails/${aadhar}`,{
            method:'GET',
            headers: {
              'Content-Type': 'application/json'
            },

          })
          const responseData = await response.json()
          if (!responseData.message) {
            setDocs(responseData.doc)
            setUser(responseData.user)
            setIsUserLoaded(true)
          }
        } catch (e) {
          console.log(e);
        }
      }




  const clickHandler = (src) =>{
    setsrc(src)
  }

  return(
    <div className="container">

        <form onSubmit={submitHandler}>
          <input type="password"  placeholder="Enter Your Aadhar Number" name="aadhar" id="aadhar" required />
        </form>
        {isUserLoaded ?
          <>
           <div className="details card">
          <h2>{user.name} </h2>
          <p>{user.age}</p>
          <p>{user.gender}</p>
          <p>Allergies: {user.allergies}</p>
          <p>Email: {user.email}</p>
        </div>
        <h2> Recently Uploaded</h2>
        <Modal src={`http://localhost:5000/${src}`}/>
      <div className="row stack">


        {docs.map((doc)=> {
          return <Card src={doc.image} des={doc.des} clickHandler={clickHandler} />
        })}

      </div>
      </>:null}
    </div>
  )

}

export default Data;
