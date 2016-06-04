const app = require('app');
const BrowserWindow = require('browser-window');
const path = require('path');
const Tray = require('tray');
const Menu = require('menu');

const globalShortcut = require('global-shortcut');

const {ipcMain} = require('electron');
const config = require('./config');

require('crash-reporter').start();

let appIcon = null;
let contextMenu = Menu.buildFromTemplate([
	{
		label: 'Float',
		type: 'checkbox',
		checked: true,
    accelerator: 'Command+Alt+F',
		click: toggleFloat
	},
	{
		label: 'Show',
		type: 'checkbox',
		checked: true,
    accelerator: 'Command+Alt+S',
		click: toggleShow
	},
	{
		type: 'separator'
	},
	{
		label: 'About Piece',
		click: function () {
		}
	},
	{
		type: 'separator'
	},
	{
		label: 'Quit Piece',
		click: function () {
			app.quit();
		}
	}
]);

app.on('window-all-closed', () => {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: config.readConfig('width'),
		height: config.readConfig('height'),
		// frame: false,
		alwaysOnTop: true,
	});

	if (config.readConfig('x') && config.readConfig('y')) {
		mainWindow.setPosition(config.readConfig('x'), config.readConfig('y'));
	}

	app.dock.hide();

	mainWindow.loadURL('file://' + __dirname + '/app/index.html');

	// mainWindow.openDevTools();

	mainWindow.on('resize', () => {
		let size = mainWindow.getSize();
		config.saveConfig('width', size[0]);
		config.saveConfig('height', size[1]);
	});

	mainWindow.on('move', () => {
		let position = mainWindow.getPosition();
		config.saveConfig('x', position[0]);
		config.saveConfig('y', position[1]);
	});

	mainWindow.on('close', () => {
		mainWindow.webContents.send('close-main-window');
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	const iconPath = path.join(__dirname, '/app/img/logo-peace.png');
	appIcon = new Tray(iconPath);
	appIcon.setToolTip('Piece');
	appIcon.setContextMenu(contextMenu);

	setGlobalShortcuts();
});

ipcMain.on('save-content', (event, arg) => {
  config.saveConfig('content', arg);
});

function toggleFloat() {
	mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
}
function toggleShow() {
	if (mainWindow.isVisible()) {
		mainWindow.hide();
	} else {
		mainWindow.show();
	}
}

function setGlobalShortcuts() {
	globalShortcut.unregisterAll();

	globalShortcut.register('Cmd+Alt+F', () => {
		toggleFloat();
		contextMenu.items[0].checked = mainWindow.isAlwaysOnTop();
		appIcon.setContextMenu(contextMenu);
	});
	globalShortcut.register('Cmd+Alt+S', () => {
		toggleShow();
		contextMenu.items[1].checked = mainWindow.isVisible();
		appIcon.setContextMenu(contextMenu);
	});
}
