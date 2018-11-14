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
const MenuList = props => {
  const { value, notFound } = props.selectProps;
  const headerText = getHeaderText(value);

  const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => (
    <div key={key} style={style} className="search-list-li">
      {props.children[index]}
    </div>
  );

  return (
    <Fragment>
      <div className="search-params">{headerText}</div>
      {notFound && <div className="search-result">Нет результатов</div>}
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            width={width}
            height={props.options.length * 50}
            rowHeight={50}
            rowCount={props.options.length}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </Fragment>
  );
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.foundsUsers = {};
    this.foundsRooms = {};
    this.handleSearchDebounced = debounce(this.handleInputChange, 500);
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
        value: [{...isFilterOption}],
        filter: item.value,
        options: []
      });
    }
  };

  getUsers = async value => {
    if (!this.foundsUsers[value]) {
      this.setState({ isLoading: true });
      this.foundsUsers[value] = await getUsers(value);
      this.setState({ isLoading: false });
    }

    this.setState({
      options: this.foundsUsers[value].map(({ _id, username }) => ({
        value: _id,
        label: username
      })),
      notFound: !Boolean(this.foundsUsers[value].length || 0)
    });
  };

  getRooms = async value => {
    if (!this.foundsRooms[value]) {
      this.setState({ isLoading: true });
      this.foundsRooms[value] = await getRooms(value);
      this.setState({ isLoading: false });
    }

    this.setState({
      options: this.foundsRooms[value].map(({ _id, name }) => ({
        value: _id,
        label: name
      })),
      notFound: !Boolean(this.foundsRooms[value].length || 0)
    });
  };

  handleInputChange = value => {
    const { filter } = this.state;
    if (!filter || !value) {
      return;
    }

    if (filter === "Users") {
      this.getUsers(value);
    } else {
      this.getRooms(value);
    }
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
    const { isLoading, value, options, isFocus, notFound } = this.state;
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
          notFound={notFound}
          components={{ MenuList, DropdownIndicator, LoadingIndicator }}
          onInputChange={this.handleSearchDebounced}
          placeholder="Поиск"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          filterOption={(options, str) => true}
          onMenuClose={this.onMenuClose}
        />
      </div>
    );
  }
}

export default Search;
