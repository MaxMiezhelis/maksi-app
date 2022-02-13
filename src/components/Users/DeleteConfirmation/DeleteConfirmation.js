import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
class DeleteConfirmation extends React.Component {
  handleClose() {
    this.props.setConfirmUserDialog(false);
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.show}
          onClose={() => this.handleClose()}
          PaperComponent={Paper}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            User deleting confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you realy want to remove selected users from list?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button onClick={() => this.props.deleteSelectedUsers()}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default DeleteConfirmation;
