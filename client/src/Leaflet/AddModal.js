import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
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
              <Container>
                <Row>
                  <Col xs={10} md={7}>
                    <label>Your location:</label>
                  </Col>
                  <Col xs={8} md={5}>
                    <label>Lat:</label>
                    <label className="l_lat" id="u_Lat"></label>
                  </Col>
                </Row>

                <Row>
                  <Col xs={10} md={7}></Col>
                  <Col xs={8} md={5}>
                    <label className="l_l_lng">Lng:</label>
                    <label className="l_lng" id="u_Lng"></label>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={12}>
                    <input
                      id="report"
                      type="text"
                      value={report}
                      onChange={(r) => {
                        setReport(r.target.value);
                      }}
                    />
                  </Col>
                </Row>
              </Container>
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
          <Button form="EditModal" variant="primary" onClick={getreport}>
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

  function getreport() {
    let report_content = document.getElementById("report").value;
    console.log(report_content);
  }
}

export default AddModal;
