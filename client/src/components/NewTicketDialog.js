import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import AddButton from './AddButton';

export default function NewTicketDialog(props) {
  const [open, setOpen] = React.useState(false);
  //   const [sucess, setSucsess] = React.useState();
  const newTicket = {
    title: '',
    content: '',
    email: '',
    labels: '',
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    // alert(
    //   `${newTicket.title}, ${newTicket.content}, ${newTicket.email}, ${newTicket.labels}`
    // );
    if (!newTicket.title || !newTicket.content) return;

    let parsedLabels = newTicket.labels
      .split(',')
      .map((l) => l.replace(/(^\s+|\s+$)/g, '')); // spliting string to an array and striping all leading and trailing whitespaces
    parsedLabels = parsedLabels.filter((l) => l !== '');
    const req = {
      title: newTicket.title,
      content: newTicket.content,
      email: newTicket.email,
      labels: parsedLabels,
    };

    const sucseed = await axios.post('/api/tickets', req);
    props.addTicketToPage();
    setOpen(false);
  };

  return (
    <div>
      <AddButton clickHandler={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        color="yellow"
      >
        <DialogTitle id="form-dialog-title">New Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the details below. Note: fields marked with * are
            required!
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="title"
            margin="normal"
            helperText="Ticket's title"
            onChange={(e) => {
              newTicket.title = e.target.value;
            }}
            fullWidth
            required
          />

          <TextField
            id="content"
            label="Content"
            margin="normal"
            helperText="Ticket's content"
            onChange={(e) => {
              newTicket.content = e.target.value;
            }}
            variant="outlined"
            rows="3"
            multiline
            fullWidth
            required
          />

          <TextField
            id="email"
            label="E-mail-adress"
            margin="normal"
            helperText="Your e-mail adress will be shown on the ticket (optional)"
            onChange={(e) => {
              newTicket.email = e.target.value;
            }}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="labels"
            label="labels"
            margin="normal"
            helperText="related labels will be shown on the ticket (optional)"
            onChange={(e) => {
              newTicket.labels = e.target.value;
            }}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
