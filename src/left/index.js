import React from "react";
import componentsList from "./componentsList";

export default class LeftComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDragStart = (e) => {
    e.dataTransfer.setData("component", e.target.dataset.component);
  };

  render() {
    const { componentsData, curComponent = {} } = this.props;
    return (
      <div>
        <div
          style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
          onDragStart={this.handleDragStart}
        >
          {componentsList.map((item, index) => {
            return (
              <div
                style={{ border: "1px solid red", width: "48%" }}
                key={index}
                draggable
                data-component={index}
              >
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>
        <div style={{ width: "100%" }}>
          {componentsData.map((item, index) => (
            <div
              key={index}
              style={{ background: curComponent.index === index && "red" }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
