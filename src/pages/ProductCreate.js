import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react'
import { app } from '../helper/connection';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { FormGroup, FormLabel } from '@material-ui/core';
import Select from 'react-select';
import { BSON } from "realm-web";


// import Loading from './Loading';
var h2m = require('h2m')
const cloudName = 'nonenone25251325zz';
const apiKey = 'k8kug5f74gfkmli1ngigd51sibwf69p3425uoocka2sxx48e';
const unsignedUploadPreset = 'adz8s31b';

// "productNameCn": item.productNameCn,
//           "productNameEn": item.productNameCn,
//           "sku": item.sku,
//           "brand": item.brand,
//           "descriptionCn": item.descriptionCn,
//           "descriptionEn": item.descriptionEn,
//           "priceFake": item.priceFake,
//           "priceOrg": item.priceOrg,
//           "height": item.height,
//           "length": item.length,
//           "width": item.width,
//           "weight": item.weight,

const ProductPage = () => {
  const [productNameCn, setProductNameCn] = useState('');
  const [productNameEn, setProductNameEn] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [priceFake, setPriceFake] = useState('');
  const [priceOrig, setPriceOrig] = useState('');
  const [height, setHeight] = useState('');
  const [length, setLenght] = useState('');
  const [width, setWidth] = useState('');
  const [weight, setWeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');
  const [descriptionCn, setDescriptionCn] = useState({
    content: "",
    saved: false,
    post: { description: "" },
    urlImage: '',
    loading: false
  });
  const [descriptionEn, setDescriptionEn] = useState({
    content: "",
    saved: false,
    post: { description: "" },
    urlImage: '',
    loading: false
  });

  const styles = theme => ({
    formControl: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
  });
  useEffect(() => {
    const res = app.currentUser.mongoClient('mongodb-atlas').db('ynhdb').collection('Category').find().then(res => { return res }).catch(err => { return err });
    async function getCategoryData(res) {
      const trimmed = res.map(function (item, i) {
        return {
          value: BSON.ObjectId(item._id).toString(),
          label: item.categoryName
        };
      });
      setCategory(trimmed);
    }
    async function getSubCategoryData(res) {
      const header = res.map(item => {
        return (item.subCategories)
      }).flat();
      const trimmed = header.map(item => {
        return ({
          value: item,
          label: item
        })
      })
      setSubCategories(trimmed);
    }
    getCategoryData(res);
    getSubCategoryData(res);
    const input = document.getElementsByTagName("input")
    if (descriptionCn.loading && input) {
      input.disabled = true
    }
    else if (!descriptionCn.loading && input) {
      input.disabled = false
    }
    if (descriptionEn.loading && input) {
      input.disabled = true
    }
    else if (!descriptionEn.loading && input) {
      input.disabled = false
    }
  })
  const handleDescriptionCn = (content, editor) => {
    // console.log(e.target.getContent())
    console.log(content)
    setDescriptionCn({ ...descriptionCn, content: content })
  }
  const handleDescriptionEn = (content, editor) => {
    // console.log(e.target.getContent())
    console.log(content)
    setDescriptionEn({ ...descriptionEn, content: content })
  }
  const handleProductNameCnChange = (e) => {
    setProductNameCn(e.target.value);
  }
  const handleProductNameEnChange = (e) => {
    setProductNameEn(e.target.value);
  }
  const handlePriceOriginal = (e) => {
    setPriceOrig(e.target.value);
  }
  const handlePriceFake = (e) => {
    setPriceFake(e.target.value);
  }
  const handleLength = (e) => {
    setLenght(e.target.value);
  }
  const handleWidth = (e) => {
    setWidth(e.target.value);
  }
  const handleHeight = (e) => {
    setHeight(e.target.value);
  }
  const handleWeight = (e) => {
    setWeight(e.target.value);
  }
  const handleSkuChange = (e) => {
    setSku(e.target.value);
  }
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  }
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  }
  const handleStatusChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    setCategory([...status, newValue]);
    console.groupEnd();
  };
  const handleCategoryChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    setCategory([...category, newValue]);
    console.groupEnd();
  };
  const handleSubCategoryChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    setSubCategories([...subCategories, newValue]);
    console.groupEnd();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      "productNameCn": productNameCn,
      "productNameEn": productNameCn,
      "sku": sku,
      "brand": brand,
      "descriptionCn": descriptionCn,
      "descriptionEn": descriptionEn,
      "priceFake": priceFake,
      "priceOrig": priceOrig,
      "height": height,
      "length": length,
      "width": width,
      "weight": weight,
      "createdAt": new Date(),
      "updatedAt": new Date()
    };
    app.currentUser.mongoClient('mongodb-atlas').db('ynhdb').collection('Product').insertOne(product).then(res => {
      alert(`Product ${productNameCn} has been added`)
    }).catch(err => { alert(err) })
  }
  const statusOptions = [
    { value: '1', label: 'Available' },
    { value: '2', label: 'OffLine' },
    { value: '3', label: 'SoldOut' },
  ]

  return (
    <div>
      <h2 style={{ 'textAlign': 'center' }}>Create Product Page</h2>
      <FormControl style={{ width: '100%' }}>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Product Name Chinese</FormLabel>
          <TextField id="productnamecn-input" name="productnamecn" label="Product Name Chinese" type="text" value={productNameCn} onChange={handleProductNameCnChange} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Product Name English</FormLabel>
          <TextField id="productnameen-input" name="productnameen" label="Product Name English" type="text" value={productNameEn} onChange={handleProductNameEnChange} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>SKU</FormLabel>
          <TextField id="sku-input" name="sku" label="SKU" type="text" value={sku} onChange={handleSkuChange} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Brand</FormLabel>
          <TextField id="brand-input" name="brand" label="Brand" type="text" value={brand} onChange={handleBrandChange} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: `${category.length * 10}px` }}>
          <FormLabel>Category</FormLabel>
          <Select autoFocus={true} menuPosition="absolute" isMulti name={'Category'} onChange={handleCategoryChange} options={category} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: `${subCategories.length * 10}px` }}>
          <FormLabel>Sub Category</FormLabel>
          <Select autoFocus={true} menuPosition="absolute" isMulti name={'SubCategory'} onChange={handleSubCategoryChange} options={subCategories} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Description Chinese</FormLabel>
          <div className="editor">
            <div style={{ width: '100%' }}>
              <Editor
                id='tiny-react_37007362141648373049453'
                apiKey={apiKey}
                initialValue='<p>Input Product Description</p>'
                init={{
                  height: 600,
                  menubar: true,
                  skin: 'oxide-dark',
                  content_css: 'dark',
                  images_upload_base_path: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  images_upload_credentials: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    `undo redo| link code image | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help`,
                  image_title: true,
                  automatic_uploads: true,
                  file_picker_types: 'image',
                  file_picker_callback: function (cb, value, meta) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
                    var xhr = new XMLHttpRequest();
                    var fd = new FormData();
                    xhr.open('POST', url, true);

                    input.onchange = function () {
                      var file = this.files[0];
                      var reader = new FileReader();
                      xhr.onload = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                          // File uploaded successfully
                          var response = JSON.parse(xhr.responseText);

                          // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                          var url = response.secure_url;
                          // console.log(url)
                          // Create a thumbnail of the uploaded image, with 150px width
                          cb(url, { title: response.original_filename });

                        }
                      };

                      reader.onload = function () {
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];

                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        // call the callback and populate the Title field with the file name

                        fd.append('upload_preset', unsignedUploadPreset);
                        fd.append('tags', 'browser_upload');
                        fd.append('file', blobInfo.blob(), blobInfo.filename());

                        xhr.send(fd);

                      };
                      reader.readAsDataURL(file);
                    };
                    input.click();
                  },
                  images_upload_handler: (blobInfo, success, failure) => {
                    let data = new FormData();
                    var reader = new FileReader();
                    // var file = this.files[0];
                    var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
                    data.append('file', blobInfo.blob(), blobInfo.filename());
                    data.append('upload_preset', unsignedUploadPreset);
                    data.append('tags', 'browser_upload');
                    // axios.post(url, data)
                    //   .then(function (res) {
                    //     success(res.data.secure_url)
                    //   })
                    //   .catch(function (err) {
                    //     console.log(err)
                    //   });
                    reader.readAsDataURL(blobInfo.blob())
                  },
                }}
                onEditorChange={handleDescriptionCn}
                value={descriptionCn.content}
              />
            </div>
          </div>
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Description English</FormLabel>
          <div className="editor">
            <div style={{ width: '100%' }}>
              <Editor
                id='tiny-react_37007362141648373049453'
                apiKey={apiKey}
                initialValue='<p>Input Product Description</p>'
                init={{
                  height: 600,
                  menubar: true,
                  skin: 'oxide-dark',
                  content_css: 'dark',
                  images_upload_base_path: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  images_upload_credentials: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    `undo redo| link code image | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help`,
                  image_title: true,
                  automatic_uploads: true,
                  file_picker_types: 'image',
                  file_picker_callback: function (cb, value, meta) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
                    var xhr = new XMLHttpRequest();
                    var fd = new FormData();
                    xhr.open('POST', url, true);

                    input.onchange = function () {
                      var file = this.files[0];
                      var reader = new FileReader();
                      xhr.onload = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                          // File uploaded successfully
                          var response = JSON.parse(xhr.responseText);

                          // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                          var url = response.secure_url;
                          // console.log(url)
                          // Create a thumbnail of the uploaded image, with 150px width
                          cb(url, { title: response.original_filename });

                        }
                      };

                      reader.onload = function () {
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];

                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        // call the callback and populate the Title field with the file name

                        fd.append('upload_preset', unsignedUploadPreset);
                        fd.append('tags', 'browser_upload');
                        fd.append('file', blobInfo.blob(), blobInfo.filename());

                        xhr.send(fd);

                      };
                      reader.readAsDataURL(file);
                    };
                    input.click();
                  },
                  images_upload_handler: (blobInfo, success, failure) => {
                    let data = new FormData();
                    var reader = new FileReader();
                    // var file = this.files[0];
                    var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
                    data.append('file', blobInfo.blob(), blobInfo.filename());
                    data.append('upload_preset', unsignedUploadPreset);
                    data.append('tags', 'browser_upload');
                    // axios.post(url, data)
                    //   .then(function (res) {
                    //     success(res.data.secure_url)
                    //   })
                    //   .catch(function (err) {
                    //     console.log(err)
                    //   });
                    reader.readAsDataURL(blobInfo.blob())
                  },
                }}
                onEditorChange={handleDescriptionEn}
                value={descriptionEn.content}
              />
            </div>
          </div>
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Price Original</FormLabel>
          <TextField id="priceOrig-input" name="priceorig" label="Price Original" type="text" value={priceOrig} onChange={handlePriceOriginal} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Price Fake</FormLabel>
          <TextField id="priceFake-input" name="pricefake" label="Price Fake" type="text" value={priceFake} onChange={handlePriceFake} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Width</FormLabel>
          <TextField id="width-input" name="width" label="width" type="text" value={width} onChange={handleWidth} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Height</FormLabel>
          <TextField id="height-input" name="height" label="height" type="text" value={height} onChange={handleHeight} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Length</FormLabel>
          <TextField id="length-input" name="length" label="length" type="text" value={length} onChange={handleLength} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Weight</FormLabel>
          <TextField id="weight-input" name="weight" label="weight" type="text" value={weight} onChange={handleWeight} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Quantity</FormLabel>
          <TextField id="quantity-input" name="quantity" label="quantity" type="text" value={quantity} onChange={handleQuantity} />
        </FormGroup>
        <FormGroup style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <FormLabel>Status</FormLabel>
          <Select options={statusOptions} onChange={handleStatusChange} />
        </FormGroup>
      </FormControl>
    </div>
  )
}

export default ProductPage