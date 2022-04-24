import React, { useState, useEffect } from "react";
import CategoryTable from "../component/category";
import Loading from "../component/loading";
import { app } from '../helper/connection'
import { BSON } from "realm-web";
import GenericTable from "../component/GenericTable";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const client = app.currentUser.mongoClient('mongodb-atlas');
  // const headCells = [
  //   { field: "id", title: "Id" },
  //   { field: "categoryName", title: "Category Name" },
  //   { field: "createdAt", title: "Created At" },
  //   { field: "updatedAt", title: "Updated At" },
  // ];
  const headCells = [
    { name: "id", width: 150 },
    { name: "categoryName", width: 100 },
    { name: "categoryNameCn", width: 100 },
    { name: "createdAt", width: 150 },
    { name: "updatedAt", width: 150 },
  ];

  useEffect(() => {
    async function getData() {
      const res = await client.db('ynhdb').collection('Category').find();
      console.log(res);
      const trimmed = res.map(function (item, i) {
        return {
          "id": BSON.ObjectId(item._id).toString(),
          "categoryName": item.categoryName,
          "categoryNameCn": item.categoryNameCn,
          "createdAt": new Date(item.createdAt).toLocaleDateString(),
          "updatedAt": new Date(item.updatedAt).toLocaleDateString()
        };
      });
      console.log(trimmed);
      setData(trimmed);
      setLoading(false);
    }
    if (loading) {
      getData();
    }
  }, [loading])
  return (
    <>
      <div>
        {loading &&
          (
            <div className="text-center">
              <Loading />
            </div>
          )}
        {
          <GenericTable tableData={data} tableColumn={headCells} loading={loading} app={app} pathto={'/category/create'} />
        }
      </div>
    </>
  );
}
export default CategoryPage;

