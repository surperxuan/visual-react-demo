import React from "react";
import LeftComp from "./left";
import RightComp from "./right";
import CenterComp from "./center";
import TopComp from "./top";
import componentsList from "./left/componentsList";
import { deepCopy, generateID } from "./utils/utils";
import "./style/animate.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentsData: [], // 当前组件数据 component 组件数据
      hideArea: false, // 选中组件显示控制
      // 选中组件的位置信息
      areaData: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      curComponent: {
        component: {},
        index: null,
      }, // 当前选中的组件
      menuTop: 0,
      menuLeft: 0,
      menuShow: false,
      snapshotData: [], // 编辑器快照数据
      snapshotIndex: -1, // 快照索引
      showPreview: false, // 预览
      showDownload: false,
    };
  }

  componentDidMount() {
    const data = localStorage.getItem("componentsData") || [];
    if (data.length) {
      this.setState({
        componentsData: JSON.parse(data),
      });
    }
  }

  addComponentsData = (source) => {
    const data = this.state.componentsData;
    data.push(source);
    this.setState({
      componentsData: data,
    });
    this.recordSnapshot();
  };

  handleDrap = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const index = e.dataTransfer.getData("component");
    if (index) {
      // 计算组件的位置(相对于画布的位置)
      let component = deepCopy(componentsList[index]);
      const rectInfo = document
        .getElementById("canvas")
        .getBoundingClientRect();
      component.style.top = e.clientY - rectInfo.y;
      component.style.left = e.clientX - rectInfo.x;
      component.id = generateID();
      if (component) {
        this.addComponentsData(component);
      }
    }
  };

  handleDrapOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  changeStore = (stateProps, callback = null) => {
    this.setState(stateProps, callback && callback());
  };

  deselectCurComponent = (e) => {
    // 0 左击 1 滚轮 2 右击
    if (e.button !== 2) {
      console.log(222222);
      // this.setState({
      //   menuShow: false,
      // });
    }
  };

  //撤销
  revokeComp = () => {
    const data = this.state.snapshotData;
    const index = this.state.snapshotIndex;
    if (index > 0) {
      this.setState({
        componentsData: deepCopy(data[index - 1]),
        snapshotIndex: index - 1,
      });
    } else if (index === 0) {
      this.setState({
        componentsData: [],
        snapshotIndex: -1,
      });
    }
  };

  //重做
  redoComp = () => {
    const data = this.state.snapshotData;
    const index = this.state.snapshotIndex;
    if (index < data.length - 1) {
      this.setState({
        componentsData: deepCopy(data[index + 1]),
        snapshotIndex: index + 1,
      });
    }
  };

  // 保存
  saveComp = () => {
    localStorage.setItem(
      "componentsData",
      JSON.stringify(this.state.componentsData)
    );
  };

  // 预览
  previewComp = () => {
    this.setState({
      showPreview: true,
    });
  };

  closePreview = () => {
    this.setState({
      showPreview: false,
    });
  };

  clearCanvas = () => {
    this.setState({
      componentsData: [],
    });
  };

  downLoad = () => {
    this.setState({
      showDownload: true,
    });
  };

  closeDownload = () => {
    this.setState({
      showDownload: false,
    });
  };

  // 记录快照
  recordSnapshot = () => {
    // 如果当前索引小于快照长度，说明后面的快照数据都可以删除
    // 因为快照数据是有序的，所以只需要删除后面的快照数据即可
    // 否则，说明后面的快照数据都可以删除
    // 然后将当前快照数据添加到快照数据中
    // 然后将当前索引加一
    const data = this.state.snapshotData;
    const index = this.state.snapshotIndex;
    if (index < data.length - 1) {
      data.splice(index + 1, data.length - index - 1);
    }
    data.push(deepCopy(this.state.componentsData));
    this.setState({
      snapshotData: data,
      snapshotIndex: index + 1,
    });
  };

  render() {
    const topProps = {
      revokeComp: this.revokeComp,
      redoComp: this.redoComp,
      saveComp: this.saveComp,
      previewComp: this.previewComp,
      componentsData: this.state.componentsData,
      showPreview: this.state.showPreview,
      closePreview: this.closePreview,
      clearCanvas: this.clearCanvas,
      downLoad: this.downLoad,
      showDownload: this.state.showDownload,
      closeDownload: this.closeDownload,
    };
    const leftProps = {
      componentsData: this.state.componentsData,
      changeStore: this.changeStore,
      curComponent: this.state.curComponent,
    };
    const centerProps = {
      componentsData: this.state.componentsData,
      hideArea: this.state.hideArea,
      curComponent: this.state.curComponent,
      changeStore: this.changeStore,
      menuShow: this.state.menuShow,
      menuTop: this.state.menuTop,
      menuLeft: this.state.menuLeft,
      recordSnapshot: this.recordSnapshot,
    };
    const rightProps = {
      componentsData: this.state.componentsData,
      changeStore: this.changeStore,
      curComponent: this.state.curComponent,
    };
    return (
      <div style={{ height: "100vh" }}>
        <div style={{ height: "5%", border: "1px solid black" }}>
          <TopComp {...topProps} />
        </div>
        <div style={{ display: "flex", width: "100%", height: "95%" }}>
          <div style={{ width: "10%", border: "1px solid black" }}>
            <LeftComp {...leftProps} />
          </div>
          <div
            style={{ width: "80%", border: "1px solid black" }}
            onDrop={this.handleDrap}
            onDragOver={this.handleDrapOver}
            onMouseUp={this.deselectCurComponent}
          >
            <CenterComp {...centerProps} />
          </div>
          <div style={{ width: "10%", border: "1px solid black" }}>
            <RightComp {...rightProps} />
          </div>
        </div>
      </div>
    );
  }
}
