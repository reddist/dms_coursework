import createReducer from "../components/helpers/function/createReducer";
import initialState from "./initialState";
import * as ACTION from "./actions";
import { getIn, setIn } from "immutable";
import deepMerge from "../components/helpers/function/deepMerge";

const reducer = createReducer(
  initialState,
  {
    [ACTION.AVAILABLE_TABLES.fetch]: [
      (state) => setIn(state, ["app", "loading"], true)
    ],
    [ACTION.SET_CURRENT_TABLE]: [
      (state, { payload }) =>
        setIn(state, ["app", "current_table"], payload)
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
  }
)

export default reducer;