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
import ReactResizeDetector from "react-resize-detector";

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
    this.batchSize = 20;
  }

  state = {
    list: [],
    start: -1,
    end: -1,
    isEmpty: false,
    attempts: 0,
    isLockScroll: false,
    initialSize: 0,
    room_id: ""
  };

  initialState = (messages, active_room, cb = () => {}) => {
    !messages.length
      ? this.setState({
          isEmpty: true,
          room_id: active_room
        })
      : this.setState(
          {
            list: [...messages],
            initialSize: messages.length,
            room_id: active_room,
            start: -this.batchSize - messages.length,
            end: -messages.length - 1
          },
          cb
        );
  };

  componentWillMount() {
    const {
      messages,
      user: { active_room }
    } = this.props;

    this.initialState(messages, active_room);
  }
  componentDidMount() {
    this.scrollToBottom(this.state.list.length);
  }

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

  componentWillReceiveProps({ messages, user }) {
    const { active_room } = user;
    const { initialSize, list, room_id, start, end } = this.state;

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
          if (offsetHeight + scrollTop === scrollHeight) {
            updatePosition();
          }
        }
      );
    }
  }

  isRowLoaded = ({ index }) => !!this.state.list[index];

  getTemplateRow = item => {
    if (!item.type) {
      return <Post id={this.props.user._id} message={item} />;
    }

    return item.type === "btn" ? (
      <LoadMoreBtn onClick={this.loadMore} />
    ) : (
      <LoadingBar />
    );
  };

  rowRenderer = ({ key, index, style, isScrolling, isVisible, parent }) => {
    const { list } = this.state;
    const { user } = this.props;
    const isMyPost = list[index].user_id === user._id;

    const classes = cn({
      "w-post": !isMyPost,
      "w-post-my": isMyPost
    });
    // const content = !isVisible ? (
    //   isMyPost ? (
    //     <MessageLoaderRight />
    //   ) : (
    //     <MessageLoaderLeft />
    //   )
    // ) : (
    //   this.getTemplateRow(list[index])
    // );
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
            {this.getTemplateRow(list[index])}
          </div>
        )}
      </CellMeasurer>
    );
  };

  loadingMessages = async (start, end) => {
    const { user, getMessages } = this.props;
    const { list, attempts } = this.state;

    const jsonData = await getMessages(user, start, end);
    const data = jsonData.map(JSON.parse);
    const [, ...messages] = list;

    if (!data.length) {
      this.setState({
        list: [...data, ...messages],
        isEmpty: true,
        isLockScroll: false
      });
    } else {
      this.setState(
        {
          list: [...data, ...messages],
          start: start - this.batchSize,
          end: end - this.batchSize,
          attempts: attempts + 1,
          isLockScroll: false
        },
        () => {
          this.scrollToBottom(data.length);
        }
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
        this.loadingMessages(start, end);
      }
    );
  };

  checkScrollerOpening = stopIndex => {
    const { list } = this.state;
    const isActiveScroller =
      stopIndex < list.length - this.batchSize / 2 ? true : false;
    this.setState({ isActiveScroller });
  };

  _onRowsRendered = fn => (...args) => {
    const [options] = args;
    this.checkScrollerOpeningDebounced(options.startIndex);
  };

  _onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    const { start, end, isEmpty, isLockScroll } = this.state;
    if (clientHeight > 0 && !scrollTop && !isEmpty && !isLockScroll) {
      this._loadMoreRows({ start, end });
    }
  };

  scrollToBottom = index => {
    setTimeout(() => {
      this.listRef.scrollToRow(index);
      this.listRef.scrollToRow(index);
    }, 0);
  };

  _setRef = ref => {
    this.listRef = ref;
  };

  onResize = width => {
    this.cache.clearAll();
  };

  render() {
    const { list, isActiveScroller } = this.state;
    return (
      <ReactResizeDetector
        handleWidth={true}
        refreshMode="debounce"
        refreshRate={500}
        onResize={this.onResize}
      >
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={() => {}}
          rowCount={Infinity}
        >
          {({ onRowsRendered, registerChild }) => (
            <div className="posts">
              <Scroller
                isActive={isActiveScroller}
                onClick={() => this.scrollToBottom(list.length)}
              />
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    className="grid"
                    onRowsRendered={this._onRowsRendered(onRowsRendered)}
                    height={height - 53}
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
      </ReactResizeDetector>
    );
  }
}

export default Posts;
