import React, { Component } from "react";
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Group from "../group";
import Gallery from "../gallery";
import ImageModal from "../imageModal";
import GroupComponent from "../groupComponent";
import Home from "../home";
import HeaderContainer from "../headerContainer";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      src: null,
      searchPhotos: "",
      query: "",
      suggestions: [],
      searchFor: "photos",
      showSuggestionBox: false,
      showSuggestionHomeBox: false,
      page: 1,
      activeImage: null,
    };
  }
  handleModal = (value, src, activeImage) => {
    this.setState({ show: value, src, activeImage });
  };

  handleBodyClick = () => {
    this.setState({
      showSuggestionBox: false,
      showSuggestionHomeBox: false,
    });
  };

  render() {
    return (
      <Router>
        <Container fluid="true" onClick={this.handleBodyClick}>
          <HeaderContainer
            showSuggestionBox={this.state.showSuggestionHomeBox}
            handleClick={() => this.setState({ showSuggestionHomeBox: true })}
          />
          <Container className="p-0 ">
            <Switch>
              <Route exact path="/">
                <Home
                  showSuggestionBox={this.state.showSuggestionHomeBox}
                  handleClick={() =>
                    this.setState({ showSuggestionHomeBox: true })
                  }
                />
              </Route>
              <Route path="/groups/:query">
                <Group query={this.state.query} />
              </Route>

              <Route path="/photos/:query">
                <Gallery
                  handleModal={this.handleModal}
                  galleryImages={this.state.photoResponseData}
                  query={this.state.query}
                />
              </Route>

              <Route path="/groups/:id">
                <GroupComponent />
              </Route>
            </Switch>
          </Container>
          {this.state.show && (
            <ImageModal
              handleModal={this.handleModal}
              show={this.state.show}
              src={this.state.src}
              image={this.state.activeImage}
            />
          )}
        </Container>
      </Router>
    );
  }
}
