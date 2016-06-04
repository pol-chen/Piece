'use strict';

const nconf = require('nconf').file({file: __dirname + '/config.json'});

function saveConfig(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
}

function readConfig(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

module.exports = {
    saveConfig: saveConfig,
    readConfig: readConfig
};