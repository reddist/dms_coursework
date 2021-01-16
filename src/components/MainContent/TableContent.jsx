import React from "react";
import { getIn } from "immutable";
import { useAction } from "../helpers/function/useAction";
import { useSelector } from "react-redux";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { SET_SELECTED_ROWS } from "../../store/actions";
import { selectSelectedRows } from "../../store/selectors";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const addRenderProps = (columns) => columns.map((column) => {
  let new_column = { ...column };
  switch (new_column["type"]) {
    case "boolean":
      new_column = {
        ...new_column,
        render: bool_data => (
          bool_data && <CheckOutlined />
          // bool_data ? <CheckOutlined /> : <CloseOutlined />
        )
      };
      break;
    default: break;
  }
  return new_column;
});

const TableContent = ({
  data,
}) => {
  const dataSource = getIn(data, ["data"], []);
  const columns = addRenderProps(getIn(data, ["columns"], []));
  const selectedRowKeys = useSelector(selectSelectedRows);
  const pushSelectedRowsToState = useAction(SET_SELECTED_ROWS);
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRows) => {
      pushSelectedRowsToState(newSelectedRows);
    },
  }
  return (
    <div className="table-content">
      <span className="hidden">
        {`content: \n${JSON.stringify(data)}`}
      </span>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        rowSelection={rowSelection}
      />
    </div>
  );
}

export default TableContent;