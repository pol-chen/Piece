'use strict';

const config = require('./config');
const {ipcRenderer} = require('electron');

let content = config.readConfig('content');
let paper = document.querySelector('textarea');
let span = document.querySelector('span');
span.innerHTML = content;
paper.innerHTML = content.replace(/<br>/g, '\n');

ipcRenderer.on('close-main-window', () => {
	let content = document.querySelector('span').innerHTML;
	ipcRenderer.send('save-content', content);
});
