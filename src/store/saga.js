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
    const type = getIn(response, ["type"], "error")
    openNotification(type, "", text);
  } catch (error) {
    console.log(error);
    openNotification('error', "", "something went wrong");
  }
}

export default [
  function*() {
    yield takeLatest([ACTION.AVAILABLE_TABLES.fetch], function*() {
      yield delay(100);
      yield call(fetchAvailableTables);
    });
    yield takeLatest([ACTION.TABLES_DATA.fetch], function*(action){
      yield delay(100);
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
    yield put(availableTablesFetch(true))
  }
];

//TODO сделать сагу для отправки данных (новый кортеж/удалить кортежи)