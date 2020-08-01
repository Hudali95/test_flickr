import React, { Component } from "react";
import loadingImg from "../../assets/Spinner-3.4s-321px.gif";
export default class index extends Component {
  render() {
    return (
      <div className="loadingCompo d-flex align-items-center justify-content-center w-100">
        <img src={loadingImg} alt="Loading..."></img>
      </div>
    );
  }
}
