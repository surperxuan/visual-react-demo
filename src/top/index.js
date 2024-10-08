import React from "react";
import { Button, Drawer } from "antd";
import Wrapper from "./componentWrapper";

export default class TopComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      revokeComp,
      redoComp,
      saveComp,
      previewComp,
      closePreview,
      showPreview,
      componentsData,
      clearCanvas,
    } = this.props;
    return (
      <div>
        <Button onClick={revokeComp}>撤销</Button>
        <Button onClick={redoComp}>重做</Button>
        <Button onClick={saveComp}>保存</Button>
        <Button onClick={previewComp}>预览</Button>
        <Button onClick={clearCanvas}>清空</Button>
        <Drawer
          title="预览"
          placement="right"
          onClose={closePreview}
          open={showPreview}
          width={1400}
          destroyOnClose={true}
        >
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            {componentsData.map((item, index) => {
              const wrapperProps = {
                componentData: item,
              };
              return <Wrapper {...wrapperProps} key={index} />;
            })}
          </div>
        </Drawer>
      </div>
    );
  }
}
