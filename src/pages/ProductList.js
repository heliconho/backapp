import React, { useState, useEffect } from 'react';
import ProductTable from '../component/product';
import { app } from '../helper/connection';
import Loading from "../component/loading";
import { BSON } from "realm-web";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const client = app.currentUser.mongoClient('mongodb-atlas');
  const headCells = [
    { field: "id", title: "Id" },
    { field: "productName", title: "Product Name" },
    { field: "createdAt", title: "Created At" },
    { field: "updatedAt", title: "Updated At" },
  ];
  useEffect(() => {
    async function getData() {
      const res = await client.db('ynhdb').collection('Products').find();
      console.log(res);
      const trimmed = res.map(function (item, i) {
        return {
          "id": BSON.ObjectId(item._id).toString(),
          "productName": item.productName,
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
        {/* {loading ? (<Loading />) : (<ProductTable data={data} column={headCells} title="Product" app={app} />)} */}
        {loading &&
          (
            <div className="text-center">
              <Loading />
            </div>
          )}
        {
          <ProductTable data={data} column={headCells} title="Product" app={app} />
        }
      </div>
    </>
  );
}

export default ProductListPage;