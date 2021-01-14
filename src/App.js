import React from "react";

import SimpleStore from "./components/helpers/function/SimpleStore"
import { selectIsAuthorised } from "./store/selectors";
import { useSelector } from "react-redux";

import Table from "./components/helpers/Table/Table";
import TableRow from "./components/helpers/Table/TableRow";
import TableHeaderRow from "./components/helpers/Table/TableHeaderRow";

const App = () => {
  const is_authorised = useSelector(selectIsAuthorised);
  console.log(SimpleStore("password"));
  SimpleStore("password", null);
  if (!is_authorised) {
    window.location = "/auth";
    return;
  }
  return (
    is_authorised? (
      <div className="page">
        <div className="page__panel">

        </div>
        <div className="page__content">
          <header className="page__header">

          </header>
          <main className="main-content">

          </main>
        </div>
      </div>
    ) : (
      <div>
        <p>Вы не авторизированы.</p>
        <a href="/auth">Авторизоваться</a>
      </div>
    )
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
