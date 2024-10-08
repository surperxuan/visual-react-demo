import React from "react";
import Shape from "./Shape";
import RenderComponent from "./RenderComponent";
import ContextMenu from "./ContextMenu";

export default class CenterComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleContextMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { changeStore } = this.props;
    const rectInfo = document.getElementById("canvas").getBoundingClientRect();
    changeStore({
      menuShow: true,
      menuTop: e.clientY - rectInfo.y,
      menuLeft: e.clientX - rectInfo.x,
    });
  };

  hideMenu = () => {
    console.log(11111);
    const { changeStore } = this.props;
    changeStore({
      menuShow: false,
    });
  };

  render() {
    const {
      componentsData,
      changeStore,
      curComponent,
      menuShow = false,
      menuTop,
      menuLeft,
      recordSnapshot,
    } = this.props;
    const menuProps = {
      menuTop,
      menuLeft,
      changeStore,
      curComponent,
      componentsData,
      recordSnapshot,
    };
    return (
      <div
        style={{ width: "100%", height: "100%", position: "relative" }}
        id="canvas"
        onContextMenu={this.handleContextMenu}
      >
        {componentsData.map((item, index) => {
          const shapeProps = {
            componentData: item,
            componentIndex: index,
            changeStore,
            componentsData,
            hideMenu: this.hideMenu,
            curComponent,
            recordSnapshot,
          };
          return (
            <Shape {...shapeProps} key={index}>
              <RenderComponent {...shapeProps} />
            </Shape>
          );
        })}
        {menuShow && <ContextMenu {...menuProps} />}
      </div>
    );
  }
}
