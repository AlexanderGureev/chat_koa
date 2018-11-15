import React, { Component, Fragment } from "react";
import Select, { components } from "react-select";
import { AutoSizer, List } from "react-virtualized";
import { Icon } from "antd";
import debounce from "lodash/debounce";
import { getRooms, getUsers } from "../../../home/services/api";
import cn from "classnames";

const filterOptions = [
  { value: "Users", label: "Users" },
  { value: "Rooms", label: "Rooms" }
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
const getUserTemplate = ({ value, label, data }, innerProps) => {
  return (
    <div {...innerProps}>
      <div className="search-user-li">
        <span>{label}</span>
        <img src={data.avatarPath} alt="img-ava" />
      </div>
    </div>
  );
};
const getRoomTemplate = ({ value, label, data }, innerProps) => {
  const isPublic = data ? data.public : null;

  return (
    <div {...innerProps}>
      <div className="search-room-li">
        <span>{label}</span>
        {isPublic === false ? (
          <span className="protected-room">
            <Icon type="lock" theme="outlined" />
          </span>
        ) : null}
      </div>
    </div>
  );
};
const getFilterTemplate = ({ value, label }, innerProps) => {
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
  const { innerProps, data } = props;
  const { searchFilter } = props.selectProps;

  return searchFilter === "Users"
    ? getUserTemplate(data, innerProps)
    : searchFilter === "Rooms"
    ? getRoomTemplate(data, innerProps)
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
  const { cache, api, requiredFields } = instance.cacheAndMethods[filter];
  if (!cache[value]) {
    instance.setState({ isLoading: true });
    cache[value] = await api(value);
    instance.setState({ isLoading: false });
  }

  const options = cache[value].map(result => ({
    value: result[requiredFields[0]],
    label: result[requiredFields[1]],
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
        api: getUsers,
        requiredFields: ["_id", "username"]
      },
      Rooms: {
        cache: {},
        searchMethod: searchMethod(this),
        api: getRooms,
        requiredFields: ["_id", "name"]
      }
    };
    this.handleInputChangeDebounced = debounce(this.handleInputChange, 500);
  }

  state = {
    filter: "",
    value: null,
    options: [...filterOptions],
    isLoading: false,
    notFound: false
  };

  onChange = value => {
    if (!value.length) {
      this.setState({
        value: null,
        filter: "",
        options: [...filterOptions],
        notFound: false
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
        options: []
      });
    }
  };

  handleInputChange = value => {
    const { filter } = this.state;
    if (!filter || !value) {
      return;
    }
    const { searchMethod } = this.cacheAndMethods[filter];
    searchMethod(value, filter);
  };

  onFocus = () => {
    this.setState({ isFocus: true });
  };
  onBlur = () => {
    this.setState({ isFocus: false });
  };
  onMenuClose = () => {
    this.setState({ notFound: false });
  };

  render() {
    const { isLoading, value, options, isFocus, notFound, filter } = this.state;
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
          menuIsOpen={true}
        />
      </div>
    );
  }
}

export default Search;
