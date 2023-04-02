import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import userGeoLocation from "./userGeoLocation";

function AddModal(props) {
  const [report, setReport] = useState(props.report);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = userGeoLocation();

  return (
    <>
      <button onClick={handleShow}>file a reports</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Submit a report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="EditModal" className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="report"
                >
                  Report
                </label>
              </div>
              <div>
                <label>Your location:</label>
                <label>Lat:</label>
                <label id="u_Lat"></label>
                <label>Lng:</label>
                <label id="u_Lng"></label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="report"
                  type="text"
                  value={report}
                  onChange={(r) => {
                    setReport(r.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={u_L}>
            My location
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="EditModal" variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  function u_L() {
    document.getElementById("u_Lat").innerHTML = location.coordinates.lat;
    document.getElementById("u_Lng").innerHTML = location.coordinates.lng;
  }
}

export default AddModal;
