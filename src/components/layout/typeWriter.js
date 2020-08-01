import React from "react";

export default class Typewriter extends React.Component {
  state = {
    typeColor: {
      color: "blue",
    },
    typed: "",
  };

  componentDidMount() {
    (async () => {
      for (const string of this.props.inputStrings) {
        await this.typeWriter(string);
      }
    })();
  }

  async typeWriter(string) {
    if (string.length === 0) {
      return;
    }

    this.setState((state, props) => ({ typed: state.typed.concat(string[0]) }));

    return await new Promise((resolve) => {
      setTimeout(async () => {
        await this.typeWriter(string.slice(1));
        return resolve();
      }, 120);
    });
  }

  render() {
    return (
      <div style={this.state.typeColor} className="typer">
        <h2>
          {this.state.typed}
          <span className="bliking">|</span>
        </h2>{" "}
      </div>
    );
  }
}
