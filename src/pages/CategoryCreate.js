import { useEffect, useState } from 'react';
import { app } from '../helper/connection';
import Select from 'react-select';
import Creatable, { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';


const CategoryCreatePage = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await (await app.currentUser.mongoClient('mongodb-atlas').db('ynhdb').collection('Category').find());
      const header = res.map(item => {
        return (item.subCategories)
      }).flat();
      const trimmed = header.map(item => {
        return ({
          value: item,
          label: item
        })
      })
      console.log(trimmed);
      setSubCategories(trimmed);
      // console.log(trimmed)
    }
    getData();

  }, [])

  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    setNewSubCategory([...newSubCategory, newValue]);
    // console.log(newValue);
    // if (newSubCategory.length === 0) { //first time
    //   let tmpSubCat = [...newSubCategory, newValue]
    //   setNewSubCategory(tmpSubCat);
    // }
    // else {

    // }
    // console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      'categoryName': categoryName,
      'subCategories': newSubCategory,
      'createdAt': new Date(),
      'updatedAt': new Date()
    }
    app.currentUser.mongoClient('mongodb-atlas').db('ynhdb').collection('Category').insertOne(data).then(res => { alert.apply(this, ['Successfully added']) }).catch(err => { alert.apply(this, ['Error']) })
  }
  return (
    <div>
      <h2 style={{ 'textAlign': 'center' }}>Create Category Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name:</label>
          <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </div>
        <div>
          <label>SubCategories</label>
          <CreatableSelect autoFocus={true} isMulti name={'Sub Category'} onChange={handleChange} options={subCategories} />
          {/* <Select options={subCategories} /> */}
        </div>

      </form>
      <button onClick={(e) => { handleSubmit(e) }}>Submit</button>
    </div>
  )

}
export default CategoryCreatePage;