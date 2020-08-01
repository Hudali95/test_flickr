import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <div className="noRouteWrapper d-flex align-items-center justify-content-center ">
        <div className=" ">
          <h5 className="m-auto mb-5">Hey, sorry!</h5>
          <h5>
            There are no routes maching this URL. Please go back to homepage
          </h5>
        </div>
      </div>
    );
  }
}
