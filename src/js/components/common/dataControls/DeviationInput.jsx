import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

@autobind
export default class DeviationInput extends Component {
  static defaultProps = {
    data: null,
    value: '',
    onChange: () => {}
  };

  static propTypes = {
    data: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      left: '',
      middle: '',
      right: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.value) return;
    if (JSON.stringify(nextProps.value) !== JSON.stringify(this.state)) {
      this.setState({ ...nextProps.value });
    }
  }

  // todo: add validation
  onValueChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
    const event = {
      target: {
        value: { ...this.state, ...{ [name]: value } }
      }
    };
    const { left, middle, right } = event.target.value;
    if (left && middle && right) {
      this.props.onChange(event, this.props.data);
    }
  }

  render() {
    const { left, middle, right } = this.state;
    return (
      <div className="form-group deviation-value-form-group">
        <div className="col-xs-4">
          <input
            className="form-control"
            type="text"
            value={left}
            onChange={this.onValueChange}
            name="left"
            placeholder="-"
          />
        </div>
        <div className="col-xs-4">
          <input
            className="form-control"
            type="text"
            value={middle}
            onChange={this.onValueChange}
            name="middle"
            placeholder="value"
          />
        </div>
        <div className="col-xs-4">
          <input
            className="form-control"
            type="text"
            value={right}
            onChange={this.onValueChange}
            name="right"
            placeholder="+"
          />
        </div>
      </div>
    );
  }
}
