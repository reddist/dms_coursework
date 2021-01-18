import createReducer from "../components/helpers/function/createReducer";
import initialState from "./initialState";
import * as ACTION from "./actions";
import { getIn, setIn } from "immutable";
import deepMerge from "../components/helpers/function/deepMerge";
import {selectFilteredData, selectTableDataByTableName} from "./selectors";
import XLSX from "xlsx";

const constructToXLSXReadableData = (data) => {
  let resultData = [];
  let columnDataIndexes = [];
  const columnNamesArray = data["columns"].map((item) => {
    columnDataIndexes.push(item["dataIndex"]);
    return item["title"];
  });
  resultData.push(columnNamesArray);
  data["data"].map((item) => {
    let newRow = [];
    columnDataIndexes.forEach((dataIndex) => {
      newRow.push(item[dataIndex]);
    });
    resultData.push(newRow);
    return item;
  });
  return resultData;
};

const download = (data, filename) => {
  let workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(constructToXLSXReadableData(data));
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

const reducer = createReducer(
  initialState,
  {
    [ACTION.AVAILABLE_TABLES.fetch]: [
      (state) => setIn(state, ["app", "loading"], true)
    ],
    [ACTION.AVAILABLE_TABLES.error]: [
      (state) => setIn(state, ["app", "loading"], false)
    ],
    [ACTION.AVAILABLE_TABLES.success]: [
      (state, { payload }) => setIn(state,
        ["app", "tables", "available_tables"],
        getIn(payload, ["available_tables"], [])
      ),
      (state) => setIn(state, ["app", "loading"], false),
    ],
    [ACTION.SET_CURRENT_TABLE]: [
      (state, { payload }) =>
        setIn(state, ["app", "current_table"], payload),
      (state) => setIn(state, ["app", "tables", "selected_rows"], []),
    ],
    [ACTION.TABLES_DATA.fetch]: [
      (state) => setIn(state, ["app", "tables", "data_loading"], true)
    ],
    [ACTION.TABLES_DATA.error]: [
      (state) => setIn(state, ["app", "tables", "data_loading"], false)
    ],
    [ACTION.TABLES_DATA.success]: [
      (state, { payload }) => {
        const tableName = getIn(payload, ["table_data", "name"], "");
        const tableData = getIn(payload, ["table_data"], {});
        if (!getIn(
          state,
          ["app", "tables", "data"],
          {}
        ).hasOwnProperty(tableName)) {
          state = deepMerge(state, {
            app: {
              tables: {
                data: {
                  [tableName]: {}
                }
              }
            }
          });
        }
        return setIn(
          state,
          ["app", "tables", "data", tableName],
          tableData
        );
      },
      (state) => setIn(state, ["app", "tables", "data_loading"], false),
    ],
    [ACTION.SET_SELECTED_ROWS]: [
      (state, { payload }) => setIn(
        state,
        ["app", "tables", "selected_rows"],
         payload
      ),
    ],
    [ACTION.LOAD_FILTERED_DATA]: [
      (state, { payload }) => {
        download({
            columns: selectTableDataByTableName(payload)(state)["columns"],
            data: selectFilteredData(payload)(state),
          },
          `${payload}`
        );
        return state;
      },
    ],
    [ACTION.LOADING_TABLE_DATA]: [
      (state, { payload }) => setIn(
        state,
        ["app", "tables", "data_loading"],
        payload
      ),
    ],
    [ACTION.LOADING_TABLE_CONTENT]: [
      (state, { payload }) => setIn(
        state,
        ["app", "table_content_loading"],
        payload
      ),
    ],
    [ACTION.LOADING_FOREIGN_ROW]: [
      (state, { payload }) => setIn(
        state,
        ["app", "loading_foreign_row"],
        payload
      ),
    ],
    [ACTION.SET_FOREIGN_ROW_DATA]: [
      (state, { payload }) => setIn(
        state,
        ["app", "foreign_row"],
        payload
      )
    ]
  }
)

export default reducer;