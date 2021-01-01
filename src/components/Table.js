import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table(props) {
  const { columns, onSort, sortColumn, data } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}

export default Table;
