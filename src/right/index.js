import React from "react";
import { Tabs } from "antd";
import AttrList from "./attrList";
import AnimationList from "./animationList";
import EventsList from "./eventsList";

export default class RightComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeTab = () => {};

  render() {
    const { curComponent, changeStore, componentsData } = this.props;
    const attrProps = {
      curComponent,
      changeStore,
      componentsData,
    };
    return (
      <div>
        <Tabs
          items={[
            { label: "属性", key: "1", children: <AttrList {...attrProps} /> },
            {
              label: "动画",
              key: "2",
              children: <AnimationList {...attrProps} />,
            },
            {
              label: "事件",
              key: "3",
              children: <EventsList {...attrProps} />,
            },
          ]}
          onChange={this.changeTab}
        />
      </div>
    );
  }
}
