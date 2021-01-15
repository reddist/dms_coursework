import createReducer from "../components/helpers/function/createReducer";
import initialState from "./initialState";
import * as ACTION from "./actions";
import { getIn, setIn } from "immutable";
import deepMerge from "../components/helpers/function/deepMerge";
import {selectFilteredData, selectTableDataByTableName} from "./selectors";
import XLSX from "xlsx";

const constructToXLSXReadableData = (data) => {
  let resultData = [];
  const columnNamesArray = data["columns"].map((item) => {
    return item["title"];
  });
  resultData.push(columnNamesArray);
  data["data"].map((item) => {
    let newRow = [];
    Object.keys(item).forEach((key) =>
      key !== "key" && newRow.push(item[key])
    );
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
        return deepMerge(state, {
          app: {
            tables: {
              data: {
                [tableName]: tableData
              }
            }
          }
        });
      },
      (state) => setIn(state, ["app", "tables", "data_loading"], false),
    ],
    [ACTION.SET_SELECTED_ROWS]: [
      (state, { payload }) => setIn(state,
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
    ]
  }
)

export default reducer;