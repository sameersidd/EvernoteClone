import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "../sidebarItem/sidebarItem";

class Sidebar extends React.Component {
	constructor() {
		super();
		this.state = {
			addingNote: false,
			title: null
		};
	}

	render() {
		const { notes, classes, selectedNoteIndex } = this.props;

		return (
			<div className={classes.sidebarContainer}>
				<Button
					onClick={this.newNoteBtnClick}
					className={
						!this.state.addingNote
							? classes.newNoteBtn
							: classes.cancelNewNoteBtn
					}
				>
					{!this.state.addingNote ? "New Note" : "Cancel"}
				</Button>
				{this.state.addingNote ? (
					<div>
						<input
							type="text"
							className={classes.newNoteInput}
							placeholder="Enter Title"
							onKeyUp={(e) => this.updateTitle(e.target.value)}
						/>
						<Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
							Submit
						</Button>
					</div>
				) : null}
				<List>
					{notes !== null ? (
						notes.map((_note, _index) => {
							return (
								<div key={_index}>
									<SidebarItem
										note={_note}
										index={_index}
										selectedNoteIndex={selectedNoteIndex}
										selectNote={this.selectNote}
										deleteNote={this.deleteNote}
									></SidebarItem>
									<Divider></Divider>
								</div>
							);
						})
					) : (
						<div></div>
					)}
				</List>
				{this.props.user ? (
					<Button onClick={this.LogoutBtnClick} className={classes.LogoutBtn}>
						Logout
					</Button>
				) : null}
			</div>
		);
	}

	newNoteBtnClick = () => {
		this.setState({ addingNote: !this.state.addingNote, title: null });
	};

	LogoutBtnClick = () => {
		this.props.logout();
	};

	updateTitle = (text) => {
		this.setState({ title: text });
	};

	newNote = () => {
		console.log(this.state);
		this.props.newNote(this.state.title);
		this.setState({ addingNote: !this.state.addingNote, title: null });
	};

	selectNote = (n, i) => {
		this.props.selectNote(n, i);
	};
	deleteNote = (n) => {
		console.log("Note Deleting");
		this.props.deleteNote(n);
	};
}

export default withStyles(styles)(Sidebar);
