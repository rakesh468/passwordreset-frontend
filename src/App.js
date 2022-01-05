import "./App.css";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { Resetpassword } from "./Resetpassword";
import { Forgotpassword } from "./Forgetpassword";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/forgetpassword">
          <Forgotpassword />
        </Route>
        <Route exact path="/reset-password">
          <MessageBox />
        </Route>
        <Route exact path="/resetpassword">
          <Resetpassword />
        </Route>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
      
      </Switch>
    </div>
  );
}
function MessageBox() {
  const [open, setopen] = React.useState(true);
  const handleClose = () => {
    setopen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Verification Link send through Email
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default App;
