import React, { Component } from "react";
import { Modal, Button } from "antd";

const CreateRoomModal = props => {
  const { visible, confirmLoading, ModalText, handleOk, handleCancel } = props;

  return (
    <Modal
      title="Title"
      visible={visible}
      centered
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>{ModalText}</p>
    </Modal>
  );
};

export default CreateRoomModal;
