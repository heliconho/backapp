import React, { forwardRef, useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import {
  AddBox, ArrowUpward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit,
  FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn, ArrowDownward
} from "@material-ui/icons";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const ProductTable = (props) => {
  const { column, data, title, app } = props;
  const [srcData, setSrcData] = useState(data);

  function handleAddRowClick() {
    console.log(`Clicked ${new Date().getDate()}`);
  }

  return (
    <>
      <MaterialTable
        title={title}
        icons={tableIcons}
        columns={column}
        data={srcData.length == 0 ? data : srcData}
        options={{
          pagin: true,
          pageSize: 10,       // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions: [10, 20, 30],    // rows selection options
        }}
        editable={{
          onRowAdd: newData => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                handleAddRowClick();
              }, 1000)
            })
          }

        }}
      />
    </>
  )
}

export default ProductTable;