import React from 'react';
import './Modal.css'

function Modal(props) {
  return(
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div >
      <div class="modal-header">
        <h2 className="date">{props.date}</h2>
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
      </div>
      <div class="modal-body">
        <img src={props.src} id="imagepreview" />
      </div>

    </div>
  </div>
</div>
  )
}

export default Modal;
