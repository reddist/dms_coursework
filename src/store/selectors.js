import { createSelector } from "reselect";
import { getIn } from "immutable";

export const selectIsAuthorised = createSelector(
  (state) => getIn(state, ["app", "is_authorised"], false),
  (is_authorised) => is_authorised
);

export const selectTableDataByTableName = (tableName) => createSelector(
  (state) => getIn(state, ["app", "tables", "data", tableName], null),
  tableData => tableData
);

export const selectAvailableTables = (state) =>
  getIn(state, ["app", "tables", "available_tables"], []);