import React from "react";
import { connect } from "react-redux";
import {
  selectAvailableTables,
  selectNameOfCurrentTable,
  selectIsLoadingAvailableTables,
} from "../../store/selectors";
import { bindActionCreators } from "redux";
import { setCurrentTable } from "../../store/actionCreators"
import classNames from "classnames";
import LoaderOverlay from "../helpers/LoaderOverlay/LoaderOverlay";

const PanelItem = ({
  title,
  onClick,
  current_table,
}) => (
  <li
    className={classNames("panel-menu__item", {
      "panel-menu__item_active": title === current_table,
    })}
    onClick={onClick}
  >
    <span
      className="panel-menu__title"
    >
      {title}
    </span>
  </li>
);

const SvgLogo = () => (
  <svg width="180" height="70" xmlns="http://www.w3.org/2000/svg">
    {/*<rect fill="#2f4050" id="canvas_background" height="70" width="180" y="-1" x="-1"/>*/}
    <path id="svg_2" d="m-546.5,-272.5625c671,335 87,187 82,187c-5,0 -56,-146 -55.5,-145.4375c-0.5,-0.5625 190.5,37.4375 191,38c-0.5,-0.5625 453.5,255.4375 -217.5,-79.5625z" strokeWidth="1.5" stroke="#000" fill="#fff"/>
    <line id="svg_4" y1="10" y2="40" x1="12" x2="12" strokeWidth="1.5" stroke="#ffffff" fill="none"/>
    <line id="svg_7" y1="10" y2="10" x2="59" x1="11" strokeWidth="1.5" stroke="#ffffff" fill="none"/>
    <line id="svg_5" y1="59" y2="59" x2="168" x1="120" strokeWidth="1.5" stroke="#ffffff" fill="#2f4050"/>
    <line id="svg_6" y1="60" y2="30" x2="168" x1="168" strokeWidth="1.5" stroke="#ffffff" fill="none"/>
    <text fontStyle="normal" fontWeight="normal" xmlSpace="preserve" textAnchor="start" fontFamily="sans-serif" fontSize="24" id="svg_8" y="37.59943" x="40.04548" strokeWidth="0" stroke="#000000" fill="#ffffff">REDDIST</text>
    <text xmlSpace="preserve" textAnchor="start" fontFamily="sans-serif" fontSize="10" id="svg_9" y="50.55397" x="43.22365" strokeWidth="0" stroke="#000000" fill="#ffffff">Software laboratories</text>
  </svg>
);

const LeftMenuPanel = ({
  available_tables,
  current_table,
  setCurrentTable,
  loading,
}) => {
  return (
    <div className="page__panel">
      <div className="panel-menu__logo">
        <SvgLogo />
      </div>
      <LoaderOverlay
        loading={loading}
      >
        <ul className="panel-menu">
          {available_tables.map(tableName =>
            <PanelItem
              title={tableName}
              onClick={(event) => {
                event.preventDefault();
                if (tableName !== current_table) {
                  setCurrentTable(tableName);
                }
              }}
              key={tableName}
              current_table={current_table}
            />
          )}
        </ul>
      </LoaderOverlay>
    </div>
  );
};

export default connect((state) => ({
    available_tables: selectAvailableTables(state),
    current_table: selectNameOfCurrentTable(state),
    loading: selectIsLoadingAvailableTables(state),
  }),
  (dispatch) => ({
    setCurrentTable: bindActionCreators(setCurrentTable, dispatch),
  })
)(LeftMenuPanel);

