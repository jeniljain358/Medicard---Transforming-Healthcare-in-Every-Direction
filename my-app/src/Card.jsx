import React,  { useState } from 'react';


function Card(props) {

  return(
    <div className="col-lg-4" >
      <div className="card card-item" data-toggle="modal" data-target="#exampleModal" onClick={()=>props.clickHandler(props.src,props.date)}>
        <img src={`http://localhost:5000/${props.src}`} className="card-img-top" alt="..." />
        <div className="card-body">
        <p className="card-text">{props.des}</p>
        </div>
      </div>

    </div>
  )
}


export default Card
