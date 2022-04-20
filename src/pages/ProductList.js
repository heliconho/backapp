import React, { useState, useEffect } from 'react';
import { app } from '../helper/connection';
import Loading from "../component/loading";
import { BSON } from "realm-web";
import GenericTable from '../component/GenericTable';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [headCol, setHeadCol] = useState([]);
  const [loading, setLoading] = useState(true);
  const client = app.currentUser.mongoClient('mongodb-atlas');
  useEffect(() => {
    async function getData() {
      const res = await client.db('ynhdb').collection('Product').find();
      const trimmed = res.map(function (item, i) {
        return {
          "id": BSON.ObjectId(item._id).toString(),
          "productNameCn": item.productNameCn,
          "productNameEn": item.productNameEn,
          "sku": item.sku,
          "brand": item.brand,
          "priceFake": item.priceFake,
          "priceOrig": item.priceOrig,
          "height": item.height,
          "length": item.length,
          "width": item.width,
          "weight": item.weight,
          "status": item.status == undefined ? '未知' : item.status,
          "createdAt": new Date(item.createdAt).toLocaleDateString() == undefined ? '' : new Date(item.createdAt).toLocaleDateString(),
          "updatedAt": new Date(item.updatedAt).toLocaleDateString() == undefined ? '' : new Date(item.updatedAt).toLocaleDateString(),
        };
      });
      console.log(trimmed);
      setData(trimmed);
      setLoading(false);
      const head = Object.keys(trimmed[0]);
      const headColumns = head.map(
        (item) => {
          return {
            name: item,
            width: 150
          }
        }
      )
      console.log(headColumns);
      setHeadCol(headColumns);
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
          <GenericTable tableData={data} tableColumn={headCol} loading={loading} app={app} pathto={'/product/create'} />
        }
      </div>
    </>
  );
}

export default ProductListPage;