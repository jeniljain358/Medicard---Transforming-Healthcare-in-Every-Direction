import React,  { useState } from 'react';
import breathe from "../src/images/breathe.mp4";

function Breathe() {
  return (<>
    <style> {'body {background-color:#393e46; transition: background-color 1.5s ease-in-out;}'}></style>
    <div className="container card" data-aos="zoom-in" data-aos-duration="2000" data-aos-once="ture" style={{backgroundColor:'#393e46', marginTop:'20px',marginBottom:'20px'}}>
      <h1 style={{color:'#24a0ed',fontSize:'4em'}}>What's Breathe?</h1>
      <p style={{color:'grey',fontSize:'1.5em'}}>Our developers along with the doctors have created the animation which tells the best time for which we should breath in and breath out in order to reach a calm state! </p>
    </div>
    <div className="container text-center" data-aos="zoom-in" data-aos-duration="2000" data-aos-once="ture" style={{backgroundColor:'#393e46'}}>
      <video autoplay controls loop style={{width:'80%', objectFit:'cover'}}>
        <source src={breathe} type="video/mp4"/>
        <source src={breathe} type="video/ogg"/>
        Your browser does not support the video tag.
      </video>
    </div>
  </>)
}


export default Breathe
