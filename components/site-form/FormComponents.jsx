// Form Components
import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({
  formAttributes: {
    id,
    name,
    label,
    placeholder,
  },
  handleChange,
  value,
}) => (
  <div className="form-group">
    <label htmlFor={id}>{label}
      <input id={id} name={name} type="text" value={value} onChange={handleChange} placeholder={(placeholder === true ? label : '')} />
    </label>
  </div>
);

TextBox.propTypes = {
  formAttributes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.bool.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const CheckBox = ({ formAttributes: { id, name, label }, handleChange, checkbox: { checked, value } }) => (
  <div className="form-group">
    <input className="form-checkbox" id={id} name={name} type="checkbox" value={value} onChange={handleChange} checked={(checked === true ? 'checked' : '')} />
    <label className="form-label" htmlFor={id}>{label}</label>
  </div>
);

CheckBox.propTypes = {
  formAttributes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
  checkbox: PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  }),
};

const RadioButton = ({
  formAttributes: {
    id,
    name,
    label,
  },
  handleChange,
  selectedOption,
  value,
}) => (
  <div className="form-group">
    <label htmlFor={id}>
      <input id={id} name={name} type="radio" value={value} onChange={handleChange} checked={(selectedOption === value ? 'checked' : '')} />{label}
    </label>
  </div>
);

RadioButton.propTypes = {
  formAttributes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
  selectedOption: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const Button = ({ label, handleSubmit }) => (
  <button className="btn btn-default" type="button" onClick={handleSubmit}>{label}</button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export {
  TextBox,
  CheckBox,
  RadioButton,
  Button,
};
