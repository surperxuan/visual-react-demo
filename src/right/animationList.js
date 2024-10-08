import React from "react";
import { Button, Drawer, Tabs } from "antd";
import animationClassData from "./../utils/animation";

export default class AnimationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
    };
  }

  openDrawer = () => {
    this.setState({
      showPreview: true,
    });
  };

  closePreview = () => {
    this.setState({
      showPreview: false,
    });
  };

  chooseAnimation = (item) => {
    const { componentsData, changeStore, curComponent } = this.props;
    const { animations = [] } = curComponent.component;
    const newSource = [...componentsData];
    newSource[curComponent.index].animations.push(item);
    changeStore({
      componentsData: newSource,
      curComponent: {
        ...curComponent,
        component: {
          ...curComponent.component,
          animations: [...animations, item],
        },
      },
    });
    this.closePreview();
  };

  render() {
    const { curComponent } = this.props;
    const { animations = [] } = curComponent.component;
    return (
      <div>
        <Button onClick={this.openDrawer}>添加动画</Button>
        <div>
          {animations.map((item, index) => (
            <div key={index}>{item.label}</div>
          ))}
        </div>
        <Drawer
          title="动画列表"
          placement="right"
          onClose={this.closePreview}
          open={this.state.showPreview}
          width={1000}
        >
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Tabs
              items={animationClassData.map((item, index) => {
                return {
                  label: item.label,
                  key: index,
                  children: (
                    <div>
                      {item.children.map((item, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => this.chooseAnimation(item)}
                          >
                            {item.label}
                          </div>
                        );
                      })}
                    </div>
                  ),
                };
              })}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}
