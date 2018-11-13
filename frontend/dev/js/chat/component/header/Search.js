// import React, { Component } from "react";
// import { Icon, Input, AutoComplete } from "antd";
// import { getRooms } from "../../../home/services/api";
// import { uniqueId } from "lodash";
// import { debounce } from "lodash/fp";

// const Search = props => (
//   <div className="search">
//     <input type="text" name="search" id="searchInput" placeholder="Search" />
//     <span className="find">
//       <i className="fas fa-search" />
//     </span>
//   </div>
// );

// const Option = AutoComplete.Option;
// const OptGroup = AutoComplete.OptGroup;

// class Search extends Component {
//   constructor(props) {
//     super(props);
//     this.founds = {};
//     this.handleSearchDebounced = debounce(500, this.handleSearch);
//   }

//   state = {
//     inputText: "",
//     dataSource: []
//   };

//   componentDidUpdate() {
//     const { changeRoomListProcessed, roomListIsChange } = this.props;
//     if (roomListIsChange) {
//       this.founds = {};
//       changeRoomListProcessed();
//     }
//   }

//   onBlur = e => {
//     this.setState({ inputText: "" });
//   };
//   onSelect = (...args) => {
//     console.log("onSelect", args);
//   };
//   onChange = value => {
//     this.setState({ inputText: value });
//   };
//   renderStatus = isPublic =>
//     !isPublic && (
//       <span className="protected-room">
//         <Icon type="lock" theme="outlined" />
//       </span>
//     );

//   renderOption = room => (
//     <Option key={room._id} text={room.name} className="li-search">
//       {room.name}
//       {this.renderStatus(room.public)}
//     </Option>
//   );

//   handleSearch = async value => {
//     if (!value) {
//       return;
//     }
//     if (!this.founds[value]) {
//       this.founds[value] = await getRooms(value);
//     }
//     console.log(this.founds[value])
//     this.setState({
//       dataSource: [...this.founds[value]]
//     });
//   };

//   render() {
//     const { dataSource, inputText } = this.state;
//     return (
//       <div className="search">
//         <AutoComplete
//           dataSource={dataSource.map(this.renderOption)}
//           style={{ width: 200 }}
//           onSelect={this.onSelect}
//           onSearch={this.handleSearchDebounced}
//           onChange={this.onChange}
//           placeholder="Поиск каналов"
//           optionLabelProp="text"
//           onBlur={this.onBlur}
//           value={inputText}
//         >
//           <Input
//             className="find-input"
//             suffix={<Icon type="search" className="certain-category-icon" />}
//           />
//         </AutoComplete>
//       </div>
//     );
//   }
// }
import React, { Component } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { getRooms, getUsers } from "../../../home/services/api";
import { uniqueId } from "lodash";

const Option = Select.Option;

class UserRemoteSelect extends Component {
  constructor(props) {
    super(props);
    this.defaultValue = ["Users", "Rooms"];
    this.foundsUsers = {};
    this.foundsRooms = {};
    this.handleSearchDebounced = debounce(this.handleSearch, 500);
  }

  state = {
    data: [],
    filter: [],
    defaultValue: ["Users", "Rooms"],
    fetching: false
  };

  componentDidUpdate() {
    const { changeRoomListProcessed, roomListIsChange } = this.props;
    if (roomListIsChange) {
      this.foundsRooms = {};
      changeRoomListProcessed();
    }
  }

  getUsers = async value => {
    if (!this.foundsUsers[value]) {
      this.setState({ fetching: true });
      this.foundsUsers[value] = await getUsers(value);
      this.setState({ fetching: false });
    }

    this.setState({
      data: [...this.foundsUsers[value]]
    });
  };
  getRooms = async value => {
    if (!this.foundsRooms[value]) {
      this.setState({ fetching: true });
      this.foundsRooms[value] = await getRooms(value);
      this.setState({ fetching: false });
    }

    this.setState({
      data: [...this.foundsRooms[value]]
    });
  };

  handleSearch = async value => {
    const [ filter ] = this.state.filter;
    if (!filter.length || !value) {
      return;
    }

    if (filter === "Users") {
      this.getUsers(value);
    } else {
      this.getRooms(value);
    }
  };

  handleChange = value => {

    if (!value.length) {
      this.setState({
        filter: [],
        defaultValue: [...this.defaultValue]
      });
      return;
    }

    const [val] = value;
    const isFilterOption = this.defaultValue.includes(val);
    if (isFilterOption) {
      this.setState({
        filter: [val],
        data: [],
        defaultValue: [],
        fetching: false
      });
    }
  };

  render() {
    const { fetching, data, filter, defaultValue } = this.state;
    return (
      <div className="search">
        <Select
          mode="multiple"
          value={filter}
          placeholder="Select users"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.handleSearchDebounced}
          onChange={this.handleChange}
          style={{ width: "300px" }}
        >
          {defaultValue
            .map(value => <Option key={value}>{value}</Option>)
            .concat(data.map(d => <Option key={d._id}>{d.name || d.username}</Option>))}
        </Select>
      </div>
    );
  }
}

export default UserRemoteSelect;
