import { Modal, Form, Input, Icon } from "antd";
import React, { Component } from "react";

const FormItem = Form.Item;

const ModalInvitePassword = Form.create()(
  class extends React.Component {
    render() {
      const {
        invite,
        visible,
        handleCancel,
        onCreate,
        confirmLoading,
        form
      } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          title={`Комната: ${invite.room_name}`}
          visible={visible}
          onOk={onCreate}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          width={400}
        >
          <Form layout="vertical">
            <FormItem label="Пароль">
              {getFieldDecorator("passwordRoom", {
                rules: [
                  {
                    required: true,
                    message: "Введите пароль для комнаты."
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Пароль для комнаты"
                />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);
export default ModalInvitePassword;
