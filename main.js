const app = require('app');
const BrowserWindow = require('browser-window');
const path = require('path');
const Tray = require('tray');
const Menu = require('menu');

require('crash-reporter').start();

app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		width: 244,
		height: 374,
		// frame: false,
		alwaysOnTop: true,
	});

	app.dock.hide();

	mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

	// mainWindow.openDevTools();

	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	let appIcon = null
	const iconPath = path.join(__dirname, '/app/img/logo-peace.png')
	appIcon = new Tray(iconPath)
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Float',
			type: 'checkbox',
			checked: true,
      accelerator: 'Command+Alt+F',
			click: function () {
				mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
			}
		},
		{
			label: 'Show',
			type: 'checkbox',
			checked: true,
      accelerator: 'Command+Alt+S',
			click: function () {
				if (mainWindow.isVisible()) {
					mainWindow.hide();
				} else {
					mainWindow.show();
				}
			}
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
	])
	appIcon.setToolTip('Piece')
	appIcon.setContextMenu(contextMenu)

});

function toggleFloat() {
	mainWindow.alwaysOnTop = !mainWindow.alwaysOnTop;
}
