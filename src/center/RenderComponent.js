import React from "react";
import { Table } from "antd";

export default class RenderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return this.renderComp();
  }
}
