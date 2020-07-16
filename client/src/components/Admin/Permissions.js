import React, { Component } from "react";
import axios from "axios";

class Permissions extends Component {
  state = { users: [], currentUser: "", permission: "" };
  async componentDidMount() {
    const { data: users } = await axios.get(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/admin/all/members`
    );
    console.log(users);
    this.setState({ users });
  }
  onSelect = (id, index) => {
    console.log(id);
    const currentUser = this.state.users[index];
    this.setState({ currentUser });
  };
  onChange = (e) => {
    this.setState({ permission: e.target.value.toUpperCase() });
  };
  save = async () => {
    const users = [...this.state.users];
    const index = users.findIndex((u) => u._id === this.state.currentUser._id);
    const {
      data,
    } = await axios.put(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/admin/permission/${this.state.currentUser._id}`,
      { permission: this.state.permission }
    );
    users[index] = data;
    this.setState({ users });
  };
  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Permission</th>
            </tr>
          </thead>

          <tbody>
            {this.state.users.map((user, i) => (
              <tr key={user._id} onClick={() => this.onSelect(user._id, i)}>
                <td>{user.name}</td>
                <td>{user.permission}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>USER: {this.state.currentUser.name}</p>
        <div className="input-field col s6">
          <input
            placeholder={this.state.currentUser.permission}
            id="permisssion"
            type="text"
            className="validate"
            disabled={this.state.currentUser === "" ? true : false}
            onChange={this.onChange}
          />
        </div>
        <button onClick={this.save}>Save</button>
      </>
    );
  }
}
export default Permissions;
