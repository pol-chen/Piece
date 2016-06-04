'use strict';

const config = require('../config');

let content = config.readConfig('content');
let paper = document.querySelector('textarea');

paper.innerHTML = content;
