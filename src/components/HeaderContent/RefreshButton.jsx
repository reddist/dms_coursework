import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoadingTableData } from "../../store/selectors";
import { Button } from "antd";
import { useAction } from "../helpers/function/useAction";
import { TABLES_DATA } from "../../store/actions";

const RefreshButton = () => {
  const table_loading = useSelector(selectIsLoadingTableData);
  const refreshTable = useAction(TABLES_DATA.fetch);
  return (
    <Button
      type="primary"
      loading={table_loading}
      onClick={refreshTable}
    >
      Обновить таблицу
    </Button>
  );
};

export default RefreshButton;