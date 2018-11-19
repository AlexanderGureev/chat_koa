import React, { Component, Fragment } from "react";
import Select, { components } from "react-select";
import { AutoSizer, List } from "react-virtualized";
import { Icon } from "antd";
import debounce from "lodash/debounce";
import { getRooms, getUsers } from "../../../home/services/api";
import { Badge } from 'antd';
import cn from "classnames";

const filterOptions = [
  { value: "Users", label: "Пользователи" },
  { value: "Rooms", label: "Комнаты" }
];
const getHeaderText = filter => {
  const filterOptionsText = {
    Users: "Пользователи",
    Rooms: "Комнаты",
    default: "Параметры поиска"
  };

  if (!filter) {
    return filterOptionsText.default;
  }
  const { value } = filter[0];
  return filterOptionsText[value];
};
const LoadingIndicator = props => <Icon type="loading" />;
const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Icon type="search" className="certain-category-icon" />
      </components.DropdownIndicator>
    )
  );
};
const onMouseEnter = event => {
  console.log("onMouseEnter")
};
const handlerClickOption = (event, callback) => callback();

const getUserTemplate = ({ data }, innerProps) => {
  const { username, avatarPath } = data;

  return (
    <div {...innerProps} onMouseEnter={onMouseEnter}>
      <div className="search-user-li">
        <span>{username}</span>
        <div className="search-wrap-img">
          <img src={avatarPath} alt="img-ava" />
        </div>
      </div>
    </div>
  );
};
const getRoomTemplate = ({ data }, innerProps, { onClickRoom }) => {
  const isPublic = data ? data.public : null;
  const callback = () => { 
    onClickRoom(data._id, data.name, data.public);
    innerProps.onClick();
  }

  return (
    <div {...innerProps} onMouseEnter={onMouseEnter} onClick={e => handlerClickOption(e, callback)}>
      <div className="search-room-li">
        <span>{data.name}</span>
        {isPublic === false ? (
          <span className="protected-room">
            <Icon type="lock" theme="outlined" />
          </span>
        ) : null}
      </div>
    </div>
  );
};
const getFilterTemplate = ({ label }, innerProps) => {
  return (
    <div {...innerProps}>
      <div className="search-filter-li">
        <span>{label}</span>
        <Icon type="filter" />
      </div>
    </div>
  );
};

const CustomOption = props => {
  const { innerProps, data, selectProps } = props;

  return selectProps.searchFilter === "Users"
    ? getUserTemplate(data, innerProps)
    : selectProps.searchFilter === "Rooms"
    ? getRoomTemplate(data, innerProps, selectProps)
    : getFilterTemplate(data, innerProps);
};

const MenuList = props => {
  const { value, notFound } = props.selectProps;
  const headerText = getHeaderText(value);

  const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => (
    <div key={key} style={style} className="search-list-li">
      {props.children[index]}
    </div>
  );

  const defaultRowHeight = 50;
  const height = props.options.length > 2 ? 300 : props.options.length * defaultRowHeight;

  return (
    <Fragment>
      <div className="search-params">{headerText}</div>
      {notFound && <div className="search-not-found">Нет результатов</div>}
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            width={width}
            height={height}
            rowHeight={defaultRowHeight}
            rowCount={props.options.length}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </Fragment>
  );
};
const searchMethod = instance => async (value, filter) => {
  const { cache, api } = instance.cacheAndMethods[filter];
  if (!cache[value]) {
    instance.setState({ isLoading: true });
    cache[value] = await api(value);
    instance.setState({ isLoading: false });
  }

  const options = cache[value].map(result => ({
    data: { ...result }
  }));
  const notFound = !Boolean(cache[value].length || 0);
  instance.setState({ options, notFound });
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.cacheAndMethods = {
      Users: {
        cache: {},
        searchMethod: searchMethod(this),
        api: getUsers
      },
      Rooms: {
        cache: {},
        searchMethod: searchMethod(this),
        api: getRooms
      }
    };
    this.handleInputChangeDebounced = debounce(this.handleInputChange, 500);
  }

  state = {
    filter: "",
    value: null,
    options: [...filterOptions],
    isLoading: false,
    notFound: false,
    isSelect: false
  };

  componentDidUpdate() {
    const { cacheUpdateProcessed, cache: { needsUpdating } } = this.props;
    if (needsUpdating) {
      this.clearCache("Rooms")
      cacheUpdateProcessed();
    }
  }

  clearCache = filter => {
    this.cacheAndMethods[filter].cache = {};
  };

  onChange = value => {
    if (!value.length) {
      this.setState({
        value: null,
        filter: "",
        options: [...filterOptions],
        notFound: false,
        isSelect: false
      });
      return;
    }

    const [item] = value;
    const isFilterOption = filterOptions.find(
      ({ value }) => item.value === value
    );
    if (isFilterOption) {
      this.setState({
        value: [{ ...isFilterOption }],
        filter: item.value,
        options: [],
        isSelect: true
      });
    }
  };

  handleInputChange = value => {
    const { filter } = this.state;
    if (!filter || !value) {
      return;
    }
    const { searchMethod } = this.cacheAndMethods[filter];
    console.log(this.cacheAndMethods[filter].cache)
    searchMethod(value, filter);
  };

  onFocus = () => this.setState({ isFocus: true });
  onBlur = () => this.setState({ isFocus: false });
  onMenuClose = () => this.setState({ notFound: false });


  render() {
    const { isLoading, value, options, isFocus, notFound, filter, isSelect } = this.state;
    const classes = cn({
      search: true,
      "search-focused": isFocus
    });

    return (
      <div className={classes} ref={el => (this.searchContainer = el)}>
        <Select
          className="chat-search-container"
          classNamePrefix="chat-search"
          isMulti
          isLoading={isLoading}
          onChange={this.onChange}
          onSearch={this.onSearch}
          value={value}
          options={options}
          searchFilter={filter}
          notFound={notFound}
          components={{
            MenuList,
            DropdownIndicator,
            LoadingIndicator,
            Option: CustomOption
          }}
          onInputChange={this.handleInputChangeDebounced}
          placeholder="Поиск"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          filterOption={(options, str) => true}
          onMenuClose={this.onMenuClose}
          onClickRoom={this.props.changeRoom}
          blurInputOnSelect={isSelect}
        />
      </div>
    );
  }
}

export default Search;
