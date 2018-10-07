import { Drawer, List, Avatar, Divider, Col, Row, Button } from "antd";
import React, { Component } from "react";

const pStyle = {
  fontSize: 16,
  color: "rgba(0,0,0,0.85)",
  lineHeight: "24px",
  display: "block",
  marginBottom: 16
};

const DescriptionItem = ({ title, content }) => (
  <div
    className="description-item"
    style={{
      fontSize: 14,
      lineHeight: "22px",
      marginBottom: 7,
      color: "rgba(0,0,0,0.65)"
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: "inline-block",
        color: "rgba(0,0,0,0.85)"
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

const UserProfile = ({ visible, onClose, changeAvatar, user }) => {
  const {
    username,
    email,
    profile: { avatarPath, status }
  } = user;

  return (
    <div>
      <Drawer
        width="100%"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
        <div className="profile-avatar-box">
          <Avatar
            shape="circle"
            size={86}
            icon="user"
            src={avatarPath}
            style={{
              backgroundColor: "#ffbf00",
              verticalAlign: "middle"
            }}
          >
            {username}
          </Avatar>
          <Button
            size="small"
            style={{ marginLeft: 16, verticalAlign: "middle" }}
            onClick={changeAvatar}
          >
            Change
          </Button>
        </div>
        <p style={pStyle}>Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content={username} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content={email} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="Москва" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="Россия" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Status" content={status} />
          </Col>
        </Row>
        <Divider />
        <p style={pStyle}>Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="AFX" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p style={pStyle}>Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content={email} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <a href="http://github.com/ant-design/ant-design/">
                  github.com/ant-design/ant-design/
                </a>
              }
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default UserProfile;
