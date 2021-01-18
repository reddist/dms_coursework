import React from "react";
import { getIn } from "immutable";
import { useAction } from "../helpers/function/useAction";
import { useSelector } from "react-redux";
import { Table, Tooltip, Descriptions } from 'antd';
import 'antd/dist/antd.css';
import {FETCH_FOREIGN_ROW, SET_SELECTED_ROWS} from "../../store/actions";
import {
  selectForeignRowData,
  selectIsLoadingForeignRow,
  selectIsLoadingTableContent,
  selectSelectedRows
} from "../../store/selectors";
import { CheckOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import LoaderOverlay from "../helpers/LoaderOverlay/LoaderOverlay";
import upperCaseFirstLetter from "../helpers/function/upperCaseFirstLetter";

const ForeignRowTooltipContent = ({
  table_name,
  id
}) => {
  const isLoadingForeignRow = useSelector(selectIsLoadingForeignRow);
  const foreignRow = useSelector(selectForeignRowData);
  const foreignRowType = getIn(foreignRow, ["type"], "error");
  const foreignRowColumns = getIn(foreignRow, ["data", "columns"], []);
  const foreignRowData = getIn(foreignRow, ["data", "data"], []);
  return (
    <LoaderOverlay
      loading={isLoadingForeignRow}
    >
      {foreignRowType === "success" ? (
        <Descriptions
          title={`${upperCaseFirstLetter(table_name)}: id = ${id}`}
          column={1}
          size="small"
          bordered
        >
          {foreignRowColumns.map((column) =>
            <Descriptions.Item label={column["title"]}>
              {enhancedRender(foreignRowData[column["dataIndex"]], column["type"])}
            </Descriptions.Item>
          )}
        </Descriptions>
      ) : (
        <div>
          <p>{`${upperCaseFirstLetter(table_name)}: id = ${id}`}</p>
          <p>{foreignRow["data"]}</p>
        </div>
      )}
    </LoaderOverlay>
  );
};

const enhancedRender = (value, type) => {
  let new_value = value;
  switch (type) {
    case "boolean":
      new_value = new_value && <CheckOutlined/>;
      break;
    case "array":
      let stringifiedArray = "";
      for (let i = 0; i < new_value.length; i++) {
        stringifiedArray += new_value[i];
        if (i + 1 < new_value.length) stringifiedArray += " x "
      }
      new_value = stringifiedArray;
      break;
    case "date":
      new_value = dayjs(new_value).format("DD/MM/YYYY");
      break;
    default: break;
  }
  return new_value;
}

const addRenderProps = (
  fetchForeignRow
) => (columns) => columns.map((column) => {
  let new_column = { ...column };
  const tableName = new_column["table_name"];
  switch (new_column["type"]) {
    case "boolean":
      new_column = {
        ...new_column,
        render: (bool_data) => (
          bool_data && <CheckOutlined />
        )
      };
      break;
    case "array":
      new_column = {
        ...new_column,
        render: (array) => {
          let stringifiedArray = "";
          for (let i = 0; i < array.length; i++) {
            stringifiedArray += array[i];
            if (i + 1 < array.length) stringifiedArray += " x "
          }
          return stringifiedArray;
        }
      };
      break;
    case "date":
      new_column = {
        ...new_column,
        render: (date) => {
          return dayjs(date).format("DD/MM/YYYY");
        }
      };
      break;
    case "integer":
      if (new_column["is_foreign"]) {
        new_column = {
          ...new_column,
          render: (id) => (
            <Tooltip
              color="#ffffff"
              title={
                <ForeignRowTooltipContent
                  table_name={tableName}
                  id={id}
                />
              }
              trigger="hover"
              onVisibleChange={(visible) =>
                visible && fetchForeignRow({
                  tableName,
                  key: {
                    [new_column["dataIndex"]]: id
                  }
                })
              }
            >
              <span className="foreign-key-id">{id}</span>
            </Tooltip>
          )
        }
      }
      break;
    default: break;
  }
  return new_column;
});

const TableContent = ({
  data
}) => {
  const fetchForeignRow = useAction(FETCH_FOREIGN_ROW);
  const table_loading = useSelector(selectIsLoadingTableContent);
  const dataSource = getIn(data, ["data"], []);
  const columns = addRenderProps(
    fetchForeignRow
  )(getIn(data, ["columns"], []));
  const scroll = getIn(data, ["scroll"], {});
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
        scroll={scroll}
        loading={table_loading}
      />
    </div>
  );
}

export default TableContent;