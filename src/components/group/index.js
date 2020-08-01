import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { IoMdChatbubbles } from "react-icons/io";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineTeam, AiOutlinePlus } from "react-icons/ai";

import Img from "react-cool-img";

import loadingImage from "../../assets/loading.gif";
import errorImage from "../../assets/defaultGroup.png";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Loader from "../loaderComponent.";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupData: [],
      page: 1,
      loading: true,
      query: props.match.params.query,
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
    let url = `http://localhost:4000/groups?query=${query}&page=${page}`;
    Axios.get(url)
      .then((response) => {
        this.setState({
          groupData: [...this.state.groupData, ...response.data.groups.group],
          loading: false,
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
        groupData: [],
        query: props.match.params.query,
      });
      this.makeCall(props.match.params.query, 1);
    }
  }
  redirectToPage = (id) => {
    Axios.get("http://localhost:4000/group/page?id=" + id).then(
      (res) => (window.location.href = res.data.group.url)
    );
  };
  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <>
          <Row className=" p-0 pl-3 pr-3 groupHeading">
            <Col md="6" xs="6" className="p-0">
              {" "}
              Flicker Groups
            </Col>

            <Col
              md="6"
              xs="6"
              className="p-0  d-flex justify-content-end showReslutsCont"
            >
              {this.state.groupData.length > 1 && (
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
          <Row className="m-0 p-0 ">
            {this.state.groupData &&
              this.state.groupData.map((group, index) => (
                <Col md="4" className="m-0 pt-2 pb-2">
                  <Container key={index} className="resultCard   w-100">
                    <Row className="p-0 m-0 h-100">
                      <Col
                        md="3"
                        xs="3"
                        className="h-100 p-0 d-flex align-items-center justify-content-center"
                      >
                        <div
                          className="groupProfile pointer"
                          onClick={() => this.redirectToPage(group.nsid)}
                        >
                          {group.iconserver === "0" ? (
                            <img
                              src={errorImage}
                              alt="No Icon"
                              className="w-100 h-100"
                              style={{ borderRadius: "50%" }}
                            ></img>
                          ) : (
                            <Img
                              placeholder={loadingImage}
                              src={`https://live.staticflickr.com/${group.iconserver}/buddyicons/${group.nsid}.jpg`}
                              error={errorImage}
                              alt="Group Icon"
                              className="w-100 h-100"
                              style={{ borderRadius: "50%" }}
                            />
                          )}
                        </div>
                      </Col>
                      <Col
                        md="6"
                        xs="6"
                        className="h-100  p-0 d-flex flex-column"
                      >
                        <div className="groupName w-100 text-truncate">
                          {group.name}
                        </div>
                        <div className="groupSince w-100">Since 2008</div>{" "}
                        <div className="groupInfo d-flex align-items-center ">
                          <div className="groupIcons d-flex align-items-center pointer">
                            <AiOutlineTeam />
                            <span className="textContent">
                              {format(group.members)}
                            </span>
                          </div>
                          <div className="groupIcons d-flex align-items-center pointer">
                            <BsCardImage />
                            <span className="textContent">
                              {format(group.pool_count)}
                            </span>
                          </div>
                          <div className="groupIcons d-flex align-items-center pointer">
                            <IoMdChatbubbles />
                            <span className="textContent">
                              {format(group.topic_count)}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col
                        md="3"
                        xs="3"
                        className="h-100 d-flex justify-contents-center p-0"
                      >
                        <button className="groupButton d-flex align-items-center justify-contents-center pr-2">
                          <AiOutlinePlus className="mr-2" /> Join
                        </button>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              ))}
          </Row>
        </>
      );
    }
  }
}
function format(number) {
  let newNumber = number;
  if (number > 999) {
    newNumber = `${Math.round((number / 1000) * 10) / 10}K`;
  }
  return newNumber;
}
export default withRouter(index);
