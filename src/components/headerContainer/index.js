import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import logoSrc from "../../assets/flickr2.png";
import { AiOutlineSearch } from "react-icons/ai";
import Axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { setSearchFor, searchQuery } from "../../redux/actions";
import { compose } from "redux";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSuggestions: false,
      value: "",
      typed: "",
      suggestions: [],
      showInput: false,
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
  setFromChild = (e, value) => {
    e.stopPropagation();
    this.setState({ value: value });
  };
  handleInputChange = (e) => {
    this.props.handleClick();
    this.setState({ value: e.target.value });

    if (e.target.value !== "") {
      Axios.get(
        `https://api.datamuse.com/sug?s=${e.target.value}&max=10`
      ).then((res) => this.setState({ suggestions: res.data }));
    }

    if (e.keyCode === 13) {
      this.props.history.push(`/${this.props.searchFor}/${e.target.value}`);
    }
  };
  handelButtonClick = (e, value) => {
    e.stopPropagation();
    this.props.setSearchFor(value);
    this.props.history.push(`/${value}/${this.state.value}`);
  };

  render() {
    return (
      <Container fluid="true" className=" p-2 headerContainer">
        <Container className="p-0 h-100">
          <Row className="m-0 p-0 h-100">
            <Col
              className=" p-0  d-flex align-items-center h-100"
              md="7"
              xs="4"
            >
              <img
                src={logoSrc}
                className="h-50 pointer"
                alt="Home Logo"
                onClick={() => this.props.history.push("/")}
              ></img>
            </Col>
            <Col
              className="  p-0  d-flex align-items-center justify-content-end "
              md="5"
              xs="8"
            >
              <div className="searchBarWrapper  d-flex align-items-center justify-content-end ">
                <div
                  className="d-flex d-flex align-items-center justify-content-center pointer pl-2 pr-2"
                  onClick={() =>
                    this.setState({ showInput: !this.state.showInput })
                  }
                >
                  <AiOutlineSearch />
                </div>
                {this.state.showInput && (
                  <input
                    placeholder="Search for Photos or Groups"
                    value={this.state.value}
                    onChange={this.hangleChange}
                    onKeyDown={this.handleInputChange}
                  ></input>
                )}
                {this.state.showSuggestions && this.props.showSuggestionBox && (
                  <div className="suggestionsBox d-flex flex-column">
                    <div className="suggestionsBoxConfirmRow d-flex align-items-center  pl-2">
                      <div
                        className="d-flex align-items-center justify-content-center chooseBox pointer mb-2"
                        onClick={(e) => this.handelButtonClick(e, "photos")}
                      >
                        Search Photos
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-center chooseBox pointer mb-2  ml-3 mr-2"
                        onClick={(e) => this.handelButtonClick(e, "groups")}
                      >
                        Search Groups
                      </div>
                    </div>

                    {this.state.suggestions.length === 0 ? (
                      <div className="suggestionsBoxRow d-flex align-items-center  pl-2">
                        Loading...
                      </div>
                    ) : (
                      this.state.suggestions.map((sug, index) => (
                        <div
                          className="suggestionsBoxRow d-flex align-items-center  pl-2"
                          onClick={(e) => this.setFromChild(e, sug.word)}
                          key={index}
                        >
                          {sug.word}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
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
