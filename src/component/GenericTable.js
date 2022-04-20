import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Toggle, Button } from 'rsuite';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import 'rsuite-table/dist/css/rsuite-table.css'

function GenericTable(props) {
  const { tableColumn, tableData, loading, pathto } = props;
  function HandleAddNew() {
    console.log(pathto);
    let navigate = useNavigate();
    navigate(pathto);
  }
  return (
    <div>
      <div>
        <span>
          {pathto !== "" ? <Link to={pathto} style={{ height: "2rem" }}>Click to add new</Link> : null}
        </span>
      </div>
      <Table
        data={tableData}
        loading={loading}
        height={800}
        wordWrap
        bordered
        cellBordered
        affixHorizontalScrollbar
        onRowClick={data => {
          console.log(data);
        }}>
        {
          tableColumn.map((item, index) => {
            return (
              <Column key={index} width={item.width} sortable fixed resizable>
                <HeaderCell>{item.name}</HeaderCell>
                <Cell dataKey={item.name} />
              </Column>
            )
          })
        }
      </Table>
    </div>
  )

}

export default GenericTable;