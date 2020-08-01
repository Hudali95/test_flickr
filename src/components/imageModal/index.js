import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

export default class index extends Component {
  render() {
    let { image } = this.props;

    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.handleModal(false)}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title className="text-truncate">
            {image.title._content}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-0">
          <img
            src={this.props.src}
            className="w-100 h-100"
            onClick={() => {
              window.open(this.props.src);
            }}
          ></img>
          <div className="middleRow d-flex align-items-center">
            <div className="w-50 p-2">Description</div>
            <div className="w-25 p-2 spanContent d-flex  justify-content-end">
              By{" "}
              <span className=" text-truncate text-black ml-2">
                {image.owner.username}
              </span>
            </div>
            <div className="w-25 p-2 spanContent d-flex  justify-content-end">
              Posted{" "}
              <span className=" text-truncate text-black ml-2 ">
                {timestampToDate(image.dates.posted)}
              </span>
            </div>
          </div>
          <div
            className="p-2 imageDesc "
            dangerouslySetInnerHTML={{
              __html: truncat(image.description._content),
            }}
          >
            {/* {} */}
          </div>
        </Modal.Body>
        <Modal.Footer className="modalfooter">
          <Button
            variant="secondary"
            onClick={() => this.props.handleModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
function truncat(string) {
  if (string.length > 400) {
    string = string.slice(0, 400) + "...";
  }
  return string;
}
function timestampToDate(timestamp) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let p = parseInt(timestamp);
  let date = new Date(p * 1000);
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
