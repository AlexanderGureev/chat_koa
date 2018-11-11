import React, { Component } from "react";
import { Icon, Input, AutoComplete } from "antd";
import { getRooms } from "../../../home/services/api";
import { uniqueId } from "lodash";
import { debounce } from "lodash/fp";

// const Search = props => (
//   <div className="search">
//     <input type="text" name="search" id="searchInput" placeholder="Search" />
//     <span className="find">
//       <i className="fas fa-search" />
//     </span>
//   </div>
// );

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

class Search extends Component {
  constructor(props) {
    super(props);
    this.founds = {};
    this.handleSearchDebounced = debounce(500, this.handleSearch);
  }

  state = {
    inputText: "",
    dataSource: []
  };

  componentDidUpdate() {
    const { changeRoomListProcessed, roomListIsChange } = this.props;
    if (roomListIsChange) {
      this.founds = {};
      changeRoomListProcessed();
    }
  }

  onBlur = e => {
    this.setState({ inputText: "" });
  };
  onSelect = (...args) => {
    console.log("onSelect", args);
  };
  onChange = value => {
    this.setState({ inputText: value });
  };
  renderStatus = isPublic =>
    !isPublic && (
      <span className="protected-room">
        <Icon type="lock" theme="outlined" />
      </span>
    );

  renderOption = room => (
    <Option key={room._id} text={room.name} className="li-search">
      {room.name}
      {this.renderStatus(room.public)}
    </Option>
  );

  handleSearch = async value => {
    if (!value) {
      return;
    }
    if (!this.founds[value]) {
      this.founds[value] = await getRooms(value);
    }
    console.log(this.founds[value])
    this.setState({
      dataSource: [...this.founds[value]]
    });
  };

  render() {
    const { dataSource, inputText } = this.state;
    return (
      <div className="search">
        <AutoComplete
          dataSource={dataSource.map(this.renderOption)}
          style={{ width: 200 }}
          onSelect={this.onSelect}
          onSearch={this.handleSearchDebounced}
          onChange={this.onChange}
          placeholder="Поиск каналов"
          optionLabelProp="text"
          onBlur={this.onBlur}
          value={inputText}
        >
          <Input
            className="find-input"
            suffix={<Icon type="search" className="certain-category-icon" />}
          />
        </AutoComplete>
      </div>
    );
  }
}

export default Search;
