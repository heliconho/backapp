import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Toggle } from 'rsuite';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import 'rsuite-table/dist/css/rsuite-table.css'
import Button from '@material-ui/core/Button';

function GenericTable(props) {
  const { tableColumn, tableData, loading, pathto } = props;
  return (
    <div>
      <div>
        <span>
          {pathto !== "" ? <Button><Link to={pathto} style={{ height: "2rem" }}>Click to add new</Link></Button> : null}
        </span>
      </div>
      <Table
        data={tableData}
        loading={loading}
        height={800}
        wordWrap
        bordered={true}
        cellBordered={true}
        affixHorizontalScrollbar
        onRowClick={data => {
          console.log(data);
        }}>
        {
          tableColumn.map((item, index) => {
            return (
              <Column key={index} width={item.width} sortable resizable>
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