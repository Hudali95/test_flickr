import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ReactDOM from "react-dom";

import Img from "react-cool-img";

import loadingImage from "../../assets/loading.gif";
import errorImage from "../../assets/error.png";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Loader from "../loaderComponent.";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoResponseData: [],
      page: 1,
      query: props.match.params.query,
      loading: true,
    };

    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.setState({ page: this.state.page + 1 });
        this.makeCall(this.state.query, this.state.page + 1);
      }
    };
  }
  makeCall = (query, page) => {
    let url = `http://localhost:4000/photos?query=${query}&page=${page}`;
    Axios.get(url)
      .then((response) => {
        this.setState({
          loading: false,
          photoResponseData: [
            ...this.state.photoResponseData,
            ...response.data,
          ],
        });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.makeCall(this.state.query, 1);
  }
  componentWillReceiveProps(props) {
    if (this.state.query !== props.match.params.query) {
      this.setState({
        loading: true,
        photoResponseData: [],
        query: props.match.params.query,
      });
      this.makeCall(props.match.params.query, 1);
    }
  }
  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <>
          <Row className=" p-0 pl-3 pr-3 groupHeading">
            <Col md="6" xs="6" className="p-0">
              {" "}
              Everyone's photos
            </Col>

            <Col
              md="6"
              xs="6"
              className="p-0 d-flex justify-content-end showReslutsCont"
            >
              {this.state.photoResponseData.length > 1 && (
                <>
                  Showing results for
                  <span className="font-weight-bold ml-1">
                    {" "}
                    {this.props.match.params.query}
                  </span>
                </>
              )}
            </Col>
          </Row>
          <Row
            className="m-0 p-0 d-flex justify-content-start"
            // ref={this.galleryRef}
          >
            {this.state.photoResponseData &&
              this.state.photoResponseData.map((image) => (
                <div
                  className="imageContainer "
                  onClick={() =>
                    this.props.handleModal(
                      true,
                      `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`,
                      image
                    )
                  }
                >
                  <Img
                    placeholder={loadingImage}
                    src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`}
                    error={errorImage}
                    alt="React Cool Img"
                    className=" coolImage h-100"
                    sizes=""
                  />
                  <div className="hoverBottom">
                    <div className="imageTitle text-truncate">
                      {image.title._content}
                    </div>
                    <div className="authorName text-truncate">
                      By {image.owner.username}
                    </div>
                  </div>
                </div>
              ))}
          </Row>
        </>
      );
    }
  }
}
export default withRouter(index);
