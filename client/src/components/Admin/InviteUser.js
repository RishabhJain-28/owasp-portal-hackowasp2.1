import React, { Component } from "react";
import axios from "axios";

class InviteUser extends Component {
  state = { email: "" };

  onChange = (e) => {
    this.setState({ email: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:5000/api/admin/invite`, {
      email: this.state.email,
    });
    console.log(res);
    alert(res.data);
  };
  render() {
    return (
      <>
        <div className="row">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <label htmlFor="email">Email</label>
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Email..."
                  id="emai;"
                  type="email"
                  required
                  className="validate"
                />
              </div>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </>
    );
  }
}
export default InviteUser;
