import React, { Component } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Container,
    Row,
    Col,
    Toast,
    ToastContainer
} from "react-bootstrap";

export default class  ShortUrlForm extends Component {
  handleChange = e => {
    const { onChange } = this.props
    onChange(e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSave()
  }

  render() {
    const { onSave, toastShow, toggleToast } = this.props;
    return (
      <div class="container position-relative">
        <h1 className="text-center my-4">Paste the URL to be shortened</h1>
        <Row className="justify-content-md-center">
          <Col md={9}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="original_url"
                  value={this.props.originalUrl}
                  onChange={this.handleChange}
                  placeholder="Enter the URL"
                  required
                />
              </Form.Group>

              <Button variant="primary" color="success" type="submit">
                Convert
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer position="top-end">
          <Toast bg='danger' show={toastShow} onClose={toggleToast} delay={1000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Oops</strong>
            </Toast.Header>
            <Toast.Body>Please enter the valid URL</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
  }
}
