import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./styles";
import { withStyles } from "@material-ui/core";

class LoginModal extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
			email: "",
			pass: "",
			register: false
		};
	}

	handleClickOpen = () => {
		this.setState({
			open: !this.state.open
		});
	};

	handleDialogChange = () => {
		this.setState({
			register: !this.state.register
		});
	};

	handleCancel = () => {
		this.setState({
			open: !this.state.open
		});
	};

	handleSignup = () => {
		const { email, pass } = this.state;
		this.props.createUser(email, pass);
		this.setState({
			email: "",
			pass: "",
			register: true
		});
		this.setState({
			open: !this.props.auth
		});
	};

	handleLogin = () => {
		const { email, pass } = this.state;
		this.props.setUser(email, pass);
		this.setState({
			email: "",
			pass: "",
			register: false
		});
		this.setState({
			open: !this.props.auth
		});
	};

	render() {
		const { auth, error } = this.props;
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					onClick={this.handleClickOpen}
					style={{ margin: "auto", display: "block" }}
				>
					Login to Continue
				</Button>
				{!this.state.register ? (
					<Dialog
						open={!auth && this.state.open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Login</DialogTitle>
						<DialogContent>
							{error ? (
								<DialogContentText color="error">{error}</DialogContentText>
							) : null}
							<DialogContentText>
								Login to continue using Evernote
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Email Address"
								type="email"
								fullWidth
								onChange={(e) => this.setState({ email: e.target.value })}
							/>
							<TextField
								margin="dense"
								id="pass"
								label="Password"
								type="text"
								fullWidth
								onChange={(e) => this.setState({ pass: e.target.value })}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleDialogChange} color="primary">
								Register?
							</Button>
							<Button onClick={this.handleCancel} color="primary">
								Cancel
							</Button>
							<Button onClick={this.handleLogin} color="primary">
								Login
							</Button>
						</DialogActions>
					</Dialog>
				) : (
					<Dialog
						open={!auth && this.state.open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Signup</DialogTitle>
						<DialogContent>
							{error ? (
								<DialogContentText color="error">{error}</DialogContentText>
							) : null}
							<DialogContentText>
								Signup to continue using Evernote
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Email Address"
								type="email"
								fullWidth
								onChange={(e) => this.setState({ email: e.target.value })}
							/>
							<TextField
								margin="dense"
								id="pass"
								label="Password"
								type="text"
								fullWidth
								onChange={(e) => this.setState({ pass: e.target.value })}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleDialogChange} color="primary">
								Login?
							</Button>
							<Button onClick={this.handleCancel} color="primary">
								Cancel
							</Button>
							<Button onClick={this.handleSignup} color="primary">
								Signup
							</Button>
						</DialogActions>
					</Dialog>
				)}
			</div>
		);
	}
}

export default withStyles(styles)(LoginModal);
