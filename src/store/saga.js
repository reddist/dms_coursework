import {
  call,
  put,
  takeLatest,
  select,
  take,
  delay,
  all
} from "redux-saga/effects";
import * as ACTION from "./actions";

import {availableTablesFetch} from "./actionCreators";
import {getIn} from "immutable";
import * as api from "./api";

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
    yield put(availableTablesFetch(true))
  }
];