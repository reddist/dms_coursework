import React from "react";
import RefreshButton from "./RefreshButton";
import { Space } from "antd";
import DownLoadButton from "./DownloadButton";
import RemoveButton from "./RemoveButton";
import ChooseAllButton from "./ChooseAllButton";

const HeaderContent = () => {
  return (
    <header className="page__header">
      <Space
        className="header-block"
        size="middle"
      >
        {/*
      TODO сделать кнопки для таблицы:
        - добавить кортеж,
        - удалить кортежи,
     */}
        <RemoveButton />
        <DownLoadButton />
        <RefreshButton />
        <ChooseAllButton />
      </Space>
    </header>
  );
};

export default HeaderContent;