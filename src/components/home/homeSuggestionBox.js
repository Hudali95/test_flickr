import React, { Component } from "react";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineTeam, AiOutlinePlus } from "react-icons/ai";
import { connect } from "react-redux";
import { setSearchFor } from "../../redux/actions";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class homeSuggestionBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: props.query,
      suggestions: [],
    };
  }

  handelButtonClick = (e, value) => {
    e.stopPropagation();
    this.props.setSearchFor(value);
    this.props.history.push(`/${value}/${this.props.query}`);
  };
  handleRowClick = (e, value) => {
    e.stopPropagation();
    this.props.setFromChild(value);
  };
  componentWillReceiveProps(props) {
    this.setState({ query: props.query });
    if (props.query !== "") {
      Axios.get(
        `https://api.datamuse.com/sug?s=${props.query}&max=10`
      ).then((res) => this.setState({ suggestions: res.data }));
    }
  }

  render() {
    return (
      <div className="homesSuggestionBox shadow">
        <div className="d-flex pb-2">
          <div className="w-50 d-flex align-items-center justify-content-center">
            <div
              className="d-flex border homeButtons"
              onClick={(e) => this.handelButtonClick(e, "photos")}
            >
              <div className="w-25 d-flex align-items-center justify-content-center">
                <BsCardImage />
              </div>
              <div className="w-75 d-flex align-items-center ">
                Search For Photos
              </div>
            </div>
          </div>
          <div className="w-50 d-flex align-items-center justify-content-center">
            <div
              className="d-flex border homeButtons"
              onClick={(e) => this.handelButtonClick(e, "groups")}
            >
              <div className="w-25 d-flex align-items-center justify-content-center">
                <AiOutlineTeam />
              </div>
              <div className="w-75 d-flex align-items-center ">
                Search For Groups
              </div>
            </div>
          </div>
        </div>
        {this.state.suggestions.length === 0 ? (
          <div className="suggestionsBoxRow d-flex align-items-center homesSuggestionBoxRow text-truncate">
            Loading...
          </div>
        ) : (
          this.state.suggestions.map((value, index) => (
            <div
              className="suggestionsBoxRow d-flex align-items-center homesSuggestionBoxRow text-truncate"
              onClick={(e) => this.handleRowClick(e, value.word)}
              key={index}
            >
              {value.word}
            </div>
          ))
        )}
      </div>
    );
  }
}
export default compose(
  withRouter,
  connect(null, { setSearchFor })
)(homeSuggestionBox);
