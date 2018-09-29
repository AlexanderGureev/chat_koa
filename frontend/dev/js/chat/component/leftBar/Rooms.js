import React, { Component } from "react";
import { Icon } from "antd";
import ModalWithForm from "./ModalWithForm";
import DeleteRoom from "./DeleteRoom";
import { message } from "antd";

class Rooms extends Component {
  state = {
    visible: false,
    confirmLoading: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      this.setState({ confirmLoading: true });

      try {
        await this.props.createRoom(values);
        form.resetFields();
        this.setState({ visible: false, confirmLoading: false });
        message.success(`Комната ${values.roomName} успешно создана.`);
      } catch (err) {
        message.error(err.message);
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  deleteRoom = (id, name) => async e => {
    try {
      await this.props.deleteRoom(id);
      message.success(`Комната ${name} успешно удалена.`);
    } catch (err) {
      message.error(err.message);
    }
  };
  changeRoom = id => e => {
    e.preventDefault();
    this.props.changeRoom(id);
    //вывести уведомление о смене комнаты
  }

  render() {
    const { visible, confirmLoading } = this.state;
    const { rooms } = this.props;

    return (
      <div className="rooms">
        <ModalWithForm
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          wrappedComponentRef={this.saveFormRef}
        />
        <h3>
          Rooms
          <span className="rooms-add" onClick={this.showModal}>
            <i className="fas fa-plus" />
          </span>
        </h3>
        <ul>
          {rooms.map(({ _id, name }) => (
            <li key={_id}>
              <DeleteRoom name={name} deleteRoom={this.deleteRoom(_id, name)} />
              <a href="#" onClick={this.changeRoom(_id)}>
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Rooms;
