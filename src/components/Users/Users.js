import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import List from "./List/List";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CreateUser from "./CreateUser/CreateUser";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation";

class Users extends React.Component {
  state = {
    showCreateUser: false,
    confirmDeleteUsersDialog: false,
    users: [],
    selectedUsers: [],
    search: "",
  };
  componentDidMount() {
    this.loadUsers();
  }
  loadUsers() {
    axios.get("http://jsonplaceholder.typicode.com/users").then((response) => {
      this.setState({
        users: response.data.map((user) => {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            zipcode: user.address.zipcode,
            email: user.email,
            phone: user.phone,
          };
        }),
      });
    });
  }
  deleteSelectedUsers() {
    this.setState({
      users: this.state.users.filter((user) => {
        return this.state.selectedUsers.indexOf(user.id) === -1;
      }),
      selectedUsers: [],
    });
    this.setConfirmUserDialog(false);
  }
  setConfirmUserDialog(param) {
    this.setState({
      confirmDeleteUsersDialog: param,
    });
  }
  setShowCreateUser(param) {
    this.setState({
      showCreateUser: param,
    });
  }
  addUser(newUser) {
    newUser.id = this.getNextId();
    this.setState({
      users: this.state.users.concat(newUser),
    });
  }
  getNextId() {
    let maxId;
    if (this.state.users.length > 0) {
      maxId = Math.max(...this.state.users.map((o) => o.id), 0);
    } else {
      maxId = 0;
    }
    let nextId = maxId + 1;
    return nextId;
  }

  handleChangeSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }

  setSelected(selectedUsers) {
    this.setState({
      selectedUsers: selectedUsers,
    });
  }
  getFilteredUsers() {
    return this.state.users.filter((user) => {
      return (
        user.email.indexOf(this.state.search) > -1 ||
        user.username.indexOf(this.state.search) > -1 ||
        user.zipcode.indexOf(this.state.search) > -1 ||
        user.name.indexOf(this.state.search) > -1 ||
        user.phone.indexOf(this.state.search) > -1
      );
    });
  }
  render() {
    return (
      <div>
        <DeleteConfirmation
          deleteSelectedUsers={() => this.deleteSelectedUsers()}
          setConfirmUserDialog={(param) => this.setConfirmUserDialog(param)}
          show={this.state.confirmDeleteUsersDialog}
        ></DeleteConfirmation>
        <CreateUser
          addUser={(param) => this.addUser(param)}
          show={this.state.showCreateUser}
          setShowCreateUser={(param) => this.setShowCreateUser(param)}
        ></CreateUser>
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              display: "flex",
            }}
          >
            <TextField
              value={this.state.search}
              margin="dense"
              style={{ width: "350px" }}
              onChange={(e) => this.handleChangeSearch(e)}
              label="Search"
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              display: "flex",
            }}
          >
            <Button
              onClick={() => this.setShowCreateUser(true)}
              variant="contained"
            >
              {" "}
              Add new user{" "}
            </Button>
            {this.state.selectedUsers.length > 0 && (
              <Button
                color="error"
                onClick={() => this.setConfirmUserDialog(true)}
                style={{ marginLeft: "10px" }}
                variant="contained"
              >
                Delete {this.state.selectedUsers.length}{" "}
                {this.state.selectedUsers.length === 1 ? "user" : "users"}{" "}
              </Button>
            )}
          </Grid>
        </Grid>
        <List
          setSelected={(param) => this.setSelected(param)}
          users={this.getFilteredUsers()}
          selectedUsers={this.state.selectedUsers}
        />
      </div>
    );
  }
}

export default Users;
