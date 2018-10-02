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

class Posts extends Component {
  constructor(props) {
    super(props);
    this.cache = new CellMeasurerCache({
      minHeight: 190,
      fixedWidth: true
    });
    this.maxAttempts = 2;
    this.checkScrollerOpeningDebounced = debounce(
      500,
      this.checkScrollerOpening
    );
    this.position = 3800;
  }

  state = {
    list: [],
    start: -40,
    end: -21,
    isEmpty: false,
    attempts: 0,
    isLockScroll: false,
    size: 0
  };

  componentWillMount() {
    const { messages } = this.props;
    !messages.length
      ? this.setState({
          isEmpty: true
        })
      : this.setState({
          list: [...messages],
          size: messages.length
        });
  }

  componentDidMount() {
    this.listRef.scrollToPosition(this.position);
  }

  loadMore = e => {
    const fn = () => {
      const { start, end } = this.state;
      this._loadMoreRows({ startIndex: start, stopIndex: end });
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

  componentWillReceiveProps(nextProps) {
    const { messages } = nextProps;
    const { size } = this.state;
    const updatePosition = () => {
      this.listRef.forceUpdateGrid();
      this.listRef.scrollToRow(this.state.list.length);
    };

    if (messages.length > size) {
      this.setState(
        {
          list: [...messages],
          isEmpty: false,
          size: size + 1
        },
        updatePosition
      );
    }
  }

  isRowLoaded = ({ index }) => !!this.state.list[index];

  getTemplateRow = item =>
    item.type ? (
      <LoadMoreBtn onClick={this.loadMore} />
    ) : (
      <Post id={this.props.user._id} message={item} />
    );

  rowRenderer = ({ key, index, style, isScrolling, isVisible, parent }) => {
    const { list } = this.state;
    const { user } = this.props;
    const isMyPost = list[index].user_id === user._id;

    const classes = cn({
      "w-post": !isMyPost,
      "w-post-my": isMyPost
    });

    const content = !isVisible ? (
      isMyPost ? (
        <MessageLoaderRight />
      ) : (
        <MessageLoaderLeft />
      )
    ) : (
      this.getTemplateRow(list[index])
    );

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
            {content}
          </div>
        )}
      </CellMeasurer>
    );
  };

  _loadMoreRows = ({ startIndex, stopIndex }) => {
    this._loadMoreRowsStartIndex = startIndex;
    this._loadMoreRowsStopIndex = stopIndex;

    const { user, getMessages } = this.props;
    const { list, attempts } = this.state;

    if (attempts === this.maxAttempts) {
      this.setState({
        list: [{ type: "system" }, ...list],
        isLockScroll: true
      });
      return;
    }

    return getMessages(user, startIndex, stopIndex).then(data => {
      const parsed = data.map(JSON.parse);

      if (!parsed.length) {
        this.setState({
          isEmpty: true
        });
      } else {
        this.setState({
          list: [...parsed, ...list],
          start: startIndex - 20,
          end: stopIndex - 20,
          attempts: attempts + 1
        });
        this.listRef.scrollToPosition(this.position);
      }
    });
  };

  checkScrollerOpening = (scrollTop, scrollHeight) => {
    const isActiveScroller = scrollTop < scrollHeight / 1.5 ? true : false;
    this.setState({ isActiveScroller });
  };

  _onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    this.checkScrollerOpeningDebounced(scrollTop, scrollHeight);

    const { start, end, isEmpty, isLockScroll } = this.state;
    if (clientHeight > 0 && !scrollTop && !isEmpty && !isLockScroll) {
      this._loadMoreRows({ startIndex: start, stopIndex: end });
    }
  };

  scrollToBottom = () => {
    this.listRef.scrollToRow(this.state.list.length);
  };

  _setRef = ref => {
    this.listRef = ref;
  };

  render() {
    const { list, isActiveScroller } = this.state;
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={() => {}}
        rowCount={Infinity}
      >
        {({ onRowsRendered, registerChild }) => (
          <div className="posts">
            <Scroller
              isActive={isActiveScroller}
              onClick={this.scrollToBottom}
            />
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className="grid"
                  onRowsRendered={onRowsRendered}
                  height={height - 53}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowCount={list.length}
                  ref={this._setRef}
                  rowRenderer={this.rowRenderer}
                  width={width}
                  onScroll={this._onScroll}
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
