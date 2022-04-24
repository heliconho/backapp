import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react'
import { app } from '../helper/connection';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { FormGroup, FormLabel } from '@material-ui/core';
import Select from 'react-select';
import { BSON } from "realm-web";
import Button from '@material-ui/core/Button';
import { Checkbox } from 'rsuite';

const categoryComponent = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const { categoryData, formType } = props;
  const [loading, setLoading] = useState(true);
  const [formKeys, setFormKeys] = useState([]);

  useEffect(() => {
    const sample = categoryData[0];
    const keys = Object.keys(sample).map(function (n, i) {
      let t = '';
      if (typeof sample[n] === 'string') {
        t = 'text';
        return t
      } else if (typeof sample[n] === 'number') {
        t = 'number';
        return t
      } else if (typeof sample[n] === 'boolean') {
        t = 'checkbox';
        return t
      } else if (typeof sample[n] === 'object') {
        t = 'select';
        return t
      }
      return {
        name: n,
        type: t
      }
    })
    setFormKeys(keys);
  }, []);


  return (
    <div>
      <h2>{formType} Form Page</h2>
      <FormControl>
        {formKeys.map((item, i) => {
          <FormGroup>
            <FormLabel>{item}</FormLabel>
            {item.type === 'text' ? <TextField name={item.name} onChange={handleChange} /> : null}
            {item.type === 'number' ? <TextField name={item.name} onChange={handleChange} /> : null}
            {item.type === 'boolean' ? <Checkbox name={item.name} onChange={handleChange} /> : null}
            {item.type === 'select' ? <Select name={item.name} onChange={handleChange} /> : null}
          </FormGroup>
        })}
      </FormControl>
    </div>
  )
}