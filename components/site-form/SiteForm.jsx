import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextBox, CheckBox, RadioButton, Button } from './FormComponents';

class SiteForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      formValues: {
        text: '',
        checkbox: {
          checked: false,
          value: 'checkbox1',
        },
        selectedOption: '',
      },
      fetchResponse: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.persist();
    switch (event.target.type) {
      case 'text':
        this.setState(prevState => ({
          formValues: {
            text: event.target.value,
            checkbox: {
              checked: prevState.formValues.checkbox.checked,
              value: prevState.formValues.checkbox.value,
            },
            selectedOption: prevState.formValues.selectedOption,
          },
          fetchResponse: prevState.fetchResponse,
        }));
        break;

      case 'checkbox':
        this.setState(prevState => ({
          formValues: {
            text: prevState.formValues.text,
            checkbox: {
              checked: !prevState.formValues.checkbox.checked,
              value: prevState.formValues.checkbox.value,
            },
            selectedOption: prevState.formValues.selectedOption,
          },
          fetchResponse: prevState.fetchResponse,
        }));
        break;

      case 'radio':
        this.setState(prevState => ({
          formValues: {
            text: prevState.formValues.text,
            checkbox: {
              checked: prevState.formValues.checkbox.checked,
              value: prevState.formValues.checkbox.value,
            },
            selectedOption: event.target.value,
          },
          fetchResponse: prevState.fetchResponse,
        }));
        break;

      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(prevState => ({
      formValues: {
        text: prevState.formValues.text,
        checkbox: {
          checked: prevState.formValues.checkbox.checked,
          value: prevState.formValues.checkbox.value,
        },
        selectedOption: prevState.formValues.selectedOption,
      },
      fetchResponse: prevState.fetchResponse,
    }));
    console.log('Submitted', this.state);
    // fetch('/', { method: 'POST', body: this.state.formValues })
    //   .then(response => response.json())
    //   .then((json) => {
    //     this.setState(prevState => ({
    //       formValues: {
    //         text: prevState.formValues.text,
    //         checkbox: {
    //           checked: prevState.formValues.checkbox.checked,
    //           value: prevState.formValues.checkbox.value,
    //         },
    //         selectedOption: prevState.formValues.selectedOption,
    //       },
    //       fetchResponse: json,
    //     }));
    //     console.log('Form Submitted!');
    //   });
  }

  render() {
    return (
      <form id="site-form" className="site-form">
        <TextBox
          formAttributes={{
            id: 'input-1',
            name: 'textbox',
            label: 'Text Label',
            placeholder: true,
          }}
          value={this.state.formValues.text}
          handleChange={this.handleChange}
        />
        <CheckBox
          formAttributes={{
            id: 'input-2',
            name: 'checkbox',
            label: 'Checkbox Label',
          }}
          checkbox={this.state.formValues.checkbox}
          handleChange={this.handleChange}
        />
        <RadioButton
          formAttributes={{
            id: 'input-3',
            name: 'radio',
            label: 'Radio Label 1',
          }}
          selectedOption={this.state.formValues.selectedOption}
          handleChange={this.handleChange}
          value={'option1'}
        />
        <RadioButton
          formAttributes={{
            id: 'input-4',
            name: 'radio',
            label: 'Radio Label 2',
          }}
          selectedOption={this.state.formValues.selectedOption}
          handleChange={this.handleChange}
          value={'option2'}
        />
        <Button
          label={'Submit'}
          handleSubmit={this.handleSubmit}
        />
      </form>
    );
  }
}

export default SiteForm;
