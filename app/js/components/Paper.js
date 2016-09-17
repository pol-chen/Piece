'use strict';

import React from 'react';
import {CompositeDecorator, ContentState, Editor, EditorState} from 'draft-js';

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
	}

	render() {
		return (
			<div className="paper">
				<div className="editor" onClick={this.focus}>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
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
