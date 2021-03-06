import React, { Component } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
  AutoSizer
} from "react-virtualized";
import Post from "./Post";
import cn from "classnames";
import LoadMoreBtn from "./LoadMoreBtn";
import { MessageLoaderRight, MessageLoaderLeft } from "./MessagePreloader";
import Scroller from "./Scroller";
import { debounce } from "lodash/fp";
import LoadingBar from "./LoadingBar";
import withFormatting from "./withFormatting";
import { checkInviteLink } from "../../../home/services/api";

const FormattedPost = withFormatting(Post);

class Posts extends Component {
  constructor(props) {
    super(props);
    this.cache = new CellMeasurerCache({
      defaultHeight: 90,
      fixedWidth: true
    });
    this.maxAttempts = 2;
    this.checkScrollerOpeningDebounced = debounce(
      500,
      this.checkScrollerOpening
    );
    this.onScrollDebounced = debounce(500, this._onScroll);
    this.onResizeDebounced = debounce(500, this.onResize);
    this.batchSize = 20;
    this.queueInvites = [];
  }

  state = {
    list: [],
    start: -1,
    end: -1,
    isEmpty: false,
    attempts: 0,
    isLockScroll: false,
    initialSize: 0,
    room_id: "",
    isLoading: false,
    unReadMessagesOnScroller: 0,
    unReadMessages: 0,
    isActiveScroller: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { initialSize, isActiveScroller, list, isLoading, unReadMessagesOnScroller, unReadMessages } = this.state;
    if (
      nextProps.messages.length > initialSize ||
      nextState.isActiveScroller !== isActiveScroller ||
      nextState.list.length !== list.length ||
      nextState.isLoading !== isLoading ||
      nextState.unReadMessagesOnScroller !== unReadMessagesOnScroller || 
      nextState.unReadMessages !== unReadMessages
    ) {
      return true;
    }
    return false;
  }
  initialState = (messages, active_room, unReadMessages, cb = () => {}) => {
    !messages.length
      ? this.setState({
          isEmpty: true,
          room_id: active_room
        })
      : this.setState(
          {
            list: [...messages],
            unReadMessages,
            unReadMessagesOnScroller: unReadMessages,
            initialSize: messages.length,
            room_id: active_room,
            start: -this.batchSize - messages.length,
            end: -messages.length - 1
          },
          cb
        );
  };
  componentDidMount() {
    const {
      messages,
      user: { active_room },
      unReadMessages
    } = this.props;

    this.initialState(messages, active_room, unReadMessages, () => {
      if(!unReadMessages) {
        this.scrollToBottom(this.state.list.length);
        return;
      }
      this.scrollToBottom(this.state.list.length - unReadMessages);
    });
  }

