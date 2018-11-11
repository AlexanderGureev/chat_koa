import React, { Component, Fragment, PureComponent } from "react";
import { emojify } from "react-emojione";
import Linkify from "react-linkify";
import { Link } from "react-router-dom";
import { Button, Icon, Badge } from "antd";
import InvitePreloader from "./InvitePreloader";
import { uniqueId } from "lodash";
import ReactPlayer from "react-player";
import Img from "react-image";
import Spinner from "react-spinkit";


const withFormatting = WrappedComponent =>
  class withFormattingPost extends PureComponent {
    
    componentDidMount() {
      if (this.invite) {
        setTimeout(() => {
          this.props.checkInvite(this.invite);
        }, 0);
        return;
      }
      return;
    }

    linkifyYouTubeUrl = url => {
      const regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
      return url.match(regExp);
    };
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
    templateImage = searchImg => {
      return searchImg.length
        ? searchImg.map(mass => (
            <div className="img-wrap" key={uniqueId()}>
              <img src={mass[0]} alt="img-message" />
            </div>
          ))
        : null;
    };
    templateVideoPlayer = searchVideo => {
      return (
        searchVideo && (
          <ReactPlayer
            url={searchVideo[0]}
            controls={true}
            className="video-wrap"
          />
        )
      );
    };
    renderInvite = () => {
      const { inviteNotValid = true } = this.props.invitations[this.invite];
      return inviteNotValid
        ? this.templateNotValidInvite()
        : this.templateValidInvite();
    };
    searchInvite = text => {
      const ORIGIN = `${location.origin}/chat/`;
      const templateInvite = ORIGIN + `[a-zA-Z0-9]{6}`;
      const regExp = new RegExp(templateInvite);
      const searchInvite = text.match(regExp);

      if (!searchInvite) {
        return;
      }

      const parsed = searchInvite[0].split("/");
      const invite = parsed[parsed.length - 1];

      const leftOfTheLink = text.substr(0, searchInvite.index);
      const rightOfTheLink = text.substr(
        searchInvite.index + searchInvite[0].length
      );

      return {
        invite,
        leftOfTheLink: emojify(leftOfTheLink),
        rightOfTheLink: emojify(rightOfTheLink)
      };
    };
    searchImg = text => {
      const regExpRelativeLink = /\/img\/upload\/[^<>\s]+\.(png|jpg|svg|gif)\b/gi;
      const regExpAbsoluteLink = /(https|http):\/\/[^<>\s]+\/[^<>\s]+\.(png|jpg|svg|gif)\b/gi;

      let i,
        searchImg = [];
      while ((i = regExpAbsoluteLink.exec(text))) {
        searchImg.push(i);
      }

      return searchImg;
    };

    parser = () => {
      const { text } = this.props.message;

      const searchInvite = this.searchInvite(text);
      const searchVideo = this.linkifyYouTubeUrl(text);
      const searchImg = this.searchImg(text);

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

      const { invite, leftOfTheLink, rightOfTheLink } = searchInvite;
      this.invite = invite;

      const { invitations } = this.props;
      return (
        <WrappedComponent {...this.props}>
          <Linkify>
            {leftOfTheLink}
            {invitations[this.invite] ? (
              this.renderInvite()
            ) : (
              <InvitePreloader />
            )}
            {rightOfTheLink}
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
