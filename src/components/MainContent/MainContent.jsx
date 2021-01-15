import React from "react";
import { connect } from "react-redux";
import {
  selectNameOfCurrentTable,
  selectCurrentTableData,
  selectIsLoadingTableData
} from "../../store/selectors";
import {bindActionCreators} from "redux";
import {setCurrentTable} from "../../store/actionCreators";
import LoaderOverlay from "../helpers/LoaderOverlay/LoaderOverlay";
import TableContent from "./TableContent";

const MainContent = ({
  loading = false,
  current_table,
  data,
}) => {
  return (
    <main className="main-content">
      <div className="container-fluid page__wrapper">
        <h2 className="table-title">{current_table}</h2>
        <div className="content-block">
          <LoaderOverlay loading={loading}>
            <TableContent data={data} />
          </LoaderOverlay>
        </div>
      </div>
    </main>
  );
};

export default connect((state) => ({
    loading: selectIsLoadingTableData(state),
    current_table: selectNameOfCurrentTable(state),
    data: selectCurrentTableData(state),
  }),
  (dispatch) => ({
    setCurrentTable: bindActionCreators(setCurrentTable, dispatch),
  })
)(MainContent);