  componentWillReceiveProps({ messages, user, unReadMessages }) {
    const { active_room } = user;
    const { initialSize, list, room_id, start, end, unReadMessagesOnScroller } = this.state;

    if(unReadMessages !== this.state.unReadMessages) { //заглушка для непрочитанных сообщений
      this.setState({ unReadMessages })
    }

    const updatePosition = () => {
      this.listRef.forceUpdateGrid();
      this.scrollToBottom(list.length);
    };

    if (room_id !== active_room) {
      this.changeRoom(messages, active_room, updatePosition);
      return;
    }

    if (messages.length > initialSize) {
      const { scrollHeight, offsetHeight, scrollTop } = document.querySelector(
        "div.grid"
      );
      const newMessage = messages[messages.length - 1];
      this.setState(
        {
          list: [...list, newMessage],
          isEmpty: false,
          initialSize: initialSize + 1,
          start: start - 1,
          end: end - 1
        },
        () => {
          if (Math.round(offsetHeight + scrollTop) === scrollHeight) {
            updatePosition();
          } else {
            this.setState({ unReadMessagesOnScroller: unReadMessagesOnScroller + 1 });
          }
        }
      );
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  checkQueue = () => {
    if (this.queueInvites.length) {
      this.checkInvite(this.queueInvites.shift());
    }
  };
  uploadInvite = async id => {
    const { addInviteToChecked } = this.props;
    let invite;

    try {
      invite = await checkInviteLink(id);
      invite.inviteNotValid = false;

      addInviteToChecked(id, invite);
      this.setState(
        {
          isLoading: false
        },
        this.checkQueue
      );
    } catch (error) {
      invite = { inviteNotValid: true };
      addInviteToChecked(id, invite);
      this.setState(
        {
          isLoading: false
        },
        this.checkQueue
      );
    }
  };
  checkInvite = id => {
    const { isLoading } = this.state;
    const { checkedInvitentions } = this.props;

    if (checkedInvitentions[id]) {
      return this.checkQueue(); //не все элементы будут загружены с бд, нужна проверка на оставшиеся элементы в очереди
    }

    if (isLoading) {
      return this.queueInvites.push(id);
    }

    this.setState(
      {
        isLoading: true
      },
      () => this.uploadInvite(id)
    );
  };

  loadMore = e => {
    const fn = () => {
      const { start, end } = this.state;
      this._loadMoreRows({ start, end });
    };

    const [, ...newList] = this.state.list;
    this.setState(
      {
        list: newList,
        attempts: 0,
        isLockScroll: false
      },
      fn
    );
  };

  changeRoom = (messages, room_id, cb) => {
    this.initialState(messages, room_id, cb);
  };

  isRowLoaded = ({ index }) => !!this.state.list[index];

  getTemplateRow = (item, index) => {
    if (!item.type) {
      return (
        <FormattedPost
          id={this.props.user._id}
          message={item}
          invitations={this.props.checkedInvitentions}
          checkInvite={this.checkInvite}
        />
      );
    }

    return item.type === "btn" ? (
      <LoadMoreBtn onClick={this.loadMore} />
    ) : (
      <LoadingBar />
    );
  };

  rowRenderer = ({ key, index, style, isScrolling, isVisible, parent }) => {
    const { list, unReadMessages } = this.state;
    const { user } = this.props;
    const isMyPost = list[index].user_id === user._id;
    const isUnread = index > list.length - 1 - unReadMessages;

    const classes = cn({
      "w-post": !isMyPost,
      "w-post-my": isMyPost,
      "unread-message": isUnread
    });
   
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) => (
          <div className={classes} onLoad={measure} style={style}>
            {this.getTemplateRow(list[index], index)}
          </div>
        )}
      </CellMeasurer>
    );
  };

  recomputeRowHeights = (newSize = 0) => {
    this.cache.clearAll();
    this.listRef.recomputeRowHeights();
    this.scrollToBottom(newSize);
  };

  loadingMessages = async (start, end) => {
    const { user, getMessages } = this.props;
    const { list, attempts } = this.state;

    const jsonData = await getMessages(user, start, end);
    const data = jsonData.map(JSON.parse);
    const [, ...messages] = list;

    if (!data.length) {
      this.setState(
        {
          list: [...data, ...messages],
          isEmpty: true,
          isLockScroll: false
        }, () => this.recomputeRowHeights()
      );
    } else {
      this.setState(
        {
          list: [...data, ...messages],
          start: start - data.length,
          end: end - data.length,
          attempts: attempts + 1,
          isLockScroll: false
        },
        () => this.recomputeRowHeights(data.length - 1)
      );
    }
  };

  _loadMoreRows = ({ start, end }) => {
    const { list, attempts } = this.state;

    if (attempts === this.maxAttempts) {
      this.setState({
        list: [{ type: "btn" }, ...list],
        isLockScroll: true
      });
      return;
    }
    this.setState(
      {
        list: [{ type: "loader" }, ...list],
        isLockScroll: true
      },
      () => { 
        this.recomputeRowHeights();
        this.loadingMessages(start, end);
      }
    );
  };

  checkUnreadMessages = stopIndex => {
    const { list, unReadMessagesOnScroller } = this.state;
    if(unReadMessagesOnScroller > 0 && stopIndex > list.length - 1 - unReadMessagesOnScroller && stopIndex <= list.length - 1) {
      this.setState({ unReadMessagesOnScroller: unReadMessagesOnScroller - 1 });
    } 
  }
  checkScrollerOpening = stopIndex => {
    const { list } = this.state;
    if (stopIndex === 0) {
      return;
    }
    const isActiveScroller = stopIndex < list.length - 1 ? true : false;
    this.setState({ isActiveScroller });
  };
  _onRowsRendered = fn => (...args) => {
    const [options] = args;
    this.checkScrollerOpeningDebounced(options.stopIndex);
    this.checkUnreadMessages(options.stopIndex);
  };

  _onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    const { start, end, isEmpty, isLockScroll } = this.state;
    if (clientHeight > 0 && !scrollTop && !isEmpty && !isLockScroll) {
      this._loadMoreRows({ start, end });
    }
  };

  scrollToBottom = index => {
    this.timer = setTimeout(() => {
      this.listRef.scrollToRow(index);
      this.listRef.scrollToRow(index);
    }, 0);
  };

  _setRef = ref => {
    this.listRef = ref;
  };

  onResize = ({ height, width }) => {
    this.cache.clearAll();
  };

  onClickScroller = () => {
    const { unReadMessagesOnScroller, list } = this.state;
    if(unReadMessagesOnScroller) {
      this.setState({ unReadMessagesOnScroller: 0 });
    }
    this.scrollToBottom(list.length);
  };

  render() {
    const { list, isActiveScroller, unReadMessagesOnScroller } = this.state;
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={() => {}}
        rowCount={list.length}
      >
        {({ onRowsRendered, registerChild }) => (
          <div className="posts">
            <Scroller
              unreadMessages={unReadMessagesOnScroller}
              isActive={isActiveScroller}
              onClick={this.onClickScroller}
            />
            <AutoSizer onResize={this.onResizeDebounced}>
              {({ height, width }) => (
                <List
                  className="grid"
                  onRowsRendered={this._onRowsRendered(onRowsRendered)}
                  height={height - 50}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowCount={list.length}
                  ref={this._setRef}
                  rowRenderer={this.rowRenderer}
                  width={width}
                  onScroll={this.onScrollDebounced}
                  overscanRowCount={1}
                  scrollToAlignment="start"
                />
              )}
            </AutoSizer>
          </div>
        )}
      </InfiniteLoader>
    );
  }
}

export default Posts;
