import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";

class List extends React.Component {
  state = {
    orderBy: "id",
    order: "asc",
  };
  setOrder(name) {
    this.setState({
      orderBy: name,
      order: this.state.order === "asc" ? "desc" : "asc",
    });
  }
  selectUser(id) {
    const isSelected = this.props.selectedUsers.indexOf(id) > -1;
    let selectedUsers;
    if (isSelected) {
      selectedUsers = this.props.selectedUsers.filter((userId) => {
        return userId !== id;
      });
    } else {
      selectedUsers = this.props.selectedUsers.concat(id);
    }
    this.props.setSelected(selectedUsers);
  }
  onSelectAllClick() {
    let selectedUsers =
      this.props.selectedUsers.length === this.props.users.length
        ? []
        : this.props.users.map((user) => user.id);
    this.props.setSelected(selectedUsers);
  }
  getSortedUsers() {
    let users = this.props.users.sort((currentUser, previousUser) => {
      const currentUserField = currentUser[this.state.orderBy].toString();
      const previousUserField = previousUser[this.state.orderBy].toString();
      return currentUserField.localeCompare(previousUserField, "en", {
        numeric: true,
      });
    });
    if (this.state.order === "desc") {
      users.reverse();
    }
    return users;
  }
  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="primary"
                    indeterminate={
                      this.props.selectedUsers.length > 0 &&
                      this.props.selectedUsers.length < this.props.users.length
                    }
                    checked={
                      this.props.users.length > 0 &&
                      this.props.selectedUsers.length ===
                        this.props.users.length
                    }
                    onChange={() => this.onSelectAllClick()}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={this.state.orderBy === "id"}
                    direction={
                      this.state.orderBy === "id" ? this.state.order : "asc"
                    }
                    onClick={() => this.setOrder("id")}
                  >
                    Id
                  </TableSortLabel>
                </TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={this.state.orderBy === "name"}
                    direction={
                      this.state.orderBy === "name" ? this.state.order : "asc"
                    }
                    onClick={() => this.setOrder("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={this.state.orderBy === "zipcode"}
                    direction={
                      this.state.orderBy === "zipcode"
                        ? this.state.order
                        : "asc"
                    }
                    onClick={() => this.setOrder("zipcode")}
                  >
                    Zipcode
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.getSortedUsers().map((user) => (
                <TableRow
                  selected={this.props.selectedUsers.indexOf(user.id) > -1}
                  key={user.id}
                >
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={this.props.selectedUsers.indexOf(user.id) > -1}
                      onChange={() => this.selectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                      {user.name[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right">{user.zipcode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default List;
