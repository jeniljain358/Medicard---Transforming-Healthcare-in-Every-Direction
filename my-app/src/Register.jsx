import React,  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import web from "../src/images/img3.svg";
import { useHistory } from "react-router-dom";
import {AuthContext} from "./context/auth";
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

function Function() {
    return(
        <>
        <div className="para">submitHandler
            <label for="Degree">Select Degree&nbsp;&nbsp;&nbsp;</label>
            <select id="Degree" name="degree">
                <option value="MBBS">MBBS</option>
                <option value="BDS">BDS</option>
                <option value="BHMS">BHMS</option>
                <option value="BAMS ">BAMS</option>
                <option value="BUMS ">BUMS</option>
                <option value="DHMS ">DHMS</option>
                <option value="B.V.Sc">B.V.Sc & AH</option>
                <option value="B.Pharm">B.Pharm</option>
                <option value="D. Pharma">D. Pharma</option>
                <option value="BOT">BOT</option>
                <option value="BMLT">BMLT</option>
                <option value="BPT">BPT</option>
                <option value="B.Sc. Nursing">B.Sc. Nursing</option>
                <option value="BNYS">BNYS</option>
            </select>
            <br/>


            <label for="Specialization">Select Specialization &nbsp;&nbsp;</label>
            <select id="Specialization" name="specialization">
                <option value="Allergists/Immunologists">Allergists/Immunologists</option>
                <option value="Anesthesiologists">Anesthesiologists </option>
                <option value="Cardiologists">Cardiologists </option>
                <option value="Colon and Rectal Surgeons">Colon and Rectal Surgeons  </option>
                <option value="Dermatologists">DermatologistsMS </option>
                <option value="Endocrinologists">Endocrinologists  </option>
                <option value="Family Physicians">Family Physicians</option>
                <option value="Gastroenterologists">Gastroenterologists </option>
                <option value="Hematologists ">Hematologists </option>
                <option value="Neurologist">Neurologist</option>
                <option value="Nephrologist">Nephrologist</option>
                <option value="Obstetrician and Gynecologist">Obstetrician and Gynecologist</option>
                <option value="Oncologist">Oncologist</option>
                <option value="Ophthalmologist">Ophthalmologist</option>
            </select>
            </div>
        </>
    )
}

const Register =() => {
    const [showForm, setForm] = useState(false)
    const [submit,setSubmit] = useState(false)
    const history = useHistory();
    const onClick = () => {
      if (showForm) {
        setForm(false)
      }else {
      setForm(true)
      }
    }
    const auth = useContext(AuthContext)

    const submitHandler = async (e) => {
      e.preventDefault();

      if (!showForm) {
          const user = {
            name:e.target.name.value,
            age:e.target.age.value,
            gender:e.target.gender.value,
            email:e.target.email.value,
            allergies:e.target.allergies.value,
            password:e.target.psw.value,
            aadhar:e.target.aadhar.value,

          }

          try {
              const response = await fetch('http://localhost:5000/api/users/signup',{
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
              toast.success("Registered Successfully!", {
                position: "top-center",
                autoClose: 3000,
                transition:Zoom,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
              console.log(responseData.user)
              auth.setLoggedInUser(responseData)
              console.log(auth.user);
              console.log(auth.isLoggedIn);
            }else if (response.message==undefined) {
              toast.error('Invalid input passed!', {
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
            else {
              console.log(response.message);
              toast.error(response.message, {
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
      else {
         const formData = new FormData()
         formData.append('name',e.target.name.value)
         formData.append('gender',e.target.gender.value)
         formData.append('degree',e.target.degree.value)
         formData.append('email',e.target.email.value)
         formData.append('contact',e.target.contact.value)
         formData.append('clinic_add',e.target.clinic_add.value)

         formData.append('votes',0)
         formData.append('specialization',e.target.specialization.value)
         formData.append('cert',e.target.cert.files[0])

        try {
            const response = await fetch('http://localhost:5000/api/doctors/signup',{
            method:'POST',
            body:formData
          })
          const responseData = await response.json()
          if (!responseData.message) {
            toast.success('Registration successfull!', {
              position: "top-center",
              autoClose: 3000,
              transition:Zoom,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            history.push('/')
          }
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




    }
    return (
        <>
            <section id="header" className="d-flex align-items-center">
                <div className="container-fluid nav_bg">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="row">
                            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify- content-center flex-column">
                            <form onSubmit={submitHandler}>
                            <div className="container">
                                    <h1>Register</h1>
                                    <hr/>
                                    <input type="text" placeholder="Enter Name" name="name" id="name" required />
                                    {showForm ? null : <input type="text" placeholder="Enter Age" name="age" id="age" required /> }
                                    <input type="text" placeholder="Enter Gender" name="gender" id="gender" required />
                                    {showForm ? null : <input type="password" title="This number will be used by doctor to view your medical records" placeholder="Enter Your Aadhar Number" name="aadhar" id="aadhar" required /> }
                                    <input type="text" placeholder="Enter Email" name="email" id="email" required />
                                    {showForm ? <input type="number" placeholder="Enter your contact" name="contact" id="contact" required /> : <input type="text" placeholder="Allergies if any" name="allergies" id="allergies" /> }
                                    {showForm ? <input type="text" placeholder="Enter your clinic address" name="clinic_add" id="clinic_add" required /> : <input type="password" placeholder="Enter Password" name="psw" id="psw" required /> }
                                    {showForm ? null : <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required /> }
                                    {showForm ? <>
                                      <label class="custom-file-label" for="customFile">Upload certificate</label>
                                      <input type="file" name="cert" class="custom-file-input" id="customFile"/></>:null
                                    }
                                    <br/>
                                    <br/>

                                    <div className="row">
                                      <div className='col'><label>Registering as a Doctor?</label></div>
                                      <div className='col'><input className="checkbox" type="checkbox" onClick={onClick}/></div>
                                    </div>

                                    {showForm ? <Function /> : null }
                                    <p>By creating an account you agree to our <NavLink to="#">Terms & Privacy</NavLink>.</p>
                                    <button type="submit" className="registerbtn">Register</button>
                                </div>
                                <div className="signin">
                                    <p>Already have an account? <NavLink to="/">Sign in</NavLink>.</p>
                                </div>
                            </form>
                           </div>
                           <div className="col-lg-6 order-1 order-lg-2 header-img">
                                <img src={web} className="img-fluid" alt= "home img" />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
