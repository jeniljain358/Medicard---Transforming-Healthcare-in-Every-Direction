import React, {useState} from 'react';
import { BsSearch } from 'react-icons/bs'
import './Search.css'
import {Redirect} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "./context/auth";
import { useHistory } from "react-router-dom";
import web from "../src/images/search.svg";
import { Link } from 'react-router-dom';

function Search() {
  const [search,setSearch] = useState(false)

    const [load,setLoad] = useState(false)
  const [docArray,setDocArray] = useState([])



  const history = useHistory();
  const auth = useContext(AuthContext)
  if (!auth.isLoggedIn) {
    return <Redirect to='/' />
  }

  const submitHandler = async (e) => {

        e.preventDefault();

        const doctor = {
          clinic_add:e.target.address.value,
          specialization:e.target.specialization.value,
          degree:e.target.degree.value
        }

        try {
            const response = await fetch(`http://localhost:5000/api/doctors/search?clinic_add=${doctor.clinic_add}&specialization=${doctor.specialization}&degree=${doctor.degree}`,{
            method:'GET',
            headers: {
              'Content-Type': 'application/json'
            },

          })
          const responseData = await response.json()
          if (!responseData.message) {
            setSearch(true)
            setLoad(false)
            setDocArray(responseData.doctor)
          }
          console.log(responseData.doctor);
        } catch (e) {
          console.log(e);
        }
    }
    const onchangeLoad = ()=>{

        setLoad(true)
        setSearch(true)


    }

  return(
    <div className="container  search-header">
    <form onSubmit={submitHandler}>
    <div className="row">

      <div className="col">
        <div className="input-group input-group-lg">
        <BsSearch className="search-icon" size='2.3rem'/>
          <input name="address" onChange={onchangeLoad} type="text" placeholder="Search by address" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
        </div>
      </div>
      <div className="col">
        <label for="specialization">Filter by </label>
        <select id="specialization" name="specialization">
            <option value="Select Specialization" selected>Select Specialization</option>
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
      <div className="col">

        <select id="degree" name="degree">
            <option value="Select degree" selected>Select degree</option>
            <option value="MBBS">MBBS</option>
            <option value="BDS">BDS</option>
            <option value="BHMS">BHMS</option>
            <option value="BAMS ">BAMS  </option>
            <option value="BUMS "> BUMS </option>
            <option value="DHMS ">DHMS </option>
            <option value="B.V.Sc">B.V.Sc & AH</option>
            <option value="B.Pharm">B.Pharm </option>
            <option value="D. Pharma">D. Pharma</option>
            <option value="BOT">BOT</option>
            <option value="BMLT">BMLT</option>
            <option value="BPT">BPT</option>
            <option value="B.Sc. Nursing">B.Sc. Nursing </option>
            <option value="BNYS">BNYS </option>
        </select>
      </div>
    </div>
    </form>

  <div className='op-area' >
    { search ?
      <>{docArray.map((doc)=>{
        return (
          <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-3" style={{width:'600px'}}>
            <div className="d-flex align-items-center">
                <div className="image"> <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="rounded" width="155"/> </div>
                <div className="ml-3 w-100">
                    <h4 className="mb-0 mt-0">{doc.name} </h4> <h5>{doc.degree}</h5>
                    <h6>{doc.specialization}</h6>
                    <div className="p-2 mt-2 bg-light d-flex justify-content-between rounded text-white stats">
                        <div className="text-center"> <span className="articles text-dark text-center">{doc.votes}</span> <span className="number1 bg-light text-dark text-center"></span> </div>
                    </div>
                    <div className="button mt-2 d-flex flex-row align-items-center"> <Link to={{ pathname:'/docprofile', state:doc}}><button className="btn btn-sm btn-outline-primary w-100">Visit Profile</button> </Link></div>
                </div>
            </div>
        </div>
    </div>
          )
      })}</>:






    <div className="searchSvg">
      {!search && <img src={web} className="img-fluid" alt= "home img" />}
    </div>}
    {load && <div className="load">
      <lottie-player  src="https://assets2.lottiefiles.com/packages/lf20_l82nnfuw.json"  background="transparent"  speed="1"  style={{width: '300px', height: '300px'}}  loop  autoplay></lottie-player>
    </div>}
  </div>



    </div>
  )
}

export default Search
