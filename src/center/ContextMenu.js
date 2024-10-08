import React from "react";
import "./index.css";

export default class ContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 置顶
  topEvent = () => {
    const { curComponent, componentsData, changeStore, recordSnapshot } =
      this.props;
    const { component, index } = curComponent;
    const newSource = componentsData;
    if (index < componentsData.length - 1) {
      newSource.splice(index, 1);
      newSource.push(component);
      changeStore({
        componentsData: newSource,
        curComponent: {
          ...curComponent,
          index: newSource.length - 1,
        },
        menuShow: false,
      });
      recordSnapshot();
    } else {
      alert("已经是最顶层了");
    }
  };

  // 删除
  deleteEvent = () => {
    const { curComponent, componentsData, changeStore, recordSnapshot } =
      this.props;
    const { index } = curComponent;
    const newSource = componentsData;
    newSource.splice(index, 1);
    changeStore({
      componentsData: newSource,
      curComponent: {
        component: {},
        index: null,
      },
      menuShow: false,
    });
    recordSnapshot();
  };

  render() {
    const { menuTop, menuLeft } = this.props;
    return (
      <div
        className="context-menu"
        style={{
          top: menuTop,
          left: menuLeft,
        }}
      >
        <div onClick={this.deleteEvent}>删除</div>
        <div onClick={this.topEvent}>置顶</div>
        <div>粘贴</div>
      </div>
    );
  }
}
