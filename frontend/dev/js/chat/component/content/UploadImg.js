import {
  Upload,
  message,
  Button,
  Icon,
  Modal,
  Form,
  Input,
  Row,
  Col
} from "antd";
import React, { Component } from "react";
import getToken from "../../../home/services/csrfToken";
import EmojiBox from "./EmojiBox";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const FormItem = Form.Item;

class UploadImg extends Component {
  state = {
    token: "",
    visible: false,
    filePath: "",
    fileName: "",
    emojiIsOpen: false
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
    const { filePath } = this.state;
    const form = this.props.form;
    form.validateFields((err, { messageText }) => {
      if (err) {
        return;
      }

      this.props.sendMessage(`${location.origin}/${filePath} ${messageText}`);
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  selectEmoji = ({ colons }) => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const messageText = `${getFieldValue("messageText")}${colons}`;
    setFieldsValue({ messageText });
  };
  openEmojiBox = e => {
    e.preventDefault();
    this.setState({
      emojiIsOpen: !this.state.emojiIsOpen
    });
  };
  setRef = el => (this.emojiBoxRef = el);
  onCloseEmojiBox = ({ target }) => {
    if (!this.emojiBoxRef.contains(target)) {
      this.setState({
        emojiIsOpen: false
      });
    }
  };
  getForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { emojiIsOpen } = this.state;

    return (
      <Form layout="vertical" className="upload-form-message">
        <FormItem label="Добавить комментарий (необязательно)">
          {getFieldDecorator("messageText")(
            <Input
              type="text"
              suffix={
                <ClickAwayListener
                  touchEvent="onTouchStart"
                  onClickAway={this.onCloseEmojiBox}
                >
                  <EmojiBox
                    setRef={this.setRef}
                    isOpen={emojiIsOpen}
                    onSelect={this.selectEmoji}
                    openEmojiBox={this.openEmojiBox}
                  />
                </ClickAwayListener>
              }
            />
          )}
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
