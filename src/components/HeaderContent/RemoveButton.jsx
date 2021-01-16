import React from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoadingTableData,
  selectSelectedRows
} from "../../store/selectors";
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAction } from "../helpers/function/useAction";
import { REMOVE_ROWS } from "../../store/actions";

const RemoveButton = () => {
  const table_loading = useSelector(selectIsLoadingTableData);
  const removeRows = useAction(REMOVE_ROWS);
  const selectedRowsSize = useSelector(selectSelectedRows).length;
  const disabled = selectedRowsSize <= 0;
  return (
    <Popconfirm
      title="Вы уверены?"
      okText="Да"
      cancelText="Нет"
      onConfirm={removeRows}
    >
      <Button
        type="danger"
        loading={!disabled && table_loading}
        disabled={disabled}
      >
        <DeleteOutlined />
        {`Удалить (${selectedRowsSize})`}
      </Button>
    </Popconfirm>
  );
};

export default RemoveButton;