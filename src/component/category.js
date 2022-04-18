import React, { forwardRef, useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import {
  AddBox, ArrowUpward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline,
  Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn, ArrowDownward
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

const CategoryTable = (props) => {
  const { column, data, title, app } = props;
  const [srcData, setSrcData] = useState(data);
  const [selected, setSelected] = useState([]);
  const [add, setAdded] = useState([]);
  const [update, setUpdated] = useState([]);
  const [remove, setRemoved] = useState([]);

  function getNewDataBulkEdit(changes, copyData) {
    // key matches the column data id
    const keys = Object.keys(changes);
    for (let i = 0; i < keys.length; i++) {
      if (changes[keys[i]] && changes[keys[i]].newData) {
        // Find the data item with the same key in copyData[]
        let targetData = copyData.find((el) => el.id === keys[i]);
        if (targetData) {
          let newTargetDataIndex = copyData.indexOf(targetData);
          copyData[newTargetDataIndex] = changes[keys[i]].newData;
        }
      }
    }
    return copyData;
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
          onBulkUpdate: (changes) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                let copyData = [...data];
                setSrcData(getNewDataBulkEdit(changes, copyData));
                resolve();
              }, 1000);
            })
          },
          onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
          onRowUpdateCancelled: (rowData) => console.log("Row editing cancelled"),
          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.id = "uuid-" + Math.random() * 10000000;
                setSrcData([...data, newData]);
                resolve();
              }, 1000);
            });
          },
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                // In dataUpdate, find target
                const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
                const index = dataUpdate.indexOf(target);
                dataUpdate[index] = newData;
                setSrcData([...dataUpdate]);
                resolve();
              }, 1000);
            });
          },
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const target = dataDelete.find((el) => el.id === oldData.tableData.id);
                const index = dataDelete.indexOf(target);
                dataDelete.splice(index, 1);
                setSrcData([...dataDelete]);
                console.log(dataDelete)
                resolve();
              }, 1000);
            });
          },
        }}
      />
    </>
  )
}
export default CategoryTable;
