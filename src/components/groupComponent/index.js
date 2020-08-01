import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

class index extends Component {
  componentDidMount() {
    Axios.get(
      "http://localhost:4000/group/page?id=" + this.props.match.params.id
    ).then((res) => (window.location.href = res.data.group.url));
    // Axios.get(
    //   "http://localhost:4000/group/topics?id=" + this.props.match.params.id
    // ).then((res) => console.log(res));
    // Axios.get(
    //   "http://localhost:4000/group/topics/info?id=" +
    //     this.props.match.params.id +
    //     "&topic_id="
    // ).then((res) => console.log(res));
    // Axios.get(
    //   "http://localhost:4000/group/photos?id=" + this.props.match.params.id
    // ).then((res) => console.log(res));
  }
  render() {
    return <div>Hello</div>;
  }
}
export default withRouter(index);
