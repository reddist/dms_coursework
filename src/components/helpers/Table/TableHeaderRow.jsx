import React from "react";
import classNames from "classnames";

const TableHeaderRow = ({
  className,
  titles
}) => {
  return (
    <tr className={classNames("table table__row table__header", className)}>
      {titles.map(header_item =>
        <td className={"table table__header-item"}>
          {header_item}
        </td>
      )}
    </tr>
  );
};

export default TableHeaderRow;