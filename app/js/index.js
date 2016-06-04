'use strict';

const config = require('../config');
const ipc = require('ipc');

let content = config.readConfig('content');
let paper = document.querySelector('textarea');
let span = document.querySelector('span');
span.innerHTML = content;
paper.innerHTML = content.replace(/<br>/g, '\n');

ipc.on('close-main-window', function () {
	let content = document.querySelector('span').innerHTML;
    config.saveConfig('content', content);
});
