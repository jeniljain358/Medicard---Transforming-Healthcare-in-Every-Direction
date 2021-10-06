import React from 'react';
import './upload.css';
import { useHistory } from "react-router-dom";
import {Redirect} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "./context/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

const Upload =() => {
  const history = useHistory();
  let auth = useContext(AuthContext)
  if (!auth.isLoggedIn) {
    return <Redirect to='/' />
  }

  const submitHandler = async (e) => {
        e.preventDefault();

        console.log(e.target.image.files[0]);

        try {
          const formData = new FormData()
          formData.append('title',e.target.title.value)
          formData.append('des',e.target.des.value)
          formData.append('creator',auth.user.id)
          formData.append('image',e.target.image.files[0])
          console.log(formData);
          const response = await fetch('http://localhost:5000/api/documents/',{
          method:'POST',
          body:formData
          })
          const responseData = await response.json()
          if (!responseData.message) {
            history.push('/dash')
            toast.success("Uploaded Successfully!", {
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
          console.log(responseData);
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
        <>
          <div className="container upload">
            <form onSubmit={submitHandler} enctype="multipart/form-data">
              <div class="form-group">
                <label for="exampleInputTitle">Title</label>
                <input type="text" className="form-control" id="exampleInputTitle" name="title" aria-describedby="exampleInputTitle" placeholder="Enter title of the doc"/>

              </div>


              <div class="form-group">
                <label for="exampleInputPassword1">Description</label>
                <br/>
                <textarea className="form-control" id="exampleFormControlTextarea1" name="des" placeholder="Enter the description" rows="3"></textarea>
              </div>

              <div class="custom-file">
                <label class="custom-file-label" for="customFile">Choose file</label>
                <input type="file" name="image" class="custom-file-input" id="customFile"/>
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </>

    );
};

export default Upload;
