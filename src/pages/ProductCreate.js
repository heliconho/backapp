import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react'
import { app } from '../helper/connection';

// import Loading from './Loading';
var h2m = require('h2m')
const cloudName = 'nonenone25251325zz';
const apiKey = 'k8kug5f74gfkmli1ngigd51sibwf69p3425uoocka2sxx48e';
const unsignedUploadPreset = 'adz8s31b';

const ProductPage = () => {
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState({
    content: "",
    saved: false,
    post: { description: "" },
    urlImage: '',
    loading: false
  });
  const handleDescription = (content, editor) => {
    // console.log(e.target.getContent())
    console.log(content)
    setDescription({ ...description, content: content })
  }
  useEffect(() => {
    const input = document.getElementsByTagName("input")
    if (description.loading && input) {
      input.disabled = true
    }
    else if (!description.loading && input) {
      input.disabled = false
    }
  })
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  }
  const handleSkuChange = (e) => {
    setSku(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post('http://localhost:3000/api/product', {
    //   "productName": productName,
    //   "sku": sku,
    //   "description": description.content
    // },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     }
    //   }).then((res) => console.log(res.status)).catch(e => console.log(e));

  }


  return (
    <div>
      <h2 style={{ 'textAlign': 'center' }}>Create Product Page</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="container">
          <form onSubmit={e => handleSubmit(e)}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">Product Name</label>
              <input type="text" id="productname" onChange={e => handleProductNameChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">SKU</label>
              <input type="text" id="sku" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">Brand</label>
              <input type="text" id="brand" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">Categories</label>
              <input type="text" id="categories" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">Subcategories</label>
              <input type="text" id="subcategories" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">length</label>
              <input type="text" id="length" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">height</label>
              <input type="text" id="height" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">width</label>
              <input type="text" id="width" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">weight</label>
              <input type="text" id="weight" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">weightunit</label>
              <input type="text" id="weightunit" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">size</label>
              <input type="text" id="size" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">color</label>
              <input type="text" id="color" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">image</label>
              <input type="text" id="image" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">isactive</label>
              <input type="text" id="isactive" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-lg text-black-900 dark:text-gray-300">quantity</label>
              <input type="text" id="quantity" onChange={e => handleSkuChange(e)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
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
                    onEditorChange={handleDescription}
                    value={description.content}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductPage