import React from "react";
import { connect } from "react-redux";
import {
  selectCurrentTable, selectCurrentTableData,
  selectIsLoadingTableData
} from "../../store/selectors";
import {bindActionCreators} from "redux";
import {setCurrentTable} from "../../store/actionCreators";
import LoaderOverlay from "../helpers/LoaderOverlay/LoaderOverlay";

const MainContent = ({
  loading = false,
  current_table,
  data,
}) => {
  return (
    <main className="main-content">
      <div className="container-fluid page__wrapper">
        <h2>{current_table}</h2>
        <div className="content-block">
          <LoaderOverlay loading={loading}>
            {`content: \n${JSON.stringify(data)}`}
          </LoaderOverlay>
        </div>
      </div>
    </main>
  );
};

export default connect((state) => ({
    loading: selectIsLoadingTableData(state),
    current_table: selectCurrentTable(state),
    data: selectCurrentTableData(state),
  }),
  (dispatch) => ({
    setCurrentTable: bindActionCreators(setCurrentTable, dispatch),
  })
)(MainContent);