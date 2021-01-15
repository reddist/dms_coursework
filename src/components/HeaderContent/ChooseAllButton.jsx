import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentTableData,
  selectIsLoadingTableData,
  selectSelectedRows
} from "../../store/selectors";
import { Button } from "antd";
import { useAction } from "../helpers/function/useAction";
import { SET_SELECTED_ROWS } from "../../store/actions";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const ChooseAllButton = () => {
  const table_loading = useSelector(selectIsLoadingTableData);
  const setSelectedRows = useAction(SET_SELECTED_ROWS);
  const selectedRowsNumber = useSelector(selectSelectedRows).length;
  const corteges = useSelector(selectCurrentTableData)["data"] || [];

  return (
    <Button
      loading={table_loading}
      disabled={corteges.length === 0}
      onClick={() => {
        if (selectedRowsNumber === corteges.length) {
          setSelectedRows([]);
        } else {
          setSelectedRows(corteges.map((item) => {
            return item["key"];
          }));
        }
      }}
    >
      {!table_loading && corteges.length > 0 && (
        selectedRowsNumber === corteges.length ? (
          <CloseOutlined />
        ) : (
          <CheckOutlined />
        )
      )}
      Выбрать всё
    </Button>
  );
};

export default ChooseAllButton;