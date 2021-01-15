import React from "react";
// import SimpleStore from "./components/helpers/function/SimpleStore"
// import { useSelector } from "react-redux";
//
// import Table from "./components/helpers/Table/Table";
// import TableRow from "./components/helpers/Table/TableRow";
// import TableHeaderRow from "./components/helpers/Table/TableHeaderRow";
import LeftMenuPanel from "./components/LeftMenuPanel/LeftMenuPanel";
import HeaderContent from "./components/HeaderContent/HeaderContent";
import MainContent from "./components/MainContent/MainContent";

const App = () => {
  return (
    <div className="page">
      <LeftMenuPanel />
      <div className="page__content">
        <HeaderContent />
        <MainContent />
      </div>
    </div>
  );
}

export default App;



/*
const table_data = [
  [10, 5, -3, 4, -7, 0],
  [15, 0, 1, -3, 2, 1],
  [20, -2, 3, -4, 8, -5],
];
const table_headers = [
  "age",
  "metrics",
  "elements",
  "weight",
  "rules",
  "number"
];*/
