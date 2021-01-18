import React from "react";
import RefreshButton from "./RefreshButton";
import { Space } from "antd";
import DownLoadButton from "./DownloadButton";
import RemoveButton from "./RemoveButton";
import ChooseAllButton from "./ChooseAllButton";
import AddRowButton from "./AddRowButton";

const HeaderContent = () => {
  return (
    <header className="page__header">
      <Space
        className="header-block"
        size="middle"
      >
        <AddRowButton />
        <RemoveButton />
        <DownLoadButton />
        <RefreshButton />
        <ChooseAllButton />
      </Space>
    </header>
  );
};

export default HeaderContent;