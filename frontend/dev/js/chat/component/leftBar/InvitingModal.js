import { Modal } from "antd";
import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import withClipboard from "./withClipboard";
import { Input, Button } from "antd";

const InvitingModal = props => {
  const {
    name,
    visible,
    handleOkInvitingModal,
    handleCancelInvitingModal,
    inputValue,
    isCopied,
    onCopy
  } = props;

  const styles = {
    backgroundColor: isCopied ? "#43a731" : "#5478cb",
    transition: ".5s ease",
    width: "160px",
    fontSize: "14px"
  };
  const stylesInput = {
    borderColor: isCopied ? "#43a731" : "#d9d9d9"
  };
  
  return (
    <div>
      <Modal
        title={`Пригласить друзей в канал: ${name}`}
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
              value={inputValue}
            />

            <CopyToClipboard text={inputValue} onCopy={onCopy}>
              <Button type="primary" size="large" style={styles}>
                {isCopied ? "Скопировано" : "Копировать"}
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
};
export default withClipboard(InvitingModal);
