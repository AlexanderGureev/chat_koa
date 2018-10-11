import React, { Component } from "react";
import { Tooltip, Badge } from "antd";
import ModalWithForm from "./ModalWithForm";
import DeleteRoom from "./DeleteRoom";
import { message } from "antd";
import RoomSettings from "./RoomSettings";
import InvitingModal from "./InvitingModal";
import { getInviteLink } from "../../../home/services/api";

const DEFAULT_LINK = `${location.origin}/chat`;

class Rooms extends Component {
  state = {
    visibleModalForm: false,
    visibleInvitingModal: false,
    inviteLink: "",
    confirmLoading: false,
    invitations: {}
  };

  showInvitingModal = (name, id) => async () => {
    try {
      const { invitations } = this.state;
      this.currentRoomName = name;
      this.currentRoomId = id;

      if (invitations[id]) {
        const { invitationExpires } = invitations[id];
        const time = new Date(invitationExpires).getTime();

        if (time > Date.now()) {
          this.setState({
            visibleInvitingModal: true
          });
          return;
        }
      }

      const {
        invitation_id,
        room_name,
        invitationExpires
      } = await getInviteLink(id, name);

      this.setState({
        visibleInvitingModal: true,
        invitations: {
          ...invitations,
          [id]: {
            invitation_id,
            room_name,
            invitationExpires,
            inviteLink: `${DEFAULT_LINK}/${invitation_id}`
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleOkInvitingModal = e => {
    this.setState({
      visibleInvitingModal: false
    });
  };
  handleCancelInvitingModal = e => {
    this.setState({
      visibleInvitingModal: false
    });
  };
  showModalWithForm = () => {
    this.setState({
      visibleModalForm: true
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
        this.setState({ visibleModalForm: false, confirmLoading: false });
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
      visibleModalForm: false
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
  };
  renderListRooms = () => {
    const { rooms } = this.props;

    return (
      <ul className="list-rooms">
        {rooms.map(({ _id, name, unread_messages }) => (
          <li key={_id}>
            <div className="not-read">
              <Badge
                count={unread_messages}
                overflowCount={9}
                className="message-counter"
              />
            </div>
            <Tooltip placement="top" title={"Перейти в комнату?"}>
              <a
                href="#"
                onClick={this.changeRoom(_id)}
                onTouchStart={this.changeRoom(_id)}
              >
                {name}
              </a>
            </Tooltip>
            <RoomSettings
              _id={_id}
              name={name}
              deleteRoom={this.deleteRoom(_id, name)}
              showInvitingModal={this.showInvitingModal(name, _id)}
            />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const {
      visibleModalForm,
      confirmLoading,
      visibleInvitingModal,
      invitations
    } = this.state;

    return (
      <div className="rooms">
        <ModalWithForm
          visible={visibleModalForm}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          wrappedComponentRef={this.saveFormRef}
        />
        <h3>
          Rooms
          <Tooltip placement="top" title={"Создать новую комнату?"}>
            <span
              className="rooms-add"
              onClick={this.showModalWithForm}
              onTouchStart={this.showModalWithForm}
            >
              <i className="fas fa-plus" />
            </span>
          </Tooltip>
        </h3>
        {invitations[this.currentRoomId] && (
          <InvitingModal
            invitation={invitations[this.currentRoomId]}
            showInvitingModal={this.showInvitingModal}
            handleOkInvitingModal={this.handleOkInvitingModal}
            handleCancelInvitingModal={this.handleCancelInvitingModal}
            visible={visibleInvitingModal}
          />
        )}
        {this.renderListRooms()}
      </div>
    );
  }
}

export default Rooms;
