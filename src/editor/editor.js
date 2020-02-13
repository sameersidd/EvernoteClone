import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class Editor extends React.Component {
	constructor() {
		super();
		this.state = {
			text: "",
			title: "",
			id: ""
		};
	}

	componentDidMount = () => {
		const { selectedNote } = this.props;
		this.setState({
			text: selectedNote.body,
			title: selectedNote.title,
			id: selectedNote.id
		});
	};

	componentDidUpdate = () => {
		const { selectedNote } = this.props;
		if (selectedNote.id !== this.state.id) {
			this.setState({
				text: selectedNote.body,
				title: selectedNote.title,
				id: selectedNote.id
			});
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.editorContainer}>
				<BorderColorIcon className={classes.editIcon}></BorderColorIcon>
				<input
					type="text"
					placeholder="Note title..."
					className={classes.titleInput}
					value={this.state.title ? this.state.title : ""}
					onChange={(e) => this.updateTitle(e.target.value)}
				/>
				<ReactQuill
					value={this.state.text}
					onChange={this.updateBody}
				></ReactQuill>
			</div>
		);
	}

	updateBody = async (val) => {
		await this.setState({ text: val });
		this.update();
	};

	updateTitle = async (txt) => {
		await this.setState({
			title: txt
		});
		this.update();
	};

	update = debounce(() => {
		this.props.noteUpdate(this.state.id, {
			title: this.state.title,
			body: this.state.text
		});
	}, 1500);
}

export default withStyles(styles)(Editor);
