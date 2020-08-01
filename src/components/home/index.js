import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

import HomeSuggestionBox from "./homeSuggestionBox";
import { connect } from "react-redux";

import { setSearchFor, searchQuery } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import Typewriter from "../layout/typeWriter";
import backImg from "../../assets/matthieu-comoy-t0h0oKwS1xY-unsplash.jpg";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSuggestions: false,
      value: "",
      typed: "",
    };
  }
  hangleChange = (e) => {
    if (e.target.value == "") {
      this.setState({ showSuggestions: false });
    }
    if (!this.state.showSuggestions) {
      this.setState({ showSuggestions: true });
    }
    this.setState({ value: e.target.value });
  };
  setFromChild = (value) => {
    this.setState({ value: value });
  };
  handleInputChange = (e) => {
    this.props.handleClick();
    this.setState({ value: e.target.value });

    if (e.keyCode === 13) {
      this.props.searchQuery(e.target.value);
      this.props.history.push(`/${this.props.searchFor}/${e.target.value}`);
    }
  };

  render() {
    return (
      <Row className=" homeWrapper d-flex flex-column align-items-center justify-content-center">
        <div className="mb-5">
          <Typewriter inputStrings={["#Find_Your_Inspiration..."]} />
        </div>
        <div className="homeSearchBarContainer shadow pointer">
          <div className="d-flex h-100">
            <div className="homeSearchIcon d-flex align-items-center justify-content-center">
              <AiOutlineSearch />
            </div>
            <div className="d-flex align-items-center homeSearchInputWrapper">
              {" "}
              <input
                placeholder="Search for Photos or Grops"
                className="h-100 w-100  homeSearchInput pointer"
                type="text"
                value={this.state.value}
                onChange={this.hangleChange}
                onKeyDown={this.handleInputChange}
              ></input>
            </div>
          </div>
          <div className="hover1 h-100 "></div>
          <div className="hover2 h-100"></div>
          {this.state.showSuggestions && this.props.showSuggestionBox && (
            <HomeSuggestionBox
              query={this.state.value}
              setFromChild={this.setFromChild}
            />
          )}
        </div>
        <div className="backImage">
          <img src={backImg} alt="backImage" className="img-fluid"></img>
        </div>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    searchFor: state.searchFor,
    query: state.query,
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, { setSearchFor, searchQuery })
)(index);
