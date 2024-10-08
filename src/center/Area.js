import React from "react";

export default class Area extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { AreaData = {} } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          border: "1px solid blue",
          ...AreaData,
        }}
      ></div>
    );
  }
}
