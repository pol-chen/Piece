'use strict';

import React from 'react';
import {CompositeDecorator, ContentState, Editor, EditorState, Modifier} from 'draft-js';

const config = window.require('./config');
const {ipcRenderer} = window.require('electron');

class Paper extends React.Component {
	constructor() {
		super();

		const compositeDecorator = new CompositeDecorator([
			{
				strategy: atHandleStrategy,
				component: AtHandleSpan,
			},
			{
				strategy: hashtagHandleStrategy,
				component: HashtagHandleSpan,
			},
		]);

		const content = config.readConfig('content');
		const contentState = ContentState.createFromText(content);
		this.state = {
			editorState: EditorState.createWithContent(contentState, compositeDecorator),
		};

		this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => {
			this.setState({editorState});
			const content = editorState.getCurrentContent().getPlainText();
			ipcRenderer.send('save-content', content);
		};
		this.logState = () => console.log(this.state.editorState.toJS());

		this.handleTab = event => {
			event.preventDefault();
			const editorState = this.state.editorState;
			const contentState = editorState.getCurrentContent();
			const selection = editorState.getSelection();
			const focusOffset = selection.getFocusOffset();
			const indentation = this.getIndentation(focusOffset);
			const newContentState = Modifier.insertText(contentState, selection, indentation, null, null);
			const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
			this.onChange(newEditorState);
		};
	}

	getIndentation(focusOffset) {
		let indentation = '    ';
		return indentation.substr(0, 2 - focusOffset % 2);
	}

	render() {
		return (
			<div className="paper">
				<div className="editor" onClick={this.focus}>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						onTab={this.handleTab}
						ref="editor"
						spellCheck={true}
					/>
				</div>
			</div>
		);
	}
}

const AT_HANDLE_REGEX = /\@[\S]+/g;
const HASHTAG_HANDLE_REGEX = /\#[\S]+/g;

function atHandleStrategy(contentBlock, callback) {
	findWithRegex(AT_HANDLE_REGEX, contentBlock, callback);
}

function hashtagHandleStrategy(contentBlock, callback) {
	findWithRegex(HASHTAG_HANDLE_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
	const text = contentBlock.getText();
	let matchArr, start;
	while ((matchArr = regex.exec(text)) !== null) {
		start = matchArr.index;
		callback(start, start + matchArr[0].length);
	}
}

const AtHandleSpan = (props) => {
	return <span {...props} className="at-handle">{props.children}</span>;
};

const HashtagHandleSpan = (props) => {
	return <span {...props} className="hashtag-handle">{props.children}</span>;
};

export default Paper;
