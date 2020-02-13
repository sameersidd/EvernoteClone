import React from "react";
import "./App.css";
import Sidebar from "./sidebar/sidebar";
import Editor from "./editor/editor";
import LoginModal from "./loginModal/loginModal";
// import SidebarItem from "./sidebarItem/sidebarItem";

const firebase = require("firebase");

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedNoteIndex: null,
			selectedNote: null,
			notes: null,
			user: null,
			error: null,
			auth: false
		};
	}

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					auth: true,
					error: null
				});
				firebase
					.firestore()
					.collection(`users/${user.uid}/notes`)
					.onSnapshot((serverUpdate) => {
						const notes = serverUpdate.docs.map((_doc) => {
							const data = _doc.data();
							data["id"] = _doc.id;
							return data;
						});
						console.log(notes);
						this.setState({ notes: notes });
						this.setState({ user: user.uid });
					});
			} else {
				this.setState({
					notes: null,
					user: null,
					auth: false,
					error: null
				});
			}
		});
	};

	render() {
		return (
			<div className="app-container">
				{this.state.user ? (
					<Sidebar
						selectedNoteIndex={this.state.selectedNoteIndex}
						notes={this.state.notes}
						deleteNote={this.deleteNote}
						selectNote={this.selectNote}
						newNote={this.newNote}
						user={this.state.user}
						logout={this.logout}
					/>
				) : (
					<LoginModal
						setUser={this.setUser}
						createUser={this.createUser}
						error={this.state.error}
						auth={this.state.auth}
					/>
				)}
				{this.state.selectedNote ? (
					<Editor
						selectedNote={this.state.selectedNote}
						selectedNoteIndex={this.state.selectedNoteIndex}
						noteUpdate={this.noteUpdate}
					></Editor>
				) : null}
			</div>
		);
	}

	logout = () => {
		firebase
			.auth()
			.signOut()
			.catch((err) => console.log(err.messgae));
		this.setState({
			selectedNoteIndex: null,
			selectedNote: null,
			notes: null,
			user: null,
			error: null,
			auth: false
		});
	};

	setUser = (email, pass) => {
		this.setState({
			error: null
		});
		firebase
			.auth()
			.signInWithEmailAndPassword(email, pass)
			.then((user) => {
				console.log(user);
				this.setState({
					user: user.user.uid
				});
			})
			.catch((err) => {
				this.setState({
					error: err.message
				});
			});
	};

	createUser = (email, pass) => {
		this.setState({
			error: null
		});
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, pass)
			.then((user) => {
				console.log(user);
				firebase
					.firestore()
					.collection("users")
					.add({
						email: email,
						password: pass
					});
				this.setState({
					user: user.user.uid
				});
			})
			.catch((err) => {
				this.setState({
					error: err.message
				});
			});
	};

	selectNote = (n, i) => {
		this.setState({ selectedNoteIndex: i, selectedNote: n });
		console.log(`Selected: ${n.title}`);
	};

	deleteNote = (n) => {
		const noteIndex = this.state.notes.indexOf(n);
		if (this.state.selectedNoteIndex == null) {
			this.setState({
				notes: this.state.notes.filter((_note, i) => i !== noteIndex)
			});
		} else if (this.state.selectedNoteIndex === noteIndex)
			this.setState({
				selectedNoteIndex: null,
				selectedNote: null
			});
		else {
			this.state.notes.length > 1
				? this.selectNote(
						this.state.notes[this.state.selectedNoteIndex - 1],
						this.state.selectedNoteIndex - 1
				  )
				: this.setState({
						selectedNoteIndex: null,
						selectNote: null
				  });
		}

		firebase
			.firestore()
			.collection(`users/${this.state.user}/notes`)
			.doc(n.id)
			.delete();
	};

	noteUpdate = (id, noteObj) => {
		firebase
			.firestore()
			.collection(`users/${this.state.user}/notes`)
			.doc(id)
			.update({
				title: noteObj.title,
				body: noteObj.body,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				uid: firebase.auth().currentUser.uid
			});
	};

	newNote = async (title) => {
		const note = {
			title: title,
			body: ""
		};
		const newFromDB = await firebase
			.firestore()
			.collection(`users/${this.state.user}/notes`)
			.add({
				title: note.title,
				body: note.body,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				uid: firebase.auth().currentUser.uid
			});
		const newID = newFromDB.id;
		this.setState({
			notes: [...this.state.notes, note]
		});
		const newNoteIndex = this.state.notes.indexOf(
			this.state.notes.filter((_note) => _note.id === newID)[0]
		);
		this.setState({
			selectedNote: this.state.notes[newNoteIndex],
			selectedNoteIndex: newNoteIndex
		});
	};
}

export default App;
