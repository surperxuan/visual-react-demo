import React from "react";
import "./index.css";

export default class Shape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentMouseDown = (e) => {
    e.stopPropagation();
    const {
      changeStore,
      componentData,
      componentIndex,
      componentsData,
      recordSnapshot,
    } = this.props;
    changeStore({
      curComponent: {
        component: componentData,
        index: componentIndex,
      },
    });

    const curComponent = componentData;
    const pos = curComponent.style;
    const startY = e.clientY;
    const startX = e.clientX;
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top);
    const startLeft = Number(pos.left);

    const move = (moveEvent) => {
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;
      const moveTop = currY - startY + startTop;
      const moveLeft = currX - startX + startLeft;
      // 修改当前组件样式
      curComponent.style = {
        ...curComponent.style,
        left: moveLeft,
        top: moveTop,
      };
      const newSource = componentsData;
      newSource[componentIndex] = curComponent;
      changeStore({
        curComponent: {
          ...curComponent,
          component: {
            ...curComponent.component,
            style: {
              ...curComponent.style,
              left: moveLeft,
              top: moveTop,
            },
          },
        },
        componentsData: newSource,
      });
    };

    const up = () => {
      recordSnapshot();
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  selectCurComponent = () => {
    const { changeStore, componentData, componentIndex, hideMenu } = this.props;
    changeStore({
      curComponent: {
        component: componentData,
        index: componentIndex,
      },
    });
    hideMenu();
  };

  getPointList = () => {
    const { componentData, curComponent } = this.props;
    return componentData.id === curComponent.component.id
      ? ["lt", "t", "rt", "r", "rb", "b", "lb", "l"]
      : []; // 八个方向
  };

  getPointStyle = (point) => {
    const { componentData } = this.props;
    const { width, height } = componentData.style;
    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);
    let newLeft = 0;
    let newTop = 0;

    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width;
      newTop = hasT ? 0 : height;
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2;
        newTop = hasT ? 0 : height;
      }

      // 左右两边的点，高度居中
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width;
        newTop = Math.floor(height / 2);
      }
    }

    const style = {
      marginLeft: "-4px",
      marginTop: "-4px",
      left: `${newLeft}px`,
      top: `${newTop}px`,
    };

    return style;
  };

  handleMouseDownOnPoint = (point, downEvent) => {
    downEvent.stopPropagation();
    downEvent.preventDefault();
    const {
      componentData,
      componentsData,
      changeStore,
      componentIndex,
      recordSnapshot,
    } = this.props;

    const curComponent = componentData;
    const pos = componentData.style;
    const height = Number(pos.height);
    const width = Number(pos.width);
    const top = Number(pos.top);
    const left = Number(pos.left);
    const startX = downEvent.clientX;
    const startY = downEvent.clientY;
    const move = (moveEvent) => {
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;
      const disY = currY - startY;
      const disX = currX - startX;
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
      const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
      pos.height = newHeight > 0 ? newHeight : 0;
      pos.width = newWidth > 0 ? newWidth : 0;
      pos.left = left + (hasL ? disX : 0);
      pos.top = top + (hasT ? disY : 0);
      curComponent.style = pos;
      const newSource = componentsData;
      newSource[componentIndex] = curComponent;
      changeStore({
        curComponent: {
          ...curComponent,
          component: {
            ...curComponent.component,
            style: pos,
          },
        },
        componentsData: newSource,
      });
    };

    const up = () => {
      recordSnapshot();
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  render() {
    const { children, componentData, componentIndex } = this.props;
    return (
      <div
        className="shape"
        onMouseDown={this.componentMouseDown}
        onClick={this.selectCurComponent}
        style={{
          zIndex: componentIndex,
          ...componentData.style,
        }}
      >
        {this.getPointList().map((item) => {
          return (
            <div
              className="shape-point"
              key={item}
              style={this.getPointStyle(item)}
              onMouseDown={(e) => this.handleMouseDownOnPoint(item, e)}
            ></div>
          );
        })}
        {children}
      </div>
    );
  }
}
