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
let mainWindow = null;
let contextMenu = Menu.buildFromTemplate([
	{
		label: 'Float',
		type: 'checkbox',
		checked: true,
    	accelerator: 'Shift+Alt+F',
		click: toggleFloat
	},
	{
		label: 'Show',
		type: 'checkbox',
		checked: true,
    	accelerator: 'Shift+Alt+S',
		click: toggleShow
	},
	{
		type: 'separator'
	},
	{
		label: 'About Piece',
		click: openAboutWindow
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


let mainMenu = Menu.buildFromTemplate([
	{
		label: "Piece",
		submenu: [
			{
				label: "About Piece",
				click: openAboutWindow
			},
			{
				type: "separator"
			},
			{
				label: 'Hide Piece',
				accelerator: 'Command+H',
				role: 'hide'
			},
			{
				label: 'Hide Others',
				accelerator: 'Command+Alt+H',
				role: 'hideothers'
			},
			{
				label: 'Show All',
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				label: "Quit",
				accelerator: "Command+Q",
				click: function() {
					app.quit();
				}
			}
		]
	},
    {
		label: "Edit",
		submenu: [
			{
				label: "Undo",
				accelerator: "CmdOrCtrl+Z",
				selector: "undo:"
			},
			{
				label: "Redo",
				accelerator: "Shift+CmdOrCtrl+Z",
				selector: "redo:"
			},
			{
				type: "separator"
			},
			{
				label: "Cut",
				accelerator: "CmdOrCtrl+X",
				selector: "cut:"
			},
			{
				label: "Copy",
				accelerator: "CmdOrCtrl+C",
				selector: "copy:"
			},
			{
				label: "Paste",
				accelerator: "CmdOrCtrl+V",
				selector: "paste:"
			},
			{
				label: "Select All",
				accelerator: "CmdOrCtrl+A",
				selector: "selectAll:"
			}
		]
	},
	{
		label: 'Window',
		role: 'window',
		submenu: [
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			}
		]
	}
]);

app.on('window-all-closed', () => {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

let aboutWindow = null;
function openAboutWindow() {
	if (aboutWindow) {
		return;
	}

	aboutWindow = new BrowserWindow({
		width: 366,
		height: 388,
		resizable: false,
		minimizable: false
	})

	aboutWindow.loadURL('file://' + __dirname + '/about.html');

	aboutWindow.on('resize', () => {
		let size = aboutWindow.getSize();
		console.log(size);
	});

	aboutWindow.on('closed', () => {
		aboutWindow = null;
	});
}

function openMainWindow() {
	mainWindow = new BrowserWindow({
		width: config.readConfig('width'),
		height: config.readConfig('height'),
		frame: false,
		alwaysOnTop: true
	});

	if (config.readConfig('x') && config.readConfig('y')) {
		mainWindow.setPosition(config.readConfig('x'), config.readConfig('y'));
	}

	mainWindow.loadURL('file://' + __dirname + '/index.html');

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
		contextMenu.items[1].checked = false;
		appIcon.setContextMenu(contextMenu);
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}


app.on('ready', () => {

	openMainWindow();

	// mainWindow.openDevTools();

	const iconPath = path.join(__dirname, '/img/tray-icon.png');
	appIcon = new Tray(iconPath);
	appIcon.setToolTip('Piece');
	appIcon.setContextMenu(contextMenu);

	setGlobalShortcuts();

	app.focus();
	app.show();
	mainWindow.setAlwaysOnTop(true);
	mainWindow.show();
	mainWindow.focus();
	app.dock.hide();

    Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('save-content', (event, arg) => {
  config.saveConfig('content', arg);
  console.log(arg);
});

function toggleFloat() {
	if (!mainWindow) {
		openMainWindow();
	}
	mainWindow.setAlwaysOnTop(contextMenu.items[0].checked);
}
function toggleShow() {
	if (!mainWindow) {
		openMainWindow();
	}
	if (contextMenu.items[1].checked) {
		mainWindow.show();
	} else {
		mainWindow.hide();
	}
}

function setGlobalShortcuts() {
	globalShortcut.unregisterAll();

	globalShortcut.register('Shift+Alt+F', () => {
		contextMenu.items[0].checked = !contextMenu.items[0].checked;
		toggleFloat();
		appIcon.setContextMenu(contextMenu);
	});
	globalShortcut.register('Shift+Alt+S', () => {
		contextMenu.items[1].checked = !contextMenu.items[1].checked;
		toggleShow();
		appIcon.setContextMenu(contextMenu);
	});
}
