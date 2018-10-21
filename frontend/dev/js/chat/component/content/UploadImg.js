import { Upload, message, Button, Icon, Modal, Form, Input } from "antd";
import React, { Component } from "react";
import getToken from "../../../home/services/csrfToken";

const FormItem = Form.Item;

class UploadImg extends Component {
  state = {
    token: "",
    visible: false,
    filePath: "",
    fileName: ""
  };
  async componentDidMount() {
    const token = await getToken("/api/token");
    this.setState({ token });
  }

  onChange = info => {
    if (info.file.status === "done") {
      const {
        info: { filePath }
      } = info.file.response;

      this.setState({
        fileName: info.file.name,
        filePath,
        visible: true
      });

      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  getForm = () => {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="vertical">
        <FormItem label="Добавить комментарий (необязательно)">
          {getFieldDecorator("message-text")(<Input type="text" />)}
        </FormItem>
      </Form>
    );
  };

  render() {
    const { token, filePath, fileName } = this.state;
    const headers = { "X-CSRF-Token": `${token}` };

    return (
      <div className="wrap-link">
        <Upload
          onChange={this.onChange}
          name="message_img"
          showUploadList={false}
          action="/api/upload/img"
          headers={headers}
        >
          <a href="#" className="link" />
        </Upload>
        <Modal
          title="Отправка сообщения"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Загрузить"
          cancelText="Отмена"
        >
          <div className="wrap-message-img">
            <img src={filePath} className="message-image" alt="message-image" />
            <span>{fileName}</span>
          </div>
          {this.getForm()}
        </Modal>
      </div>
    );
  }
}

export default Form.create()(UploadImg);
