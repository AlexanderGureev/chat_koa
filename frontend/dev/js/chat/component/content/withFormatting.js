import React, { Component, Fragment } from "react";
import { emojify } from "react-emojione";
import Linkify from "react-linkify";
import { Link } from "react-router-dom";
import { Button, Icon, Badge } from "antd";
import InvitePreloader from "./InvitePreloader";

const withFormatting = WrappedComponent =>
  class withFormattingPost extends Component {
    componentDidMount() {
      if (!this.invite) {
        return;
      }
      setTimeout(() => {
        this.props.checkInvite(this.invite);
      }, 0);
    }
    templateValidInvite = () => {
      const { room_name, room_online } = this.props.invitations[this.invite];
      return (
        <div className="invite-link">
          <span>Приглашение в комнату</span>
          <div className="room-info-wrap">
            <div className="room">
              <img src="/img/room-icon.svg" alt="room-icon" />
              <div className="room-info">
                <span>{room_name}</span>
                <span>
                  <Badge status="success" />
                  {room_online} online
                </span>
              </div>
            </div>
            {
              <Link to={"/chat/" + this.invite}>
                <Button className="btn-invite" icon="check">
                  OK
                </Button>
              </Link>
            }
          </div>
        </div>
      );
    };
    templateNotValidInvite = () => {
      return (
        <div className="invite-link">
          <span>Приглашение в комнату</span>
          <div className="room-info-wrap">
            <div className="room">
              <img src="/img/room-icon.svg" alt="room-icon" />
              <div className="room-info-error">
                <span className="error">Оно недействительно</span>
                <span>Попробуйте отправить новое приглашение</span>
              </div>
            </div>
          </div>
        </div>
      );
    };
    renderInvite = () => {
      const { inviteNotValid = true } = this.props.invitations[this.invite];
      return inviteNotValid
        ? this.templateNotValidInvite()
        : this.templateValidInvite();
    };
    parser = () => {
      const { text } = this.props.message;
      const origin = `${location.origin}/chat/`;
      const template = origin + `[a-zA-Z0-9]{6}`;

      const regExp = new RegExp(template);

      const searchResults = text.match(regExp);
      if (!searchResults) {
        return (
          <WrappedComponent {...this.props}>
            <Linkify>{emojify(text)}</Linkify>
          </WrappedComponent>
        );
      }

      const parsed = searchResults[0].split("/");
      this.invite = parsed[parsed.length - 1];

      const leftOfTheLink = text.substr(0, searchResults.index);
      const rightOfTheLink = text.substr(
        searchResults.index + searchResults[0].length
      );

      const { invitations } = this.props;
      return (
        <WrappedComponent {...this.props}>
          <Linkify>
            {emojify(leftOfTheLink)}
            {invitations[this.invite] ? (
              this.renderInvite()
            ) : (
              <InvitePreloader />
            )}
            {emojify(rightOfTheLink)}
          </Linkify>
        </WrappedComponent>
      );
    };

    render() {
      return this.parser();
    }
  };

export default withFormatting;
