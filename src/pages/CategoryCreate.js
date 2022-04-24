import { useEffect, useState } from 'react';
import { app } from '../helper/connection';
import CreatableSelect from 'react-select/creatable';
import { Button, FormControl } from '@material-ui/core';
import { FormGroup, FormLabel, TextField } from '@material-ui/core';


const CategoryCreatePage = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameCn, setCategoryNameCn] = useState("");
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
    console.groupEnd();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      'categoryName': categoryName,
      'categoryNameCn': categoryNameCn,
      'subCategories': newSubCategory,
      'createdAt': new Date(),
      'updatedAt': new Date()
    }
    app.currentUser.mongoClient('mongodb-atlas').db('ynhdb').collection('Category').insertOne(data).then(res => { alert.apply(this, ['Successfully added']) }).catch(err => { alert.apply(this, ['Error']) })
  }
  return (
    <div>
      <h2 style={{ 'textAlign': 'center' }}>Create Category Page</h2>
      <FormControl style={{ width: '80%' }} onSubmit={handleSubmit}>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Category Name:</FormLabel>
          <TextField id="categoryname-input" name="categoryname" label="Category Name Chinese" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Category Name（CN）:</FormLabel>
          <TextField id="categorynamecn-input" name="categorynameCn" label="Category Name Chinese" type="text" value={categoryNameCn} onChange={(e) => setCategoryNameCn(e.target.value)} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>SubCategories</FormLabel>
          <CreatableSelect autoFocus={true} isMulti name={'Sub Category'} onChange={handleChange} options={subCategories} />
          {/* <Select options={subCategories} /> */}
        </FormGroup>
        <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>
      </FormControl>

    </div>
  )

}
export default CategoryCreatePage;