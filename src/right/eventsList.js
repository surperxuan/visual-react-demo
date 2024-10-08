import React from "react";
import { Input } from "antd";
import { eventList } from "./../utils/events";

const { TextArea } = Input;

export default class EventsList extends React.Component {
  constructor(props) {
    super(props);
  }

  changeEvent = (e, key) => {
    const { changeStore, curComponent, componentsData } = this.props;
    const { index } = curComponent;
    const data = componentsData;
    if (index === null) {
      return;
    }
    data[index].events[key] = e.target.value;
    changeStore({
      componentsData: data,
      curComponent: {
        ...curComponent,
        component: {
          ...curComponent.component,
          events: {
            ...curComponent.component?.events,
            [key]: e.target.value,
          },
        },
      },
    });
  };

  render() {
    const { curComponent } = this.props;
    const { component } = curComponent;
    const { events = {} } = component;
    return (
      <div>
        {eventList.map((item, key) => {
          return (
            <div key={key}>
              {item.label}：
              <TextArea
                placeholder={
                  item.key === "alert" ? "请输入弹窗内容" : "请输入完整的url"
                }
                value={events[item.key]}
                onChange={(e) => this.changeEvent(e, item.key)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
