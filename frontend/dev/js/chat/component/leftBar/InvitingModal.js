import { Modal } from "antd";
import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Input, Button } from "antd";

class InvitingModal extends Component {
  state = {
    copied: false
  };

  onCopyTimeout = () => {
    setTimeout(() => {
      this.setState({
        copied: false
      });
    }, 2000);
  };

  onCopy = () => {
    this.setState({ copied: true }, this.onCopyTimeout);
  };

  render() {
    const {
      visible,
      handleOkInvitingModal,
      handleCancelInvitingModal,
      invitation: { room_name, inviteLink }
    } = this.props;

    const { copied } = this.state;

    const styles = {
      backgroundColor: copied ? "#43a731" : "#5478cb",
      transition: ".5s ease",
      width: "160px",
      fontSize: "14px"
    };
    const stylesInput = {
      borderColor: copied ? "#43a731" : "#d9d9d9"
    };

    return (
      <div>
        <Modal
          title={`Пригласить друзей в канал: ${room_name}`}
          visible={visible}
          cancelText="Отмена"
          onOk={handleOkInvitingModal}
          onCancel={handleCancelInvitingModal}
        >
          <div className="invitation-wrapper">
            <p>
              Поделитесь этой ссылкой с другими, чтобы предоставить им доступ к
              этой комнате.
            </p>
            <div className="input-group-copy">
              <Input
                size="large"
                onChange={() => {}}
                style={stylesInput}
                value={inviteLink}
              />

              <CopyToClipboard text={inviteLink} onCopy={this.onCopy}>
                <Button type="primary" size="large" style={styles}>
                  {copied ? "Скопировано" : "Копировать"}
                </Button>
              </CopyToClipboard>
            </div>
            <p className="info-invite">
              Данная ссылка-приглашение истечет через 1 день.
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default InvitingModal;
