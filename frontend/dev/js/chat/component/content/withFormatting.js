import React, { Component, Fragment } from "react";
import { emojify } from "react-emojione";
import Linkify from "react-linkify";
import { Link } from "react-router-dom";
import { Button, Icon, Badge } from "antd";
import InvitePreloader from "./InvitePreloader";
import { uniqueId } from "lodash";
import ReactPlayer from "react-player";
import Img from "react-image";
import Spinner from "react-spinkit";

const ORIGIN = `${location.origin}/chat/`;
const regExpRelativeLink = /\/img\/upload\/[^<>\s]+\.(png|jpg|svg|gif)\b/gi;
const regExpAbsoluteLink = /(https|http):\/\/[^<>\s]+\/[^<>\s]+\.(png|jpg|svg|gif)\b/gi;
const templateInvite = ORIGIN + `[a-zA-Z0-9]{6}`;

const linkifyYouTubeUrl = url => {
  const regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  return url.match(regExp);
};

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
    templateImage = searchImg =>
      searchImg.length
        ? searchImg.map(mass => (
            <div className="img-wrap" key={uniqueId()}>
              <Img
              className="img-message"
              src={mass[0]}
              loader={<Spinner name="ball-scale-multiple" />}
            />
            </div>
          ))
        : null;

    templateVideoPlayer = searchVideo => {
      return searchVideo && (
        <div className="video-wrap">
          <ReactPlayer url={searchVideo[0]} controls={true} />
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
      const regExp = new RegExp(templateInvite);

      const searchInvite = text.match(regExp);
      const searchVideo = linkifyYouTubeUrl(text);

      let i, searchImg = [];
      while (i = regExpAbsoluteLink.exec(text)) {
        searchImg.push(i);
      }

      if (!searchInvite) {
        return (
          <WrappedComponent {...this.props}>
            <Linkify>
              <div>
                {emojify(text)}
                {this.templateImage(searchImg)}
                {this.templateVideoPlayer(searchVideo)}
              </div>
            </Linkify>
          </WrappedComponent>
        );
      }

      const parsed = searchInvite[0].split("/");
      this.invite = parsed[parsed.length - 1];

      const leftOfTheLink = text.substr(0, searchInvite.index);
      const rightOfTheLink = text.substr(
        searchInvite.index + searchInvite[0].length
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
            {this.templateImage(searchImg)}
            {this.templateVideoPlayer(searchVideo)}
          </Linkify>
        </WrappedComponent>
      );
    };

    render() {
      return this.parser();
    }
  };

export default withFormatting;
