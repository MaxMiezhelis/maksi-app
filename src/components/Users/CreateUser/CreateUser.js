import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputMask from "react-input-mask";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

class CreateUser extends React.Component {
  state = {
    user: {
      email: null,
      username: null,
      phone: null,
      zipcode: "",
      name: null,
    },
  };
  handleClose() {
    this.props.setShowCreateUser(false);
  }
  applyNewUser() {
    this.props.addUser(this.state.user)
    this.setState({
      user: {
        email: null,
        username: null,
        phone: null,
        zipcode: "",
        name: null,
      },
    });
    this.handleClose();
  }

  handleUserChange(e, prop) {
    this.setState({
      user: {
        ...this.state.user,
        [prop]: e.target.value,
      },
    });
  }

  render() {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
    return (
      <div>
        <Modal
          open={this.props.show}
          onClose={() => this.handleClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={() => this.applyNewUser()}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h4">
                Add new user
              </Typography>
              <TextField
                fullWidth
                required
                onChange={(e) => this.handleUserChange(e, "name")}
                label="Name"
                variant="outlined"
              />
              <TextField
                margin="dense"
                required
                onChange={(e) => this.handleUserChange(e, "username")}
                fullWidth
                label="Username"
                variant="outlined"
              />
              <TextField
                margin="dense"
                required
                type="email"
                onChange={(e) => this.handleUserChange(e, "email")}
                fullWidth
                label="Email"
                variant="outlined"
              />
              <InputMask
                required
                mask="+7 999 999-99-99"
                label="Phone"
                fullWidth
                onChange={(e) => this.handleUserChange(e, "phone")}
              >
                {(inputProps) => <TextField {...inputProps} type="tel" />}
              </InputMask>
              <TextField
                margin="dense"
                onChange={(e) => this.handleUserChange(e, "zipcode")}
                fullWidth
                label="Zipcode"
                variant="outlined"
              />
              <Grid container justifyContent="flex-end">
                <Button type="submit" variant="outlined">
                  Apply
                </Button>
              </Grid>
            </Box>
          </form>
        </Modal>
      </div>
    );
  }
}
export default CreateUser;
