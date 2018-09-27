import { Button, Modal, Form, Input, Radio, Row, Col, Icon } from "antd";
import React, { Component } from "react";
import Fade from "@material-ui/core/Fade";

const FormItem = Form.Item;

const ModalWithForm = Form.create()(
  class extends React.Component {
    state = {
      privateRoom: false
    };

    onChangeRadio = ({ target: { value } }) => {
      if (value === "public") {
        this.setState({
          privateRoom: false
        });
      } else {
        this.setState({
          privateRoom: true
        });
      }
    };

    render() {
      const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
      const { getFieldDecorator } = form;
      const { privateRoom } = this.state;

      const stylesRow = {
        display: "flex",
        alignItems: "center",
        height: "40px",
      };

      return (
        <Modal
          visible={visible}
          title="Создать новую комнату"
          okText="Создать"
          cancelText="Отмена"
          confirmLoading={confirmLoading}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Название">
              {getFieldDecorator("roomName", {
                rules: [
                  { required: true, message: "Введите название комнаты." }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem className="collection-create-form_last-form-item">
              <Row gutter={8} style={stylesRow}>
                <Col span={12}>
                  {getFieldDecorator("modifier", {
                    initialValue: "public"
                  })(
                    <Radio.Group onChange={this.onChangeRadio}>
                      <Radio value="public">Окрытая</Radio>
                      <Radio value="private">Приватная</Radio>
                    </Radio.Group>
                  )}
                </Col>
                <Fade in={privateRoom}>
                  <Col span={12}>
                    {privateRoom &&
                      getFieldDecorator("passwordRoom", {
                        rules: [
                          {
                            required: true,
                            message: "Введите пароль для комнаты."
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="password"
                          placeholder="Пароль для комнаты"
                        />
                      )}
                  </Col>
                </Fade>
              </Row>
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default ModalWithForm;
