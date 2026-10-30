/**
 * Extended ValidatorForm component with async submit lock and process state.
 * @param {object} props - The props for ValidatorForm.
 * @param {function} [props.onSubmit] - Submit handler.
 * @param {React.ReactNode} [props.children] - Form content.
 * @param {string} [props.className] - Optional className.
 * @param {object} [props.style] - Optional style overrides.
 * @param {boolean} [props.process] - If true, disables the form externally.
 */
import React, { Component } from "react";
import { ValidatorForm } from 'react-material-ui-form-validator';
import PropTypes from "prop-types";

class ValidatorFormExted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDisable: false
    };
  }

  static propTypes = {
    onSubmit: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.any,
    style: PropTypes.object,
    process: PropTypes.bool, // external control (optional)
    // ...other props
  };

  static defaultProps = {
    className: "",
    style: {},
    process: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { onSubmit, process } = this.props;
    if (this.state.formDisable || process) return;

    this.setState({ formDisable: true });

    try {
      const result = onSubmit && onSubmit(e);
      if (result && typeof result.then === "function") {
        await result;
        this.setState({ formDisable: false });
      } else {
        setTimeout(() => this.setState({ formDisable: false }), 1000);
      }
    } catch (err) {
      this.setState({ formDisable: false });
      throw err;
    }
  };

  render() {
    const {
      children,
      className,
      style,
      process,
      ...props
    } = this.props;

    return (
      <ValidatorForm
        autoComplete="off"
        className={className}
        style={style}
        {...props}
        onSubmit={this.handleSubmit}
        disabled={this.state.formDisable || process}
      >
        {children}
      </ValidatorForm>
    );
  }
}

export default ValidatorFormExted;
