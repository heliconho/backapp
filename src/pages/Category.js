import React,{useState,useEffect} from "react";
import CategoryTable from "../component/category";
import Loading from "../component/loading";
import {app,client} from '../helper/connection'
import { BSON } from "realm-web";

const CategoryPage = () =>{
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const headCells = [
    { field: "id", title: "Id" },
    { field: "categoryName",  title: "Category Name" },
    { field: "createdAt", title: "Created At" },
    { field: "updatedAt",  title: "Updated At" },
  ];
  
  useEffect(() => {
    async function getData() {
      const res = await client.db('ynhdb').collection('Category').find();
      console.log(res);
      const trimmed = res.map(function(item,i){
        return {
          "id" : BSON.ObjectId(item._id).toString(),
          "categoryName" : item.categoryName,
          "createdAt" : new Date(item.createdAt).toLocaleDateString(),
          "updatedAt" : new Date(item.updatedAt).toLocaleDateString()
        };
      });
      console.log(trimmed);
      setData(trimmed);
      setLoading(false); 
    }
    if(loading){
      getData();
    }
  },[loading])
  return(
    <>
    <div>
    {loading && 
      (
        <div className="text-center">
          <Loading />
        </div>
      )}
      {
        <CategoryTable data={data} column={headCells} title="Category" app={app}/>
      }
    </div>
    </>
  );
}
export default CategoryPage;  

