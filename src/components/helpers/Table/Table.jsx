import React from "react";
import classNames from "classnames";

const Table = ({children, className}) => {
  return (
    <table className={classNames("table", className)}>
      {children}
    </table>
  );
};

export default Table;