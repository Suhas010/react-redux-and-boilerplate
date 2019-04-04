/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';

const JSelect = ({ labelClass, label, options, required, placeholder, error, ...rest }) => (
  <div className="labeled-input">
    <span
      className={labelClass}
    >
      {label}
      {required && <span style={{ color: 'red' }}> &nbsp;*</span>}
    </span>
    <Select {...rest} placeholder={placeholder}>
      {options.map(option => <Select.Option value={option.value === undefined ? option.id : option.value} key={`${option.value === undefined ? option.id : option.value}${option.name}`}>{option.name}</Select.Option>)}
    </Select>
    {error && <span className="error">{error}</span>}
  </div>
);

export default JSelect;
