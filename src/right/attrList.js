import React from "react";
import { styleData } from "./../utils/attr";
import { ColorPicker, InputNumber } from "antd";

export default class AttrList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setAttrList = () => {
    if (this.props.curComponent.index === null) {
      return [];
    }
    const { style } = this.props.curComponent.component;
    const attrList = styleData.filter((item) => {
      return item.key in style;
    });
    return attrList;
  };

  renderAttr = (item) => {
    const { style } = this.props.curComponent.component;
    const { key, label } = item;
    switch (key) {
      case "color":
      case "backgroundColor":
      case "borderColor":
        return (
          <div key={key}>
            {label}:{" "}
            <ColorPicker
              value={style[key]}
              onChange={(value) => this.changeAttrInput(key, value)}
              format="rgb"
            />
          </div>
        );
      case "width":
      case "height":
      case "left":
      case "top":
      case "fontSize":
        return (
          <div key={key}>
            {label}:{" "}
            <InputNumber
              value={style[key]}
              onChange={(value) => this.changeAttrInput(key, value)}
            />
          </div>
        );
      default:
    }
  };

  changeAttrInput = (key, value) => {
    const { curComponent, changeStore } = this.props;
    const { index } = curComponent;
    const { style } = curComponent.component;
    if (key === "color" || key === "backgroundColor" || key === "borderColor") {
      style[key] = value.toRgbString();
    } else {
      style[key] = value;
    }
    const newStyle = { ...style };
    const newComponent = { ...curComponent.component, style: newStyle };
    const newComponentsData = [...this.props.componentsData];
    newComponentsData[index] = newComponent;
    changeStore({
      curComponent: {
        component: newComponent,
        index,
      },
      componentsData: newComponentsData,
    });
  };

  render() {
    return <div>{this.setAttrList().map((item) => this.renderAttr(item))}</div>;
  }
}
