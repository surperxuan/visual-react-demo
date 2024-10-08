import React, { createRef } from "react";
import { Table } from "antd";

import { events } from "./../utils/events";

import { runAnimation } from "./../utils/utils";
import "./../style/animate.scss";

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = createRef();
  }

  componentDidMount() {
    const { componentData } = this.props;
    runAnimation(this.ref.current, componentData.animations);
  }

  renderComp = () => {
    const { componentData } = this.props;
    const { label, style, propValue = {} } = componentData;
    switch (componentData.component) {
      case "VButton":
        return <button style={{ ...style }}>{label}</button>;
      case "Picture":
        return (
          <img src={componentData.propValue.url} style={{ ...style }} alt="" />
        );
      case "VText":
        return <input label={label} style={{ ...style }} />;
      case "VTable":
        const { columns, data } = propValue;
        return <Table dataSource={data} columns={columns} />;
      case "CircleShape":
      case "LineShape":
        return <div style={{ ...style }}></div>;
      default:
        return null;
    }
  };

  handleEventsClick = (item) => {
    // 循环触发绑定的事件
    console.log(item);
    Object.keys(item.events).forEach((event) => {
      events[event](item.events[event]);
    });
  };

  render() {
    const { componentData } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          ...componentData.style,
        }}
        onClick={() => this.handleEventsClick(componentData)}
        ref={this.ref}
      >
        {this.renderComp()}
      </div>
    );
  }
}
