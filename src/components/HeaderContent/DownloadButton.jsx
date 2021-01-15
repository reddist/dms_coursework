import React from "react";
import { useSelector } from "react-redux";
import {
  selectNameOfCurrentTable,
  selectIsLoadingTableData,
  selectSelectedRows
} from "../../store/selectors";
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useAction } from "../helpers/function/useAction";
import { LOAD_FILTERED_DATA } from "../../store/actions";

const DownLoadButton = () => {
  const table_loading = useSelector(selectIsLoadingTableData);
  const selectedRowsSize = useSelector(selectSelectedRows).length;
  const currentTable = useSelector(selectNameOfCurrentTable);
  const loadFilteredData = useAction(LOAD_FILTERED_DATA);
  const disabled = selectedRowsSize <= 0;
  return (
    <Button
      loading={!disabled && table_loading}
      onClick={() => {
        loadFilteredData(currentTable);
      }}
      disabled={disabled}
    >
      <DownloadOutlined />
      {`Скачать .xlsx (${selectedRowsSize})`}
    </Button>
  );
};

export default DownLoadButton;