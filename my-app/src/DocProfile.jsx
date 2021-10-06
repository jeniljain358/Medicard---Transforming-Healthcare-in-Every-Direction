import React,{ useState,useEffect }  from 'react';
import './DocProfile.css'
import {Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

function DocProfile(props) {
  const [doc,setdoc] = useState({})
  const [loadDoc,setLoadDoc] = useState(false)

  useEffect(()=>{
    setdoc(props.location.state)

  },[])


  if (!props.location.state) {
    return <Redirect to='/search' />
    console.log('hjjjj');

  }

  const upVote = async()=>{

    try {
      const response = await fetch('http://localhost:5000/api/doctors/upvote',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:doc._id})
    })
    const responseData = await response.json()
    if (!responseData.message) {
      toast.success("Upvoted!", {
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

  return(
    <div className="container">
    <div className="main-body">


          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">

              <li className="breadcrumb-item active" aria-current="page">Doctor Profile</li>
            </ol>
          </nav>


          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{doc.name}</h4>
                      <p className="text-secondary mb-1">{doc.degree}</p>
                      <p className="text-muted font-size-sm">{doc.specialization}</p>
                      <button className="btn btn-primary" onClick={upVote}>{doc.votes}</button>

                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h2 style={{color:'#24a0ed',margin:'0 auto'}}> {doc.votes} </h2>
                    <svg id="e0762bcb-145d-4970-9329-c1cada5e7f17" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="517.05118" height="546" viewBox="0 0 517.05118 546"><path d="M371.54805,676.17129c5.05211,17.52641,19.80364,29.79509,35.19135,40.21716q3.22281,2.18327,6.44767,4.266c.01456.00637.02957.02.04431.02649.10344.06645.20708.133.30345.19991.44371.286.88759.57222,1.32762.855l-.24171.10858s-.23735.12621.02232.02024c.07729-.03233.15826-.06136.23538-.09387,8.93928-3.60536,18.03734-7.4764,24.88795-14.23042,7.10651-7.0136,11.25953-18.01413,7.41142-27.228a17.59285,17.59285,0,0,0-1.90481-3.41886c-.31214-.44666-.64831-.87416-.99833-1.29373a18.85591,18.85591,0,0,0-32.3856,5.72979c-1.1305-10.52576,7.5488-19.34265,15.90135-25.84822,8.35624-6.50228,17.85126-13.58341,19.46674-24.05074.90215-5.82388-1.123-11.46778-4.81223-15.99852-.11422-.13766-.22827-.27514-.34591-.409a27.51844,27.51844,0,0,0-17.68718-9.48885c-12.8132-1.33167-25.25926,5.4506-34.56778,14.35941C374.86207,634.22735,365.80479,656.24386,371.54805,676.17129Z" transform="translate(-341.47441 -177)" fill="#f2f2f2"/><path d="M395.63225,653.24694a46.77941,46.77941,0,0,0-5.60442,12.36092,40.61934,40.61934,0,0,0-1.404,11.9968A52.04374,52.04374,0,0,0,395.44,701.28927a74.90315,74.90315,0,0,0,11.29937,15.09918q3.22281,2.18327,6.44767,4.266c.01456.00637.02957.02.04431.02649.10344.06645.20708.133.30345.19991.44371.286.88759.57222,1.32762.855,0,0-.47906.23479-.21939.12882.07729-.03233.15826-.06136.23538-.09387a41.40478,41.40478,0,0,1,13.249-35.6508,41.75951,41.75951,0,0,1,17.14558-9.22645c-.31214-.44666-.64831-.87416-.99833-1.29373a43.29621,43.29621,0,0,0-7.14663,2.70436,42.424,42.424,0,0,0-19.1818,18.49347,43.37392,43.37392,0,0,0-4.72252,23.80133c-.36729-.33284-.735-.67291-1.09168-1.00976-6.79289-6.33309-12.82633-13.60244-16.90958-21.99189a48.41647,48.41647,0,0,1-5.06984-22.90745c.33324-8.65329,3.781-16.66846,8.77294-23.64613a101.34554,101.34554,0,0,1,19.2105-19.79843,115.15845,115.15845,0,0,1,23.89219-14.75057.828.828,0,0,0,.41668-1.06262.70418.70418,0,0,0-.34591-.409.613.613,0,0,0-.53242.02262c-1.0539.48517-2.10049.977-3.13868,1.49006a116.46492,116.46492,0,0,0-24.06247,15.87266C407.28266,638.447,400.61462,645.346,395.63225,653.24694Z" transform="translate(-341.47441 -177)" fill="#fff"/><ellipse cx="529.33942" cy="381.99436" rx="29.80735" ry="30.77493" transform="translate(-459.83364 123.71476) rotate(-28.66321)" fill="#2f2e41"/><circle cx="187.86501" cy="212.9009" r="24.56103" fill="#ffb8b8"/><path d="M516.17018,427.46984l-3.15847,8.934,4.64576,26.88906,19.14613,15.90819,15.20429-23.51033-7.32058-22.24331-5.49044-6.19434h0a4.05934,4.05934,0,0,0-3.9614-4.44959l-11.99069-.23359A7.35185,7.35185,0,0,0,516.17018,427.46984Z" transform="translate(-341.47441 -177)" fill="#ccc"/><polygon points="225.576 533.697 237.836 533.695 239.529 486.407 225.572 486.409 225.576 533.697" fill="#ffb8b8"/><path d="M564.42384,707.19229h38.53073a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H579.31069a14.88686,14.88686,0,0,1-14.88686-14.88686v0A0,0,0,0,1,564.42384,707.19229Z" transform="translate(825.96846 1252.2188) rotate(179.99483)" fill="#2f2e41"/><polygon points="139.693 533.697 151.953 533.695 157.783 486.407 139.689 486.409 139.693 533.697" fill="#ffb8b8"/><path d="M478.54084,707.19229h38.53073a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H493.4277a14.88686,14.88686,0,0,1-14.88686-14.88686v0A0,0,0,0,1,478.54084,707.19229Z" transform="translate(654.20247 1252.22654) rotate(179.99483)" fill="#2f2e41"/><path d="M588.96324,378.60671a10.05576,10.05576,0,0,1,2.352,15.2389l10.14,20.62094-11.02837,9.2184-13.91065-29.32188a10.11027,10.11027,0,0,1,12.447-15.75636Z" transform="translate(-341.47441 -177)" fill="#ffb8b8"/><path d="M515.86714,540.07959a147.80631,147.80631,0,0,1-17.86657-1.31787,7.14334,7.14334,0,0,1-6.00281-8.95215l13.27136-49.14014-10.68774-29.98486a13.47763,13.47763,0,0,1,7.4414-16.92578l14.68067-6.20654,4.41223,27.313,10.512,13.2544a3.418,3.418,0,0,0,5.66284-.459l7.98267-14.30859-6.52051-26.292,9.72168,1.1499a16.87745,16.87745,0,0,1,13.91187,11.23486,45.06241,45.06241,0,0,1,.74658,26.92286l-4.02857,14.312,7.074,45.72168a9.31429,9.31429,0,0,1-8.218,10.69092,93.62523,93.62523,0,0,1-13.61938.56982c-4.12683-.17578-7.02515-2.69238-8.382-7.27734a1.27571,1.27571,0,0,0-2.45667-.0127q-.56342,1.99731-1.2395,4.44824C531.16976,538.78662,524.3254,540.07959,515.86714,540.07959Z" transform="translate(-341.47441 -177)" fill="#2f2e41"/><path d="M558.52339,451.37939a9.215,9.215,0,0,1-3.552-.70166,8.73631,8.73631,0,0,1-5.2185-6.33789,10.56939,10.56939,0,0,1,5.448-11.34716L583.84761,417.439l-1.56689-6.19531a4.97825,4.97825,0,0,1,1.92505-5.1333l7.38672-5.4873a4.73638,4.73638,0,0,1,3.99951-.84473,4.18421,4.18421,0,0,1,2.77954,2.3042l3.83764,8.28564c3.03638,6.55518.44043,14.62891-6.03857,18.7793l-32.12964,20.582A10.257,10.257,0,0,1,558.52339,451.37939Z" transform="translate(-341.47441 -177)" fill="#2f2e41"/><path d="M498.16988,688.71436q-.14959,0-.30078-.00977l-15.60889-.627a4.5,4.5,0,0,1-4.19556-4.95655L493.90669,530.71l41.57593-15.11865,24.48364,13.855L586.75166,677.126a4.501,4.501,0,0,1-3.3518,5.19482l-.0647.01611-15.97851-.39257a4.51369,4.51369,0,0,1-5.29493-3.02735l-34.029-119.41357a1.50012,1.50012,0,0,0-2.88818.13379L502.55428,685.19043A4.48555,4.48555,0,0,1,498.16988,688.71436Z" transform="translate(-341.47441 -177)" fill="#2f2e41"/><path d="M507.88789,374.39554c-3.90718,5.11519-.93367,13.8219,5.2862,15.47851s13.13017-4.41761,12.28492-10.79858c-1.34232,6.69479,4.38735,13.70087,11.18939,14.296s13.4156-4.73417,14.90378-11.398-1.83307-13.94459-7.487-17.77284-13.22518-4.32554-19.62249-1.93883A37.85094,37.85094,0,0,0,507.88789,374.39554Z" transform="translate(-341.47441 -177)" fill="#2f2e41"/><path d="M537.49551,352.5619c-3.63814-7.635-7.3762-15.41637-13.2564-21.49525s-14.38646-10.26566-22.72161-8.83219-15.513,9.84589-13.66686,18.09945c.93775,4.19239-2.652,8.34643-6.78986,9.50123s-8.54774.07488-12.63836-1.2375-8.23462-2.87949-12.52664-2.69473c-8.60616.37048-15.80147,8.51665-16.10381,17.12547s5.55378,16.8033,13.41066,20.335,17.255,2.74036,25.00476-1.02063,13.94634-10.245,18.47757-17.571c6.69561-10.82541,23.52127-13.49544,33.23928-5.27469a5.262,5.262,0,0,0,7.11656-.57067C538.75952,356.92117,538.51037,353.53793,537.49551,352.5619Z" transform="translate(-341.47441 -177)" fill="#2f2e41"/><path d="M721.02559,309.65388l-8.19358-7.39149c-29.097-26.71447-48.30643-44.05345-48.30643-65.65248,0-17.62206,13.55945-31.26379,31.075-31.26379a33.42394,33.42394,0,0,1,25.425,11.93754,33.42267,33.42267,0,0,1,25.425-11.93754c17.51554,0,31.075,13.64178,31.075,31.26379,0,21.5993-19.20974,38.9383-48.30644,65.65248Z" transform="translate(-341.47441 -177)" fill="#24a0ed"/><path d="M586.13692,360.48535a3.89253,3.89253,0,0,1-2.61133-3.70508V186a9.01031,9.01031,0,0,1,9-9h257a9.01031,9.01031,0,0,1,9,9V330a9.01031,9.01031,0,0,1-9,9H607.09029l-16.5857,20.272a3.89175,3.89175,0,0,1-3.02343,1.44873A3.98631,3.98631,0,0,1,586.13692,360.48535ZM592.52559,179a7.00787,7.00787,0,0,0-7,7V356.78027a1.93424,1.93424,0,0,0,3.43115,1.2251L606.14253,337H849.52559a7.00787,7.00787,0,0,0,7-7V186a7.00787,7.00787,0,0,0-7-7Z" transform="translate(-341.47441 -177)" fill="#3f3d56"/><path d="M510.35264,516.35351l-1.73663-4.03668c-6.08966-14.50372-10.15946-23.97125-6.56955-31.78766a12.23646,12.23646,0,0,1,16.11892-6.2962q.16255.07122.323.14715a13.31036,13.31036,0,0,1,7.21686,8.5459,13.30989,13.30989,0,0,1,11.18509-.09424,12.23645,12.23645,0,0,1,6.19849,16.15674q-.07224.16214-.14911.32208c-3.59,7.81653-13.42359,10.89844-28.39341,15.72986Z" transform="translate(-341.47441 -177)" fill="#24a0ed"/><path d="M517.04533,496.52392a10.05576,10.05576,0,0,0-14.35721-5.62372L484.714,477.39809l-4.33879,12.35143,18.57547,15.47934a10.11028,10.11028,0,0,0,18.09463-8.70494Z" transform="translate(-341.47441 -177)" fill="#ffb8b8"/><path d="M491.27352,500.78271a4.18,4.18,0,0,1-2.236-.64892l-7.71887-4.87842c-6.10742-3.85937-8.30676-12.0498-5.11584-19.05176l15.82336-34.72119a9.83991,9.83991,0,0,1,7.10425-5.71679,8.73279,8.73279,0,0,1,7.82239,2.49267,10.56936,10.56936,0,0,1,1.57959,12.48779l-15.626,28.60743,4.67761,4.35351a4.97958,4.97958,0,0,1,1.168,5.35693l-3.228,8.61719a4.74291,4.74291,0,0,1-2.90161,2.87989A4.23135,4.23135,0,0,1,491.27352,500.78271Z" transform="translate(-341.47441 -177)" fill="#2f2e41"/><path d="M656.47441,723h-314a1,1,0,0,1,0-2h314a1,1,0,0,1,0,2Z" transform="translate(-341.47441 -177)" fill="#ccc"/></svg>
                  </li>

                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {doc.name}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {doc.gender}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Degree</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {doc.degree}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Specialization</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {doc.specialization}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {doc.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {doc.contact}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {doc.clinic_add}
                    </div>
                  </div>
                  <hr/>
                    <br/>
                </div>
              </div>

              <div className="row gutters-sm">
                <div className="card h-100">
                  <h4><strong>Certificate</strong></h4>
                    <br/>
                    <img src={`http://localhost:5000/${doc.cert}`}/>
                </div>

              </div>



            </div>
          </div>

        </div>
    </div>
  )
}

export default DocProfile