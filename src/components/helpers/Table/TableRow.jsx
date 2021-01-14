import React from "react";
import classNames from "classnames";

const TableRow = ({
  className,
  data
}) => {
  return (
    <tr className={classNames("table table__row", className)}>
      {data.map(item =>
        <td className={
          classNames("table table__item", {
            profit: item > 0,
            loss: item < 0,
          })
        }>
          {item}
        </td>
      )}
    </tr>
  );
};

export default TableRow;