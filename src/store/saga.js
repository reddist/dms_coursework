import {
  call,
  put,
  takeLatest,
  select,
  delay
} from "redux-saga/effects";
import * as ACTION from "./actions";

import {
  availableTablesFetch,
  setSelectedRows
} from "./actionCreators";
import { getIn } from "immutable";
import * as api from "./api";
import {selectNameOfCurrentTable, selectSelectedRows} from "./selectors";
import openNotification from "../components/helpers/function/notification";

function* fetchTableData(tableName) {
  yield put({
    type: ACTION.TABLES_DATA.start,
  });
  try {
    const response = yield call(api.loadTableData, tableName);
    yield put({
      type: ACTION.TABLES_DATA.success,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: ACTION.TABLES_DATA.error,
    });
  }
}

function* fetchAvailableTables() {
  yield put({
    type: ACTION.AVAILABLE_TABLES.start,
  });
  try {
    const response = yield call(api.loadAvailableTables);
    yield put({
      type: ACTION.AVAILABLE_TABLES.success,
      payload: response,
    });
    const current_table = getIn(response, ["available_tables"], [])[0];
    yield put({
      type: ACTION.SET_CURRENT_TABLE,
      payload: current_table,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: ACTION.AVAILABLE_TABLES.error,
    });
  }
}

function* sendSelectedRowsToDelete(tableName, keys) {
  try {
    const response = yield call(api.removeRows, tableName, keys);
    const text = getIn(response, ["text"], "something went wrong");
    const type = getIn(response, ["type"], "error");
    const duration = getIn(response, ["duration"], 2.0);
    openNotification(type, "", text, duration);
  } catch (error) {
    console.log(error);
    openNotification('error', "", "something went wrong");
  }
}

function* sendDataToAddARow(tableName, data) {
  try {
    const response = yield call(api.addRow, tableName, data);
    const text = getIn(response, ["text"], "something went wrong");
    const type = getIn(response, ["type"], "error");
    const duration = getIn(response, ["duration"], 2.0);
    openNotification(type, "", text, duration);
  } catch (error) {
    console.log(error);
    openNotification('error', "", "something went wrong");
  }
}

function* fetchForeignRow(tableName, key) {
  try {
    const response = yield call(api.getRow, tableName, key);
    const type = getIn(response, ["type"], "error");
    const data = {
      type,
      data: getIn(response, ["data"], "Не удалось получить данные.")
    }
    yield put({
      type: ACTION.SET_FOREIGN_ROW_DATA,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    openNotification('error', "", "something went wrong");
  }
}

const sagas = [
  function*() {
    yield takeLatest([ACTION.AVAILABLE_TABLES.fetch], function*() {
      yield delay(1000);
      yield call(fetchAvailableTables);
    });
    yield takeLatest([ACTION.TABLES_DATA.fetch], function*(action){
      yield delay(1000);
      const tableName = action["payload"];
      yield call(fetchTableData, tableName);
    });
  },
  function*() {
    yield takeLatest([ACTION.SET_CURRENT_TABLE], function*(action) {
      yield put({
        type: ACTION.TABLES_DATA.fetch,
        payload: action["payload"],
      })
    });
  },
  function*() {
    yield takeLatest([ACTION.REMOVE_ROWS], function*(){
      yield put({
        type: ACTION.LOADING_TABLE_DATA,
        payload: true
      });
      const selected_rows = yield select(selectSelectedRows);
      const table_name = yield select(selectNameOfCurrentTable);
      console.log({table_name, selected_rows});
      yield call(sendSelectedRowsToDelete, table_name, selected_rows);
      yield put(setSelectedRows([]));
      yield put({
        type: ACTION.TABLES_DATA.fetch,
        payload: table_name,
      });
    });
  },
  function*() {
    yield takeLatest([ACTION.ADD_A_ROW], function*(action){
      const newRowData = action["payload"];
      yield put({
        type: ACTION.LOADING_TABLE_CONTENT,
        payload: true
      });
      const table_name = yield select(selectNameOfCurrentTable);
      console.log({table_name, newRowData});
      yield delay(700);
      yield call(sendDataToAddARow, table_name, newRowData);
      yield put(setSelectedRows([]));
      yield put({
        type: ACTION.LOADING_TABLE_CONTENT,
        payload: false
      });
      yield put({
        type: ACTION.TABLES_DATA.fetch,
        payload: table_name,
      });
    });
  },
  function*() {
    yield takeLatest([ACTION.FETCH_FOREIGN_ROW], function*(action){
      const { tableName, key } = action["payload"];
      yield put({
        type: ACTION.LOADING_FOREIGN_ROW,
        payload: true
      });
      console.log({tableName, key});
      yield delay(700);
      yield call(fetchForeignRow, tableName, key);
      yield put({
        type: ACTION.LOADING_FOREIGN_ROW,
        payload: false
      });
    });
  },
  function*() {
    yield put(availableTablesFetch(true))
  }
];

export default sagas;