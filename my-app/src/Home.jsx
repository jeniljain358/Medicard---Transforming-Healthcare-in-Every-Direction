import React,  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import chat from "../src/images/chat_png.png";
import search_f from "../src/images/search_f.png";
import upload from "../src/images/upload.png";
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { useHistory } from "react-router-dom";
import {AuthContext} from "./context/auth";
import { useContext } from 'react';

function Form() {
  const history = useHistory();
    const auth = useContext(AuthContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      email:e.target.email.value,
      password:e.target.password.value
    }

    try {
        const response = await fetch('http://localhost:5000/api/users/login',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const responseData = await response.json()

      if (!responseData.message) {
        history.push('/search')
        auth.login()

        toast.success('Login Successful!', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          transition:Zoom,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        console.log(responseData.user);
        auth.setLoggedInUser(responseData)
        console.log(auth.user);
        console.log(auth);
        console.log(auth.isLoggedIn);
      }
      else {
        toast.error(responseData.message, {
          position: "top-center",
          autoClose: 3000,
          transition:Zoom,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    } catch (e) {
      toast.error("Couldn't connect to server", {
        position: "top-center",
        autoClose: 3000,
        transition:Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
    return (
    <form onSubmit={submitHandler}>
        <div className="container">
            <div className="col">
            <input type="email" placeholder="Enter Email"  name="email" id="email" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="submit" value="Login" />
            </div>
            <div className="colg">
                <NavLink to="/register"> New User? &rarr; </NavLink>
            </div>
      </div>
    </form>

    )
}
const Home =() => {
    const [showForm, setForm] = useState(false)
    const onClick = () => setForm(true)
    const auth = useContext(AuthContext)


    return (
        <>
            <section id="header" className="d-flex align-items-center">
                <div className="container-fluid nav_bg">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="row">
                            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify- content-center flex-column">
                                {auth.isLoggedIn && (<h1>
                                     Hello {auth.user.name}! Keep your Medical data safe with <strong className="brand-name">MediCard</strong>
                                </h1>)}
                                {!auth.isLoggedIn && (<h1>
                                     Hello keep your Medical data safe with <strong className="brand-name">MediCard</strong>
                                </h1>)}
                                {/*<span className="animation">
                                <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_YEZz8Y.json"  background="transparent"  speed="1"  style={{width: '180px', height: '180px'}}  loop  autoplay></lottie-player>
                                </span>*/}
                                <h2 className="my-3">
                                    We are the team of talented developer making websites
                                </h2>
                                {!auth.isLoggedIn && (
                                <div className="mt-3">
                                    <button className="btn-get-started" onClick={onClick}> Login </button>
                                </div>)}
                           </div>
                           <div className="col-lg-6 order-1 order-lg-2 header-img">
                                {showForm ? <Form /> : <div className="animation-two"><lottie-player className="animation-two" src="https://assets2.lottiefiles.com/packages/lf20_ocGoFt.json"  background="transparent"  speed="1"  style={{width: '450px', height: '450px'}}  loop  autoplay></lottie-player></div>}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="boundary" data-aos="fade-down" data-aos-offset="400"  data-aos-duration="2000"  data-aos-once="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#24a0ed" fill-opacity="1" d="M0,128L80,149.3C160,171,320,213,480,234.7C640,256,800,256,960,245.3C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
            <h1 className="text-center" style={{color:"white",background:"#24a0ed",fontSize:'3.5em'}}><span  data-aos="zoom-in" data-aos-delay="500"  >Features We Offer</span></h1>
            <svg style={{position:'relative',bottom:'10px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#24a0ed" fill-opacity="1" d="M0,128L360,128L720,320L1080,128L1440,192L1440,0L1080,0L720,0L360,0L0,0Z"></path></svg>
            </div>


            <section className="features container">

              <div className="row"   data-aos="fade-left" style={{marginBottom:'5em'}}>
                <div className="col-lg-6 " >
                  <img style={{width:'100%',objectFit:'cover'}} src={chat}  alt= "home img" />
                </div >
                <div className="col-lg-6 card"  style={{borderLeftColor:'#24a0ed ',borderLeftWidth:'2px',borderLeftStyle:'solid'}}>
                  <h2 style={{color:'#24a0ed',marginTop:'5px'}}>Chatbot</h2>
                  <hr></hr>
                  <p style={{color:'grey',fontSize:'1.2em'}}>Medicard offers a chatbot, based on a ML model which you can use in absence of a doctor.It not only tells the disease but also prescribes the remedies which you can take up!   </p>
                </div>
              </div>

              <div className="row" data-aos="fade-right" style={{marginBottom:'5em'}}>
                <div className="col-lg-6 card"  style={{borderLeftColor:'#24a0ed ',borderLeftWidth:'2px',borderLeftStyle:'solid'}}>
                  <h2 style={{color:'#24a0ed',marginTop:'5px'}}>Upload Documents</h2>
                  <hr></hr>
                  <p style={{color:'grey',fontSize:'1.2em'}}>No need of carrying the medication files now! Login and Upload all your documents. Documents are secured using encryption algorithms.</p>
                </div>
                <div className="col-lg-6 ">
                  <img style={{width:'100%',objectFit:'cover'}} src={upload}  alt= "home img" />

                </div>
              </div>
              <div className="row" data-aos="fade-left" style={{marginBottom:'5em'}}>
                <div className="col-lg-6 ">
                  <img style={{width:'100%',objectFit:'cover'}} src={search_f}  alt= "home img" />
                </div>
                <div className="col-lg-6 card"  style={{borderLeftColor:'#24a0ed ',borderLeftWidth:'2px',borderLeftStyle:'solid'}}>
                  <h2 style={{color:'#24a0ed',marginTop:'5px'}}>Search Doctor</h2>
                  <hr></hr>
                  <p style={{color:'grey',fontSize:'1.2em'}}>Can't find a doctor? You can now search doctor at a click. This allows filtering the doctors by degree, specialization and address!</p>
                </div>
              </div>
            </section>

            <section className=" text-center" style={{background:'#393e46',height:'17em', color:'white'}}>
                <div  style={{paddingTop:'5.5em'}}>
                  <h3> Made with love ♥</h3>
                  <p style={{color:'#24a0ed'}}>© ℗ ® ™ Copyright 2021 Medicard</p>
                </div>
            </section>

        </>
    );
}
export default Home;
