import React from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoadingActionButtons,
  selectNameOfCurrentTable
} from "../../store/selectors";
import { Button } from "antd";
import { useAction } from "../helpers/function/useAction";
import {SET_SELECTED_ROWS, TABLES_DATA} from "../../store/actions";

const RefreshButton = () => {
  const table_loading = useSelector(selectIsLoadingActionButtons);
  const currentTable = useSelector(selectNameOfCurrentTable);
  const refreshTable = useAction(TABLES_DATA.fetch);
  const resetSelectedRows = useAction(SET_SELECTED_ROWS);
  return (
    <Button
      type="primary"
      loading={table_loading}
      onClick={() => {
        resetSelectedRows([]);
        refreshTable(currentTable);
      }}
    >
      Обновить таблицу
    </Button>
  );
};

export default RefreshButton;